import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Autocomplete } from "@material-ui/lab";
import { Button, Grid, Typography, Box, TextField } from "@material-ui/core";
import { deserialize } from "../../utils/jsonApiUtils";
import { externalApi } from "../../actions/api";
import { canEdit } from "../../actions/api";
import Api from "../../lib/Api";

const useStyles = makeStyles(theme => ({
  textField: {
    width: "400px",
  },
}));

const UserForm = ({ user, afterMutate, modeCreate }) => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const userCanEdit = canEdit();
  const [userToUse, setUserToUse] = useState(user);
  const [validationErrors, setValidationErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  const handleAttributeChange = (value, attribute) => {
    const newUser = { ...userToUse };
    newUser[attribute] = value;
    setUserToUse(newUser);
    setIsDirty(true);
  };

  const fetchDhis2UsersQuery = useQuery(
    "fetchDhis2Users",
    async () => {
      const api = await Api.instance();
      const response = await api.get("users", {
        fields: "id,name,email",
        paging: false,
      });
      return response.users;
    },
    {
      onError: error => {
        console.log(error);
      },
    },
  );

  const usersForSelect = fetchDhis2UsersQuery?.data;

  const userMutation = useMutation(
    async () => {
      const payload = {
        data: {
          attributes: userToUse,
        },
      };

      let resp;
      if (modeCreate) {
        resp = await externalApi()
          .url(`/users`)
          .post(payload)
          .json();
      } else {
        resp = await externalApi()
          .url(`/users/${user.id}`)
          .put(payload)
          .json();
      }

      resp = await deserialize(resp);
      return resp;
    },
    {
      onSuccess: resp => {
        setValidationErrors({});
        afterMutate();
        queryClient.invalidateQueries("fetchUsers");
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

  const defaultDhis2User =
    usersForSelect && !modeCreate
      ? usersForSelect.filter(
          dhis2User => dhis2User.id === user.dhis2UserRef,
        )[0]
      : null;

  return (
    <Box>
      {usersForSelect && (
        <Grid container>
          <Grid item>
            <Grid container spacing={2} direction="column">
              <div style={{ color: "red" }}>
                <b>
                  {userToUse?.errors &&
                    Object.keys(userToUse.errors).length > 0 &&
                    Object.values(userToUse.errors).join("\n")}
                  {validationErrors &&
                    Object.keys(validationErrors).length > 0 &&
                    Object.values(validationErrors).join("\n")}
                </b>
              </div>
              <Grid item>
                <TextField
                  required
                  id="email"
                  error={validationErrors.name}
                  helperText={validationErrors.name}
                  label={"Email"}
                  variant="outlined"
                  fullWidth
                  value={userToUse.email}
                  onChange={event =>
                    handleAttributeChange(event.target.value, "email")
                  }
                />
              </Grid>

              <Grid item>
                <Autocomplete
                  id="tags-outlined"
                  options={usersForSelect}
                  getOptionLabel={option => option.id}
                  defaultValue={defaultDhis2User}
                  filterSelectedOptions
                  onChange={(event, option) =>
                    handleAttributeChange(
                      option ? option.id : option,
                      "dhis2UserRef",
                    )
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="DHIS2 user references"
                      className={classes.textField}
                      placeholder="Search by name or email"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={10} sm={9}>
                <Button
                  variant="outlined"
                  disabled={!isDirty || !userCanEdit}
                  onClick={() => userMutation.mutate()}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default UserForm;
