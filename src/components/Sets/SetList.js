import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import classNames from "classnames";
import {
  Divider,
  withStyles
} from "@material-ui/core";
import SetListItem from "./SetListItem";

const styles = theme => ({
  divider: {
    marginBottom: theme.spacing(3),
  }
});

class SetList extends Component {
  render() {
    const { classes, t } = this.props;
    return (
      <Fragment>
        {this.props.sets.map((set, index) => (
          [
            <SetListItem title={set.name}
            key={index}
            groups={set.groupNames}
            description={set.description}
              />,
            <Divider className={classNames(classes.divider)}/>
            ]
        ))}
      </Fragment>
    );
  }
}

export default withTranslation("translations")(
  withStyles(styles)(SetList),
);
