import { styled } from '@mui/material';

const Layout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '300px',
  padding: '1.5rem 2rem 1.5rem;',
  height: '100%',
  [`@media screen and (max-width: ${theme.breakpoints.values.md}px)`]: {
    marginLeft: 0,
  },
}));

export default Layout;
