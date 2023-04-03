import { styled } from '@mui/material';

export const StyledAssigne = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 5,
  '& .MuiFormLabel-root': {
    top: '-6px',
  },
}));
