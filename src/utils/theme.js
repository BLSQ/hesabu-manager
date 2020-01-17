import { createMuiTheme, fade } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ["Roboto", '"Helvetica Neue"', "sans-serif"].join(","),
    fontSize: 14,
    h6: {
      fontWeight: 400,
    },
  },
  palette: {
    primary: { main: "#AB1441" },
    secondary: { main: "#EA622A" },
  },
  link: {
    color: "#AB1441",
    "&:hover": {
      color: fade("#AB1441", 0.8),
    },
    "&:visited": {
      color: fade("#AB1441", 0.5),
    },
  },
  formControl: {
    marginBottom: 16,
  },
});

export default theme;
