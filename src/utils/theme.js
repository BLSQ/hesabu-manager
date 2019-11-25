import { createMuiTheme } from "@material-ui/core";

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
});

export default theme;
