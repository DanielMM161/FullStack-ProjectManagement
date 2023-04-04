import { styled } from '@mui/material';

const StyledSideBar = styled('div')(({ theme }) => ({
  zIndex: 4,
  position: 'fixed',
  width: '300px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: 'white',
  padding: '30px 40px',
  transition: 'transform .3s ease-in-out',
  '&.close-side-bar': {
    transform: 'translateX(-95%)',
  },
  '&.open-side-bar': {
    transform: 'translateX(0%)',
  },
  '&.glassmorphism': {
    background: 'rgba(255, 255, 255, 0.05)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.30)',
  },
  '& .expand-icon': {
    position: 'fixed',
    right: '-12px',
    transform: 'rotate(270deg)',
  },
  '& .open-side-bar': {
    width: '100%',
    background: 'red',
    transform: 'translateX(100%)',
  },
  '& .top-side': {
    width: '100%',
  },
  '& .bottom-side': {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    padding: '1rem',
  },
  '& .avatar-info': {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  '.avatar-info .info-name': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .arrow-icon': {
      display: 'none',
      [`@media screen and (max-width: ${theme.breakpoints.values.md}px)`]: {
        display: 'flex',
      },
    },
  },
  '& .list-container': {
    padding: '1rem',
  },
}));

export default StyledSideBar;
