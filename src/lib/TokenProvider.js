import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { receiveToken, receiveTokenError } from "../actions/api";
import SectionLoading from "../components/Shared/SectionLoading";
import Api from "./Api";

class TokenProvider extends Component {
  componentDidMount() {
    Api.projectTokenAndUrl()
      .then(config => {
        this.props.receiveToken(config);
      })
      .catch(e => {
        this.props.receiveTokenError(e.message);
      });
  }

  render() {
    if (this.props.token) {
      return this.props.children;
    } else {
      return <SectionLoading />;
    }
  }
}

const mapStateToProps = state => ({
  token: state.api.token,
  url: state.api.url,
  errored: !!state.api.error,
});

export default connect(mapStateToProps, { receiveToken, receiveTokenError })(
  TokenProvider,
);
