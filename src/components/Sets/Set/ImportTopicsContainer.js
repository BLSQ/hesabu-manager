import React, { Fragment } from "react";

import { externalApi, canEdit } from "../../../actions/api";

import { makeStyles } from "@material-ui/core/styles";
import { APPBAR_WITH_TABS_HEIGHT, SIDEBAR_WIDTH } from "../../../constants/ui";
import {
  Typography,
  InputLabel,
  Input,
  Paper,
  Grid,
  Button,
} from "@material-ui/core";
import PapaParse from "papaparse";

const useStyles = makeStyles(theme => ({
  root: props => ({
    marginTop: APPBAR_WITH_TABS_HEIGHT + theme.spacing(2),
    marginLeft: props.loading ? 0 : theme.spacing(-2),
    padding: props.loading ? 0 : theme.spacing(2),
    width: props.loading ? " 100%" : "inherit",
  }),
  customWidth: {
    maxWidth: "1500px",
    maxHeight: "100vh",
  },
}));

const ImportTopicsContainer = props => {
  const { loading, set, onSave } = props;
  const classes = useStyles(props);
  const [status, setStatus] = React.useState("WAITING");
  const [topicsToImport, setTopicsToImport] = React.useState(undefined);

  if (!canEdit) {
    return (
      <div className={classes.root}>
        <Paper style={{ height: "95vh", paddingLeft: "20px" }}>
          <Typography variant="h4">Import topics for {set.name}</Typography>
          <Typography>
            Sorry the feature not available to you. You need to the have
            associated role to be able to edit the project configuration.
          </Typography>
        </Paper>
      </div>
    );
  }

  const parserCsv = evt => {
    const files = evt.target.files || [];
    if (!files.length) {
      return;
    }
    var file = evt.target.files[0];

    PapaParse.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function(data) {
        setTopicsToImport(data.data);
      },
    });
  };

  const importAll = async () => {
    if (status !== "WAITING") {
      return;
    }
    setStatus("IMPORTING");
    let allok = true;
    for (let topic of topicsToImport) {
      try {
        const resp = await externalApi()
          .url("/topics")
          .post({
            data: {
              attributes: {
                code: topic.code,
                name: topic.name,
                shortName: topic.shortName,
              },
              relationships: { sets: [{ type: "set", id: set.id }] },
            },
          })
          .json();
        topic.status = "OK";
        topic.details = resp;
      } catch (error) {
        allok = false;
        topic.status = "ERROR";
        topic.details = error;
      }
    }
    setTopicsToImport(topicsToImport.slice(0));
    setStatus("IMPORTED");
  };

  return (
    <div className={classes.root}>
      <Paper style={{ height: "95vh", paddingLeft: "20px" }}>
        <Typography variant="h4">Import topics for {set.name}</Typography>
        <br></br>
        <div style={{ padding: "20px" }}>
          <Typography>
            The csv should contains lines with headers : code, name, shortName
          </Typography>
          <ul>
            <Typography>
              Codes, names should be unique. ShortNames are optional but usefull
              to keep data elements names short.
            </Typography>
            <Typography>
              A valid code consist of lower letters, numbers and undescores like
              : <code>pma_qual_01</code>
            </Typography>
          </ul>
          <InputLabel style={{ marginLeft: "10px" }}>File to import</InputLabel>
          <Input type="file" name="csv" onChange={parserCsv} accept=".csv" />
        </div>
        <br></br>

        {topicsToImport && (
          <div style={{ padding: "20px" }}>
            <Typography variant="h5">Topics</Typography>
            <br></br> <br></br>
            <Grid container xs={12} spacing={2}>
              <Grid item>#</Grid>
              <Grid item xs={1}>
                Code
              </Grid>
              <Grid item xs={1}>
                Name
              </Grid>
              <Grid item xs={1}>
                Short Name
              </Grid>
            </Grid>
            {topicsToImport.map((topic, index) => {
              return (
                <Grid container xs={12} spacing={2}>
                  <Grid item>{index + 1}</Grid>
                  <Grid item xs={1}>
                    <code> {topic.code}</code>
                  </Grid>
                  <Grid item xs={1}>
                    {topic.name}
                  </Grid>
                  <Grid item xs={1}>
                    {topic.shortName}
                  </Grid>
                  <Grid item xs={1}>
                    {topic.status}
                  </Grid>

                  <Grid item xs={4}>
                    {JSON.stringify(topic.details)}
                  </Grid>
                </Grid>
              );
            })}
            <br></br>
            <br></br>
          </div>
        )}
        <Grid container spacing={4}>
          <Grid item>
            <Button
              href={"./index.html#/sets/" + set.id + "/topic_formulas"}
              onClick={onSave}
            >
              Back
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              disabled={status !== "WAITING"}
              onClick={importAll}
            >
              Import !
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ImportTopicsContainer;
