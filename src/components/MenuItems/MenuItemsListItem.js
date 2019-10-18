import {
  IconButton,
  withStyles,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography,
  Grow,
} from "@material-ui/core";
import DragHandle from "@material-ui/icons/DragHandle";
import React, { useState } from "react";
import classNames from "classnames";
import Edit from "@material-ui/icons/Edit";

const styles = theme => ({
  paper: theme.spacing(3),
  root: {
    background: "white",
  },
  dragHandle: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  avatar: {
    background: "#efefef",
    padding: theme.spacing(1),
    fontSize: 16,
    borderRadius: "50%",
  },
  iconSmall: {
    fontSize: 20,
  },
  iconRight: {
    marginRight: theme.spacing(2),
  },
  handleBtn: {
    flex: "0 0 auto",
    color: "rgba(0, 0, 0, 0.54)",
    padding: 12,
    overflow: "visible",
    fontSize: "1.5rem",
    textAlign: "center",
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    borderRadius: "50%",
    display: "inline-flex",
    position: "relative",
    verticalAlign: "middle",
  },
});

function MenuItemsListItem(props) {
  const [hovered, setHovered] = useState(false);
  const { classes } = props;
  return (
    <ListItem
      className={classes.root}
      onMouseOut={() => setHovered(false)}
      onMouseOver={() => setHovered(true)}
    >
      <ListItemAvatar>
        <i
          className={classNames(
            `fa fa-${props.iconName} ${classes.media}`,
            classes.avatar,
          )}
        />
      </ListItemAvatar>

      <ListItemText
        primary={props.title}
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" color="textPrimary">
              {props.url}
            </Typography>
          </React.Fragment>
        }
      />
      <ListItemSecondaryAction
        onMouseOut={() => setHovered(false)}
        onMouseOver={() => setHovered(true)}
      >
        <Grow in={hovered}>
          <IconButton
            aria-label="edit"
            className={classes.iconLeft}
            onClick={props.handleEdit}
          >
            <Edit />
          </IconButton>
        </Grow>
        <Tooltip title="Drag to reorder" position="top">
          <div className={classes.handleBtn}>
            <DragHandle />
          </div>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default withStyles(styles)(MenuItemsListItem);
