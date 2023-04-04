import { styled } from '@mui/material';

const Layout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  '& .left-side': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    height: '100%',
    background: 'white',
    padding: '50px 150px',
    justifyContent: 'center',
    '& .divider-area': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 5,
      marginTop: '1rem',
      marginBottom: '1rem',
      width: '100%',
      '& hr': {
        width: '35%',
        color: '#9d9d9d',
      },
    },
    [`@media screen and (max-width: ${theme.breakpoints.values.md}px)`]: {
      width: '100%',
      padding: '50px 50px',
      height: '100%',
      display: 'flex',
      justifyContent: 'normal',
      alignItems: 'normal',
      '.divider-area > hr': {
        width: '20%',
      },
    },
    [`@media screen and (min-width: ${theme.breakpoints.values.xl}px)`]: {
      padding: '50px 200px',
    },
  },
  '& .right-side': {
    width: '50%',
    height: '100%',
    background: 'linear-gradient(180deg, #F2F2F2 0%, #cfdbff 100%)',
    '& img': {
      padding: '1rem',
      position: 'fixed',
    },
    '& #first-logo': {
      width: '31%',
      bottom: 0,
    },
    '& #second-logo': {
      top: 0,
      right: 0,
      width: '20%',
    },
    [`@media screen and (max-width: ${theme.breakpoints.values.md}px)`]: {
      display: 'none',
    },
  },
}));

export default Layout;
