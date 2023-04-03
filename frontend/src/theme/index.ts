import createTheme from '@mui/material/styles/createTheme';

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

theme.typography.h2 = {
  fontSize: '3.7rem',
  [`@media screen and (max-width: ${theme.breakpoints.values.md}px)`]: {
    fontSize: '2.4rem',
  },
};

theme.typography.h6 = {
  fontSize: '1.25rem',
  [`@media screen and (max-width: ${theme.breakpoints.values.md}px)`]: {
    fontSize: '1.0rem',
  },
};

export default theme;
