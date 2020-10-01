import React, { useEffect } from "react";
import Api from "../lib/Api";
const Dhis2DataElementsContainer = props => {
  useEffect(async () => {
    const result = await axios(
      "https://hn.algolia.com/api/v1/search?query=redux",
    );

    setData(result.data);
  });
  return props.children;
};

export default Dhis2DataElementsContainer;
