import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Api from "../lib/Api";
import { useStore } from "react-redux";
import { dhis2ReceiveDe, dhis2RequestDe } from "../actions/dhis2";
import keyBy from "lodash/keyBy";

/*
  here to populate the store with data elements and indicator cache for faster display within the children
  see ../lib/dhis2lookups{*} for pratical usage
*/

const loadData = async () => {
  const api = await Api.instance();
  const deResp = await api.get("dataElements", {
    fields: "id,name,valueType,aggregationType,dimensionItemType",
    filter: "domainType:eq:AGGREGATE",
    paging: false,
  });
  const indResp = await api.get("indicators", {
    fields: "id,name,numerator,dimensionItemType",
    paging: false,
  });
  const cocResp = await api.get("categoryOptionCombos", {
    fields: "id,name,dimensionItemType",
    paging: false,
  });
  return {
    dataElements: keyBy(deResp.dataElements, "id"),
    indicators: keyBy(indResp.indicators, "id"),
    categoryOptionCombos: keyBy(cocResp.categoryOptionCombos, "id"),
  };
};

const Dhis2DataElementsProvider = props => {
  const dispatch = useDispatch();
  const store = useStore();
  const [status, setStatus] = useState(store.getState().dhis2.status);
  useEffect(() => {
    const fetchDataElements = async () => {
      if (store.getState().dhis2.status === null) {
        dispatch(dhis2RequestDe());

        dispatch(dhis2ReceiveDe(await loadData()));
        setStatus("LOADED");
      }
    };
    fetchDataElements();
  }, [dispatch, store]);
  return status == "LOADED" ? (
    props.children
  ) : (
    <span>Loading data elements... {store.getState().dhis2.status}</span>
  );
};

export default Dhis2DataElementsProvider;
