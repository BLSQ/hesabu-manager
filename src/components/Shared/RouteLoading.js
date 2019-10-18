import { CircularProgress } from "@material-ui/core";
import React from "react";

export default function RouteLoading(props) {
  const spinner = <CircularProgress />;
  if (props.error) {
    return (
      <div className="route-loading">
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    );
  }
  if (props.timedOut) {
    return (
      <div>
        Taking a long time... <button onClick={props.retry}>Retry</button>
      </div>
    );
  }
  if (props.pastDelay) {
    return <div className="route-loading">{spinner}</div>;
  }
  return <div className="route-loading">{spinner}</div>;
}
