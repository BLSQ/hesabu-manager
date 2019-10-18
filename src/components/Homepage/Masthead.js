import React from "react";
import { makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { hEXtoHSL } from "../../utils/theme";

// background: `${theme.palette.primary.main} url(${props.background}) no-repeat center center`,

const useStyles = makeStyles(theme => ({
  root: props => ({
    background: `
      linear-gradient(${hEXtoHSL(props.color, -18, 0.1)}, ${hEXtoHSL(
      props.color,
      -18,
    )} 80%),
      linear-gradient(${hEXtoHSL(props.color, -30, 0.7)}, ${hEXtoHSL(
      props.color,
      -30,
      0.7,
    )}),
      url(${props.background})`,
    backgroundSize: "cover",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    margin: -theme.spacing(3),
    marginBottom: theme.spacing(0),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 250,
  }),
  logo: {
    height: 70,
  },
}));

function Masthead(props) {
  const { t } = useTranslation();
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      {props.logo && (
        <img
          src={props.logo}
          alt={t("project.projectInfo.logo")}
          className={classes.logo}
        />
      )}
    </div>
  );
}

export default Masthead;
