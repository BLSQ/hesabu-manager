import React from "react";
import {
  Card,
  makeStyles,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    background: "#F5F5F5",
    boxShadow: "none",
    height: "100%",
  },
}));

const FlatCard = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Card
      classes={{
        root: classes.root,
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="subtitle1">
            {props.children}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" component={Link} to={props.to}>
          {t("buttons.edit")}
        </Button>
        {false && (
          <>
            <Button size="small" color="primary" onClick={props.onDelete}>
              {t("buttons.delete")}
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

FlatCard.propTypes = {
  onDelete: PropTypes.func,
  to: PropTypes.string,
};

export default FlatCard;
