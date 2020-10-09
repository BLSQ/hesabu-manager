import React, { Component } from "react";
import mermaid from "mermaid";

class Mermaid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svg: null,
      error: null,
    };

    mermaid.mermaidAPI.initialize({
      startOnLoad: false,
      securitylevel: "loose",
      htmlLabels: true,
      flowchart: {
        htmlLabels: true,
      },
    });
  }

  componentDidMount() {
    try {
      mermaid.mermaidAPI.render(this.props.id, this.props.content, svg => {
        this.setState({ svg });
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          Error...
          <pre>{JSON.stringify(this.state.error)}</pre>
          <pre>{this.props.content}</pre>
        </div>
      );
    }
    if (!this.state.svg) {
      return <div>Loading...</div>;
    }

    return (
      <div
        dangerouslySetInnerHTML={{ __html: this.state.svg }}
        style={{ width: "100%" }}
      />
    );
  }
}

export default Mermaid;
