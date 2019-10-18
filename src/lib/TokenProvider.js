import { Component } from "react";
import connect from "react-redux/lib/connect/connect";
import { receiveToken, receiveTokenError } from "../actions/api";

import Api from "./Api";

class TokenProvider extends Component {
  componentDidMount() {
    if (false) {
      Api.projectToken()
        .then(token => {
          this.props.receiveToken(token);
        })
        .catch(e => {
          this.props.receiveTokenError(e.message);
        });
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = state => ({
  token: state.api.token,
  errored: !!state.api.error,
});

export default connect(
  mapStateToProps,
  { receiveToken, receiveTokenError },
)(TokenProvider);
