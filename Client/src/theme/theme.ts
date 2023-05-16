import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#e8dbce",
      dark: "#e8e7e5",
    },
    secondary: {
      main: "#000000",
      dark: "#000000",
    },
    background: {
      default: "#f1f0ef",
      paper: "#f1f0ef",
    },
  },
  typography: {
    button: {
      fontFamily: "Prata",
    },
    body2: {
      fontFamily: "Josefin Sans",
    },
    body1: {
      fontFamily: "Prata",
    },
    subtitle2: {
      fontFamily: "Prata",
    },
    subtitle1: {
      fontFamily: "Prata",
    },
    h6: {
      fontFamily: "Prata",
    },
    h5: {
      fontFamily: "Prata",
    },
    h4: {
      fontFamily: "Prata",
    },
    h3: {
      fontFamily: "Prata",
    },
    h2: {
      fontFamily: "Prata",
    },
    h1: {
      fontFamily: "Prata",
    },
    caption: {
      fontFamily: "Josefin Sans",
    },
    overline: {
      fontFamily: "Josefin Sans",
    },
  },
  shape: {
    borderRadius: 0,
  },
});
