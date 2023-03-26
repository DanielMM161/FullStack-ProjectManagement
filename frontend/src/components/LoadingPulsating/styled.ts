import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const pulseRing = keyframes`
  0% {
    transform: scale(.33);
  }
  80%, 100% {
    opacity: 0;
  }
`;

const StyledLoadingPulsating = styled('div')({
  display: 'flex',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgb(133 133 133 / 31%)',
  flexFlow: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  zIndex: 2,
  '& .pulsating-circle': {
    width: 30,
    height: 30,
    '&:before': {
      content: '""',
      position: 'relative',
      display: 'block',
      width: '300%',
      height: '300%',
      boxSizing: 'border-box',
      marginLeft: '-100%',
      marginTop: '-100%',
      borderRadius: '45px',
      backgroundColor: 'rgb(97 17 34 / 1)',
      animation: `${pulseRing} 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite`,
    },
  },
  '& span': {
    padding: '.5rem',
    backgroundColor: 'rgb(255 255 255)',
    color: 'black',
  },
});

export default StyledLoadingPulsating;
