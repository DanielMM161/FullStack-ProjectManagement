import styled from '@emotion/styled';

const StyledInputControlButton = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1rem',
  '& .buttons-container': {
    marginTop: 5,
    display: 'flex',
    alignItems: 'flex-start',
    gap: 5,
  },
});

export default StyledInputControlButton;
