import React, { PureComponent } from "react";
import ReactDiffViewer from "react-diff-viewer";

class SplitView extends PureComponent {
  render = () => {
    return (
      <ReactDiffViewer
        oldValue={this.props.before.replace(/\r\n/g, "\n")}
        newValue={this.props.after.replace(/\r\n/g, "\n")}
        splitView={true}
      />
    );
  };
}

export default SplitView;
