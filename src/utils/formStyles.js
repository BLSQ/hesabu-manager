export const draggedItemStyle = isDragging => ({
  userSelect: "none",
  boxShadow: isDragging ? "0px 3px 5px 3px rgba(0,0,0,0.1)" : "none",
});

export default function(theme) {
  return {
    paper: {
      padding: theme.spacing(3),
    },
    radioGroup: {
      margin: theme.spacing(1, 0),
    },
    radioGroupColumns: {
      margin: theme.spacing(1, 0),
      flexDirection: "row",
    },
    formControl: {
      marginBottom: theme.spacing(4),
    },
  };
}
