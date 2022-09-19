import React, { PureComponent } from "react";
import ReactDiffViewer from "react-diff-viewer";

class SplitView extends PureComponent {
  render = () => {
    return (
      <ReactDiffViewer
        oldValue={this.props.before}
        newValue={this.props.after}
        splitView={true}
      />
    );
  };
}

export default SplitView;
