import React, { useState } from "react";
import { Grid, TextField, Typography } from "@material-ui/core";
import { useQuery } from "react-query";
import { dependencies } from "./utils";
import { externalApi } from "../../actions/api";
import useDebounce from "../../lib/useDebounce";

const FormulaTester = ({ formula, mockValues }) => {
  const dependenciesList = dependencies(formula.expression);
  const dict = {};
  dependenciesList.map(
    d => (dict[d] = d.endsWith("_values") ? "1, 2, 3" : "1"),
  );

  const [dependenciesDict, setDependenciesDict] = useState(dict);

  const debouncedDependenciesDict = useDebounce(dependenciesDict, 1000);

  const evaluateQuery = useQuery(
    ["evaluate", debouncedDependenciesDict],
    async () => {
      const payload = {
        expression: formula.expression,
        values: debouncedDependenciesDict,
      };

      const resp = await externalApi()
        .url("/calculations")
        .post(payload)
        .json();

      return resp;
    },
  );

  const handleValue = (value, dependency) => {
    dependenciesDict[dependency] = value;
    setDependenciesDict({ ...dependenciesDict });
  };

  return (
    <>
      <Grid item>
        <Typography>
          <b>Formula tester</b>
        </Typography>
        <Typography variant="h5" color="primary">
          {evaluateQuery?.isLoading ||
            (dependenciesDict !== debouncedDependenciesDict && (
              <> loading... </>
            ))}
          {evaluateQuery?.data?.error}
          {evaluateQuery?.data?.result}
        </Typography>
      </Grid>
      {dependencies(formula.expression).map(dependency => (
        <Grid item key={dependency}>
          <TextField
            label={dependency}
            name={dependency}
            variant="outlined"
            fullWidth
            value={dependenciesDict[dependency] || null}
            onChange={e => handleValue(e.target.value, e.target.name)}
          />
        </Grid>
      ))}
    </>
  );
};

export default FormulaTester;
