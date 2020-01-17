import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import TopBar from "../../Shared/TopBar";
import PageContent from "../../Shared/PageContent";

const Shortcuts = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <TopBar>
        <Typography variant="h6" color="inherit">
          {t("shortcuts.title")}
        </Typography>
      </TopBar>
      <PageContent>
        <p>{t("shortcuts.intro")}</p>
        <dl>
          <li>
            <strong>alt+s</strong> -> Sets
          </li>
          <li>
            <strong>alt+c</strong> -> Coumpounds
          </li>
          <li>
            <strong>alt+m</strong> -> Simulations
          </li>
          <li>
            <strong>alt+v</strong> -> Simulation
          </li>
        </dl>
      </PageContent>
    </Fragment>
  );
};

export default Shortcuts;
