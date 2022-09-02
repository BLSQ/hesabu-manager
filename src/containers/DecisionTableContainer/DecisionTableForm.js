import {
  Button,
  Grid,
  Input,
  TextField,
  Typography,
  Link,
  makeStyles,
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import PapaParse from "papaparse";
import { useMutation, useQueryClient } from "react-query";
import { canEdit, externalApi } from "../../actions/api";
import { deserialize } from "../../utils/jsonApiUtils";
import { useHistory } from "react-router-dom";
import ConfirmBox from "../../components/Shared/ConfirmBox";

const useStyles = makeStyles(theme => ({
  linkMargin: {
    marginTop: "1rem",
    marginLeft: "1rem",
  },
}));

const DecisionTableForm = ({ decisionTable, set }) => {
  const classes = useStyles();
  const userCanEdit = canEdit();
  if (decisionTable) {
    decisionTable.parsedContent = PapaParse.parse(decisionTable.content, {
      header: true,
      skipEmptyLines: "greedy",
    });
  }
  const history = useHistory();
  const queryClient = useQueryClient();
  const modeCreate = decisionTable?.id == undefined;

  const PERIOD_HELPER_TEXT = `If filled these periods are specified with the same frequency (${set.frequency}) as the set/package, in the dhis2 format`;

  const [isDirty, setIsDirty] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const [decisionTableToUse, setDecisionTableToUse] = useState(
    decisionTable || {},
  );
  const handleAttributeChange = (value, attribute) => {
    const newTable = { ...decisionTableToUse };
    if (Array.isArray(newTable[attribute])) {
      newTable[attribute].push(value);
    } else {
      newTable[attribute] = value;
    }
    setDecisionTableToUse(newTable);
    setIsDirty(true);
  };

  const handleFileChange = event => {
    const files = event.target.files || [];
    if (!files.length) return;
    var file = event.target.files[0];
    const elementName = event.target.name;
    PapaParse.parse(file, {
      header: true,
      dynamicTyping: false,
      skipEmptyLines: "greedy",
      complete: function(data) {
        const csv = PapaParse.unparse(data, data.meta.fields, {
          header: true,
          skipEmptyLines: "greedy",
        });
        const newTable = {
          ...decisionTableToUse,
          parsedContent: data,
          content: csv,
        };
        setDecisionTableToUse(newTable);
        setIsDirty(true);
      },
    });
  };

  const handleDeleteMutation = useMutation(async () => {
    const resp = await externalApi()
      .url(`/sets/${set.id}/topic_decision_tables/${decisionTable.id}`)
      .delete()
      .json();

    const path = `/sets/${set.id}/topic_formulas`;
    history.push(path);
    queryClient.invalidateQueries("loadSet");
    queryClient.invalidateQueries("loadSets");
  });

  const handleMutation = useMutation(
    async () => {
      const payload = {
        data: {
          attributes: decisionTableToUse,
        },
      };

      let resp;

      if (modeCreate) {
        resp = await externalApi()
          .url(`/sets/${set.id}/topic_decision_tables`)
          .post(payload)
          .json();
      } else {
        resp = await externalApi()
          .url(`/sets/${set.id}/topic_decision_tables/${decisionTable.id}`)
          .put(payload)
          .json();
      }

      resp = await deserialize(resp);
      return resp;
    },
    {
      onSuccess: resp => {
        setValidationErrors({});
        const path = modeCreate
          ? `/sets/${set.id}/topic/decisions/${decisionTableToUse.id ||
              resp.id}`
          : `/sets/${set.id}/topic_formulas`;
        history.push(path);

        queryClient.invalidateQueries("loadSet");
        queryClient.invalidateQueries("loadSets");
      },
      onError: error => {
        let resp = error.json;
        resp = resp.errors[0];
        const errorDetails = resp.details;
        const validationErrors = {};
        for (let attribute in errorDetails) {
          validationErrors[attribute] = errorDetails[attribute];
        }
        setValidationErrors({ ...validationErrors });
      },
    },
  );
  return (
    <Grid container spacing={4} wrap="wrap" style={{ margin: "10px" }}>
      <Grid container spacing={4} direction="column">
        <div style={{ color: "red" }}>
          <b>
            {decisionTableToUse?.errors &&
              Object.keys(decisionTableToUse.errors).length > 0 &&
              Object.values(decisionTableToUse.errors).join("\n")}
            {validationErrors &&
              Object.keys(validationErrors).length > 0 &&
              Object.values(validationErrors).join("\n")}
          </b>
        </div>

        <Grid item>
          <TextField
            id="name"
            error={validationErrors["name"]}
            helperText={validationErrors["name"]}
            label={"Name"}
            variant="outlined"
            fullWidth
            value={decisionTableToUse.name}
            onChange={event =>
              handleAttributeChange(event.target.value, "name")
            }
          />
        </Grid>
        <Grid item>
          <TextField
            id="startPeriod"
            error={validationErrors["start_period"]}
            helperText={validationErrors["start_period"] || PERIOD_HELPER_TEXT}
            label={"startPeriod"}
            variant="outlined"
            fullWidth
            value={decisionTableToUse.startPeriod}
            onChange={event =>
              handleAttributeChange(event.target.value, "startPeriod")
            }
          />
        </Grid>
        <Grid item>
          <TextField
            id="endPeriod"
            error={validationErrors["end_period"]}
            helperText={validationErrors["end_period"] || PERIOD_HELPER_TEXT}
            label={"endPeriod"}
            variant="outlined"
            fullWidth
            value={decisionTableToUse.endPeriod}
            onChange={event =>
              handleAttributeChange(event.target.value, "endPeriod")
            }
          />
        </Grid>
        <Grid item>
          <TextField
            id="comment"
            multiline
            rows={4}
            error={validationErrors["comment"]}
            helperText={
              validationErrors["comment"] ||
              "For large/complex setup, a small explanation might help understand the configuration. Save time for your futur you, add a comment."
            }
            label={"comment"}
            variant="outlined"
            fullWidth
            value={decisionTableToUse.comment}
            onChange={event =>
              handleAttributeChange(event.target.value, "comment")
            }
          />
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <TextField
                id="sourceUrl"
                error={validationErrors["sourceUrl"]}
                helperText={
                  validationErrors["sourceUrl"] ||
                  "Add link to the google sheet you used to fill in this decision table"
                }
                label={"sourceUrl"}
                variant="outlined"
                fullWidth
                value={decisionTableToUse.sourceUrl}
                onChange={event =>
                  handleAttributeChange(event.target.value, "sourceUrl")
                }
              />
            </Grid>
            <Grid item>
              <Link
                href={decisionTableToUse.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                <OpenInNewIcon className={classes.linkMargin} />
              </Link>
            </Grid>
          </Grid>
        </Grid>

        {decisionTableToUse.parsedContent && (
          <Grid item>
            <MUIDataTable
              title={"Decision Table"}
              data={decisionTableToUse.parsedContent.data}
              columns={decisionTableToUse.parsedContent.meta.fields}
              options={{
                print: false,
                downloadOptions: {
                  filename: `decisionTable-${decisionTable?.id}-${decisionTable?.name}.csv`,
                  separator: ",",
                },
              }}
            ></MUIDataTable>
          </Grid>
        )}
        <Grid item>
          <div style={{ color: "red" }}>{validationErrors["content"]}</div>
        </Grid>
        <Grid item>
          <label for="files" style={{ margin: "5px" }}>
            Upload csv
          </label>
          <Input
            name="Upload csv"
            type="file"
            onChange={handleFileChange}
            inputProps={{ accept: ".csv" }}
          ></Input>
          <Button
            style={{ color: "lightblue" }}
            onClick={() => setShowHelp(!showHelp)}
          >
            <HelpIcon></HelpIcon>
          </Button>
        </Grid>

        <Grid item>
          {showHelp && (
            <div style={{ maxWidth: "600px" }}>
              Decision tables support of lot possibilities. <br></br>
              <br></br>
              Input columns can be:
              <ul>
                <li>
                  <code>in:activity_code</code> : the content of the columns
                  should be the activity code (eg :{" "}
                  {set.topics
                    .map(a => a.code)
                    .slice(0, 10)
                    .join(" , ")}
                  )
                </li>
                <li>
                  <code>in:level_&lt;x&gt;</code> : where x is the numeric level
                  (province/region/...) and content of the column should the
                  dhis2 id of the orgUnit
                </li>
                <li>
                  <code>in:level</code> : the level (number) of the orgunit{" "}
                </li>
                <li>
                  <code>
                    in:groupset_code_&lt;the_orgunit_group_set_code&gt;
                  </code>{" "}
                  : where <code>the_orgunit_group_set_code</code> is the code of
                  the groupset you want to use here and the content of the
                  column should be a single code of the organisationUnitGroup
                  you target. the orgunit (numeric)
                </li>
              </ul>
              <br></br>
              Input have a special value <code>*</code> that allows to condense
              some decision tables, it means any value. If a orgunit/topic tuple
              matches multiple lines the more specific (with less <code>*</code>{" "}
              will be used)
              <br></br>
              <br></br>
              The output columns should be named{" "}
              <code>out:&lt;formula_like_code&gt;</code> the{" "}
              <code>formula_like_code</code> is supposed to start with a letter,
              should be lower case, no special char except <code>_</code>
              <br></br>
              <br></br>
              Some output columns might influence the visibility (
              <code>visible</code>) and order (<code>order</code>) of topic to
              be displayed in simulation/invoices.
              <br></br> <br></br>
              Columns not starting with <code>in:</code> or <code>out:</code>{" "}
              will be ignored
            </div>
          )}
        </Grid>
        {isDirty && (
          <Grid item>
            <Typography style={{ maxWidth: "500px" }}>
              Before saving make sure that's what you wanted to do ? <br></br>{" "}
              eg : Fix wrong incentives in the periods handled by this decision
              table.
            </Typography>
            <br></br>
            <Typography style={{ maxWidth: "500px" }}>
              If your goal was to setup incentives for a new period, add
              start/end period to the current one then create a new decision
              table with the new incentives and periods where they should start
              having effects.
            </Typography>
          </Grid>
        )}
        <Grid item>
          <Button
            variant="outlined"
            disabled={!isDirty || !userCanEdit}
            onClick={() => handleMutation.mutate()}
          >
            Save
          </Button>

          {decisionTable !== undefined && (
            <>
              <ConfirmBox
                open={confirmOpen}
                title="Delete decision table"
                content="Sure you want to delete ?"
                onConfirm={() => handleDeleteMutation.mutate()}
                onClose={() => setConfirmOpen(false)}
              />

              <Button
                style={{ float: "right", color: "red" }}
                disabled={decisionTable == undefined || !userCanEdit}
                onClick={() => setConfirmOpen(true)}
              >
                Delete
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DecisionTableForm;
