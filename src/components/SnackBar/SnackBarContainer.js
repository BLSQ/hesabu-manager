import React, { Component } from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { withTranslation } from "react-i18next";
import isEqual from "lodash/isEqual";
import { removeSnackbar } from "../../actions/snackBar";
import SnackBarButton from "./SnackBarButton";

class SnackBarContainer extends Component {
  displayed = [];

  saveDisplayedSnackBar = snackBar => {
    this.displayed = [...this.displayed, snackBar];
  };

  shouldComponentUpdate({ notifications: newSnacks = [] }) {
    const { notifications: currentSnacks } = this.props;
    let hasNewSnackBar = !isEqual(newSnacks, currentSnacks);
    newSnacks.forEach(snack => {
      if (hasNewSnackBar) return false;
      hasNewSnackBar =
        hasNewSnackBar ||
        !currentSnacks.filter(({ key }) => snack.key === key).length;
    });
    return hasNewSnackBar;
  }

  displaySnackBars(notification) {
    const { t } = this.props;
    const options = {
      ...notification.options,
    };

    if (notification.buttonMessageKey && notification.buttonAction) {
      options.action = (
        <SnackBarButton
          messageKey={notification.buttonMessageKey}
          onClick={() => notification.buttonAction()}
        />
      );
    }

    // Display snackbar using notistack
    const message = t(notification.messageKey);
    const id = this.props.enqueueSnackbar(message, options);

    // Keep track of snackbars that we've displayed
    this.saveDisplayedSnackBar({
      key: notification.key,
      message,
      options,
      id,
    });
  }

  closePersistingSnackBars() {
    // close persisting notifications if not in the store anymore
    const { notifications = [] } = this.props;
    this.displayed.forEach(displayedNotification => {
      if (
        displayedNotification.options.persist &&
        !notifications.find(n => n.key === displayedNotification.key)
      ) {
        this.props.closeSnackbar(displayedNotification.id);
      }
    });
  }

  componentDidUpdate() {
    const { notifications = [], dispatch } = this.props;
    notifications.forEach(notification => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.find(s => s.key === notification.key)) return;

      this.displaySnackBars(notification);
      if (!notification.options.persist) {
        // Dispatch action to remove snackbar from redux store)
        dispatch(removeSnackbar(notification.key));
      }
    });
    this.closePersistingSnackBars();
  }

  render() {
    return null;
  }
}

const mapStateToProps = store => ({
  notifications: store.snackBar.notifications,
});

export default withTranslation("translations")(
  connect(mapStateToProps)(withSnackbar(SnackBarContainer)),
);
