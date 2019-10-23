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

export const hEXtoHSL = (hex, brightnessCorrection = 0, alpha = 1) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);

  const min = Math.min(r, g, b);
  let h;

  let s;

  let l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  s *= 100;
  s = Math.round(s);
  l *= 100;
  l = Math.round(l);
  h = Math.round(360 * h);
  return `hsla(${h}, ${s}%, ${l + brightnessCorrection}%,  ${alpha})`;
};

export default theme;
