import React, { Fragment, useState } from "react";
import { useQuery, useMutation } from "react-query";
import Api from "../../../lib/Api";
import { Autocomplete } from "@material-ui/lab";
import {
  Chip,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
  List,
  ListItem,
  Typography,
  Grid,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import TopBar from "../../Shared/TopBar";
import PageContent from "../../Shared/PageContent.js";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import { deserialize } from "../../../utils/jsonApiUtils";
import { externalApi } from "../../../actions/api";
import { log } from "logrocket";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  textField: {
    width: "400px",
  },
}));

const set = {
  name: "",
  description: "",
  frequency: "",
  kind: "",
  ogsReference: [],
  groupSetsExtRefs: [],
  loopOver: "",
  stateIds: [],
  topicIds: [],
  includeMainOrgUnit: false,
  mainEntityGroups: [],
  targetEntityGroups: [],
};

const NewSet = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isDirty, setIsDirty] = useState(false);
  const [setToUse, setSetToUse] = useState(set);
  const [includeMainOrgUnit, setIncludeMainOrgUnit] = useState(
    setToUse.includeMainOrgUnit,
  );
  const [validationErrors, setValidationErrors] = useState({});

  const retrieveDhis2ObjectsQuery = useQuery(
    "retrieveDhis2Objects",
    async () => {
      const api = await Api.instance();
      let response = {};
      const orgUnitGroupsResponse = await api.get("organisationUnitGroups", {
        fields: "id,name",
        paging: false,
      });
      const orgUnitGroupSetsResponse = await api.get(
        "organisationUnitGroupSets",
        {
          fields: "id,name",
          paging: false,
        },
      );
      response["orgUnitGroups"] = orgUnitGroupsResponse.organisationUnitGroups;
      response["orgUnitGroupSets"] =
        orgUnitGroupSetsResponse.organisationUnitGroupSets;
      response = { ...response };
      return response;
    },
    {
      onError: error => {
        console.log(error);
      },
    },
  );

  const handleAttributeChange = (value, attribute) => {
    const newSet = { ...setToUse };
    debugger;
    if (Array.isArray(newSet[attribute])) {
      newSet[attribute].push(value);
    } else {
      newSet[attribute] = value;
    }
    console.log(newSet.ogsReference);
    setSetToUse(newSet);
    setIsDirty(true);
  };

  const handleIncludeOrgUnitChange = value => {
    const newSet = { ...setToUse };
    newSet["includeMainOrgUnit"] = value;
    setSetToUse(newSet);
    setIncludeMainOrgUnit(value);
  };

  const handleCreateMutation = useMutation(
    async () => {
      const payload = {
        data: {
          attributes: setToUse,
        },
      };

      console.log(setToUse.kind);

      let resp = await externalApi()
        .url(`/sets`)
        .post(payload)
        .json();

      resp = await deserialize(resp);
      return resp;
    },
    {
      onSuccess: resp => {
        setValidationErrors({});
        history.push(`/sets`);
      },
      onError: error => {
        let resp = error.json;
        resp = resp.errors[0];
        const errorDetails = resp.details;
        for (let attribute in errorDetails) {
          validationErrors[attribute] = errorDetails[attribute];
        }
        setValidationErrors({ ...validationErrors });
      },
    },
  );

  const handleMutation = () => {
    handleCreateMutation.mutate();
  };

  const zoneOrChildren =
    setToUse.kind === "zone" || setToUse.kind === "multi-groupset";
  const dhis2Objects = retrieveDhis2ObjectsQuery?.data;
  const backLinkPath = `/sets`;
  return (
    <Fragment>
      {dhis2Objects && (
        <>
          <TopBar backLinkPath={backLinkPath}>
            <Typography variant="h6" color="inherit">
              New set
            </Typography>
          </TopBar>
          <PageContent>
            <Grid container spacing={4} wrap="wrap">
              <Grid item xs={8} sm={6}>
                <Grid container spacing={4} direction="column">
                  <Grid item>
                    <TextField
                      required
                      id="name"
                      error={validationErrors["name"]}
                      helperText={
                        validationErrors["name"] ||
                        "length limited to 50 characters per dhis2 restrictions, consider using a naming convention, such as entity_type - set_type, example: PMA - Quantity"
                      }
                      label={"Name"}
                      variant="outlined"
                      fullWidth
                      value={setToUse.name}
                      onChange={event =>
                        handleAttributeChange(event.target.value, "name")
                      }
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label={"Description"}
                      id="description"
                      error={validationErrors["description"]}
                      helperText={
                        validationErrors["description"] ||
                        "optional free-form description, might be displayed in the invoice/report or to document the set"
                      }
                      variant="outlined"
                      fullWidth
                      value={setToUse.description}
                      onChange={event =>
                        handleAttributeChange(event.target.value, "description")
                      }
                    />
                  </Grid>
                  <Grid item>
                    {/* ogsReference */}
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={dhis2Objects.orgUnitGroups}
                      getOptionLabel={option => option.name}
                      defaultValue={null}
                      filterSelectedOptions
                      onChange={event =>
                        handleAttributeChange(
                          event.target.value,
                          "ogsReference",
                        )
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Package entity groups"
                          className={classes.textField}
                          placeholder="Package entity groups"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item>
                    {/* groupSetsExtRefs */}
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      // error={validationErrors["groupSetsExtRefs"]}
                      // helperText={validationErrors["groupSetsExtRefs"]}
                      options={dhis2Objects.orgUnitGroupSets}
                      getOptionLabel={option => option.name}
                      defaultValue={null}
                      filterSelectedOptions
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Group sets"
                          className={classes.textField}
                          placeholder="Group sets"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        required
                        select
                        error={validationErrors["kind"]}
                        helperText={validationErrors["kind"]}
                        label="Kind"
                        labelId="formula-kind-label"
                        id="kind"
                        className={classes.textField}
                        value={setToUse.kind}
                        onChange={event =>
                          handleAttributeChange(event.target.value, "kind")
                        }
                      >
                        <MenuItem value={"single"}>Single</MenuItem>
                        <MenuItem value={"multi-groupset"}>
                          Multi-groupset
                        </MenuItem>
                        <MenuItem value={"zone"}>Zone</MenuItem>
                      </TextField>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        select
                        error={validationErrors["loopOver"]}
                        helperText={validationErrors["loopOver"]}
                        label="Loop over category combo"
                        labelId="loop-over-category-combo"
                        id="kind"
                        className={classes.textField}
                        value={setToUse.loopOver}
                        onChange={event =>
                          handleAttributeChange(event.target.value, "loopOver")
                        }
                      ></TextField>
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <FormControl>
                      <TextField
                        required
                        select
                        error={validationErrors["frequency"]}
                        helperText={validationErrors["frequency"]}
                        label="Frequency"
                        labelId="formula-frequency-label"
                        id="frequency"
                        className={classes.textField}
                        value={setToUse.frequency}
                        onChange={event =>
                          handleAttributeChange(event.target.value, "frequency")
                        }
                      >
                        <MenuItem value={"monthly"}>Monthly</MenuItem>
                        <MenuItem value={"quarterly"}>Quarterly</MenuItem>
                        <MenuItem value={"yearly"}>Yearly</MenuItem>
                      </TextField>
                    </FormControl>
                  </Grid>
                  {zoneOrChildren && (
                    <>
                      <Grid item>
                        {/* ogsReference */}
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={dhis2Objects.orgUnitGroups}
                          getOptionLabel={option => option.name}
                          defaultValue={null}
                          filterSelectedOptions
                          renderInput={params => (
                            <TextField
                              {...params}
                              label="Zone entities by group"
                              className={classes.textField}
                              placeholder="Organisation unit groups"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item>
                        {/* groupSetsExtRefs */}
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={dhis2Objects.orgUnitGroupSets}
                          getOptionLabel={option => option.name}
                          defaultValue={null}
                          filterSelectedOptions
                          renderInput={params => (
                            <TextField
                              {...params}
                              label="Entities by contract group belonging to groupset"
                              className={classes.textField}
                              placeholder="Organisation unit group sets"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item>
                        <FormControl>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={includeMainOrgUnit}
                                  onChange={() =>
                                    handleIncludeOrgUnitChange(
                                      !includeMainOrgUnit,
                                    )
                                  }
                                />
                              }
                              label="Include main orgunit"
                            />
                          </FormGroup>
                        </FormControl>
                      </Grid>
                    </>
                  )}

                  <Grid item xs={10} sm={9}>
                    <Button
                      variant="outlined"
                      disabled={!isDirty}
                      onClick={() => handleMutation()}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </PageContent>
        </>
      )}
    </Fragment>
  );
};

export default NewSet;
