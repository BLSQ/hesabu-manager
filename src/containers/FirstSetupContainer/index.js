import React, { Fragment } from "react";
import { Button, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import TopBar from "../../components/Shared/TopBar";
import PageContent from "../../components/Shared/PageContent";
import { createAdminRole } from "../../lib/InitialSetup";

const FirstSetupContainer = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <TopBar>
        <Typography variant="h6" color="inherit">
          {t("first_setup.title")}
        </Typography>
      </TopBar>
      <PageContent>
        <Button onClick={createAdminRole}>create admin role</Button>
      </PageContent>
    </Fragment>
  );
};

export default FirstSetupContainer;
