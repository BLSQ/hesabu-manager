import React, { Fragment, useState } from "react";
import { useQuery, useMutation } from "react-query";
import Api from "../../../lib/Api";
import { Autocomplete } from "@material-ui/lab";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
  Grid,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import PageContent from "../../Shared/PageContent.js";
import { makeStyles } from "@material-ui/styles";
import { deserialize } from "../../../utils/jsonApiUtils";
import { externalApi, canEdit } from "../../../actions/api";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  textField: {
    width: "400px",
  },
}));

const SetForm = ({ set, modeCreate }) => {
  const userCanEdit = canEdit();
  const classes = useStyles();
  const history = useHistory();
  const [isDirty, setIsDirty] = useState(false);

  if (set) {
    // since they the widget expext a array of objects as default options but the state is array of string (dhis2 id)
    if (
      set.targetEntityGroups &&
      set.targetEntityGroups[0] &&
      set.targetEntityGroups[0].id
    ) {
      set.targetEntityGroupsBackup = set.targetEntityGroups;
      set.targetEntityGroups = set.targetEntityGroups
        .filter(v => v)
        .map(g => g.id);
    }
    if (set.orgUnitGroups) {
      set.mainEntityGroups = set.orgUnitGroups.map(g => g.id);
    }
  }
  const defaultTargetEntityGroups = set?.targetEntityGroupsBackup || [];

  const [setToUse, setSetToUse] = useState(set);

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

  const retrieveDhis2CatOptionCombosQuery = useQuery(
    "retrieveDhis2CatOptionCombos",
    async () => {
      const api = await Api.instance();
      const response = await api.get("categoryCombos", {
        fields: "id,name",
        paging: false,
      });

      return response;
    },
    {
      onError: error => {
        console.log(error);
      },
    },
  );

  const handleCatOptionComboChange = (value, attribute) => {
    const newSet = { ...setToUse };
    newSet[attribute] = value ? value.id : value;
    setSetToUse(newSet);
    setIsDirty(true);
  };

  const handleGroupsChange = (value, attribute) => {
    const newSet = { ...setToUse };
    const ids = value.filter(v => v).map(v => v.id);
    newSet[attribute] = ids;
    setSetToUse(newSet);
    setIsDirty(true);
  };

  const handleOgsReferenceChange = value => {
    const newSet = { ...setToUse };
    newSet.ogsReference = value ? value.id : null;
    setSetToUse(newSet);
    setIsDirty(true);
  };

  const handleAttributeChange = (value, attribute) => {
    const newSet = { ...setToUse };
    if (Array.isArray(newSet[attribute])) {
      newSet[attribute].push(value);
    } else {
      newSet[attribute] = value;
    }
    setSetToUse(newSet);
    setIsDirty(true);
  };

  const handleIncludeOrgUnitChange = value => {
    const newSet = { ...setToUse };
    newSet["includeMainOrgunit"] = value;
    setSetToUse(newSet);
    setIsDirty(true);
  };

  const handleMutation = useMutation(
    async () => {
      const payload = {
        data: {
          attributes: setToUse,
        },
      };

      let resp;

      if (modeCreate) {
        resp = await externalApi()
          .url(`/sets`)
          .post(payload)
          .json();
      } else {
        resp = await externalApi()
          .url(`/sets/${set.id}`)
          .put(payload)
          .json();
      }

      resp = await deserialize(resp);
      return resp;
    },
    {
      onSuccess: resp => {
        setValidationErrors({});
        const path = modeCreate ? `/sets` : `/sets/${set.id}/topic_formulas`;
        history.push(path);
        window.location.reload();
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

  const zoneOrChildren =
    setToUse.kind === "zone" || setToUse.kind === "multi-groupset";

  const dhis2Objects = retrieveDhis2ObjectsQuery?.data;

  const orgUnitGroupSetsIds = setToUse.orgUnitGroupSets.length
    ? setToUse.orgUnitGroupSets.map(obj => obj.id)
    : [];

  const groupSetsExtRefsDefault =
    orgUnitGroupSetsIds.length && dhis2Objects
      ? dhis2Objects.orgUnitGroupSets.filter(obj =>
          orgUnitGroupSetsIds.includes(obj.id),
        )
      : [];

  const catOptionCombos =
    retrieveDhis2CatOptionCombosQuery?.data?.categoryCombos;

  const loopOverComboExtId =
    setToUse.loopOverComboExtId && catOptionCombos
      ? catOptionCombos.filter(coc => coc.id === setToUse.loopOverComboExtId)[0]
      : setToUse.loopOverComboExtId;

  return (
    <Fragment>
      {dhis2Objects && (
        <>
          <PageContent>
            <Grid container spacing={4} wrap="wrap">
              <Grid item xs={8} sm={6}>
                <Grid container spacing={4} direction="column">
                  <div style={{ color: "red" }}>
                    <b>
                      {setToUse?.errors &&
                        Object.keys(setToUse.errors).length > 0 &&
                        Object.values(setToUse.errors).join("\n")}
                      {validationErrors &&
                        Object.keys(validationErrors).length > 0 &&
                        Object.values(validationErrors).join("\n")}
                    </b>
                  </div>
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
                    {/* mainEntityGroups */}
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={dhis2Objects.orgUnitGroups}
                      getOptionLabel={option => option.name}
                      defaultValue={setToUse.orgUnitGroups}
                      filterSelectedOptions
                      onChange={(event, option) =>
                        handleGroupsChange(option, "mainEntityGroups")
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
                    {/*groupSetsExtRefs */}
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={dhis2Objects.orgUnitGroupSets}
                      getOptionLabel={option => option.name}
                      defaultValue={groupSetsExtRefsDefault}
                      filterSelectedOptions
                      onChange={(event, option) =>
                        handleGroupsChange(option, "groupSetsExtRefs")
                      }
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
                    <Autocomplete
                      id="tags-outlined"
                      options={catOptionCombos}
                      getOptionLabel={option => option.name}
                      defaultValue={loopOverComboExtId}
                      filterSelectedOptions
                      onChange={(event, option) =>
                        handleCatOptionComboChange(option, "loopOverComboExtId")
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Loop over category combo"
                          className={classes.textField}
                          placeholder="category combo groups"
                        />
                      )}
                    />
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
                        {dhis2Objects.orgUnitGroupSets && (
                          <Autocomplete
                            id="tags-outlined"
                            options={dhis2Objects.orgUnitGroupSets}
                            getOptionLabel={option => option.name}
                            defaultValue={{
                              id: setToUse.ogsReference,
                              name: dhis2Objects.orgUnitGroupSets.find(
                                gs => gs.id === setToUse.ogsReference,
                              )?.name,
                            }}
                            filterSelectedOptions
                            onChange={(event, option) =>
                              handleOgsReferenceChange(option)
                            }
                            renderInput={params => (
                              <TextField
                                {...params}
                                label="Entities by contract group belonging to groupset"
                                className={classes.textField}
                                placeholder="Org unit group sets"
                              />
                            )}
                          />
                        )}
                      </Grid>
                      <Grid item>
                        {/* targetEntityGroups */}
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={dhis2Objects.orgUnitGroups}
                          getOptionLabel={option => option?.name || "-"}
                          defaultValue={defaultTargetEntityGroups}
                          filterSelectedOptions
                          onChange={(event, option) =>
                            handleGroupsChange(option, "targetEntityGroups")
                          }
                          renderInput={params => (
                            <TextField
                              {...params}
                              label="Zone entities by group"
                              className={classes.textField}
                              placeholder="Org unit groups"
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
                                  checked={setToUse.includeMainOrgunit}
                                  onChange={() =>
                                    handleIncludeOrgUnitChange(
                                      !setToUse.includeMainOrgunit,
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
                      disabled={!isDirty || !userCanEdit}
                      onClick={() => handleMutation.mutate()}
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

export default SetForm;
