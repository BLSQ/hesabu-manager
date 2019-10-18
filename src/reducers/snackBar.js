import {
  ENQUEUE_SNACKBAR,
  CLOSE_FIXED_SNACKBAR,
  REMOVE_SNACKBAR,
} from "../constants/types";

function snackBar(
  state = {
    notifications: [],
  },
  action,
) {
  console.log("Snacking", { state });
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.notification,
          },
        ],
      };

    case CLOSE_FIXED_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification =>
            notification.options.pesist &&
            (!notification.type || notification.type !== action.key),
        ),
      };

    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key,
        ),
      };

    default:
      return state;
  }
}

export default snackBar;
