import React, { useState } from "react";
import { useMutation } from "react-query";
import { Button, Grid, Typography, Box, TextField } from "@material-ui/core";
import { deserialize } from "../../utils/jsonApiUtils";
import { externalApi } from "../../actions/api";
import { canEdit } from "../../actions/api";

const UserForm = ({ user, queryClient, closeEditUser, modeCreate }) => {
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
        closeEditUser();
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

  return (
    <Box>
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
              <TextField
                label={"DHIS2 reference ID"}
                id="dhis2"
                error={validationErrors.dhis2_user_ref}
                helperText={validationErrors.dhis2_user_ref}
                variant="outlined"
                fullWidth
                value={userToUse.dhis2UserRef}
                onChange={event =>
                  handleAttributeChange(event.target.value, "dhis2UserRef")
                }
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
    </Box>
  );
};

export default UserForm;
