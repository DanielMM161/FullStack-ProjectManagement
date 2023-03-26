import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledTaskDetail = styled(Box)({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  width: '500px',
  '& .subtask-container': {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const InfoContainer = styled(Box)({
  display: 'flex',
  gap: 30,
  width: '100%',
  alignItems: 'center',
  marginBottom: '1rem',
  '& .chip-container': {
    display: 'grid',
    width: '100%',
    gap: 5,
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 6rem), 1fr))',
  },
});
