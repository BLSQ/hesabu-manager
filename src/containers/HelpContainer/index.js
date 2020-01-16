import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Shortcuts from "../../components/Help/Shortcuts";

const HelpContainer = props => {
  const { match } = props;
  return (
    <Switch>
      <Route path={`${match.url}/shortcuts`} component={Shortcuts} />
    </Switch>
  );
};

export default withRouter(HelpContainer);
