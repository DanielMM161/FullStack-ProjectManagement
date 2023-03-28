import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1000,
      xl: 1400,
    },
  },
});

export default theme;