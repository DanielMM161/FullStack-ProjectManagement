import styled from '@emotion/styled';
import { Paper } from '@mui/material';

const CardLayout = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  maxWidth: 345,
  padding: '1rem',
  borderRadius: 8,
  minHeight: 240,
  maxHeight: 280,
  '& .title-info': {
    display: 'flex',
    justifyContent: 'space-between',
  },
  '& .users-container': {
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    '& .icons-content': {
      display: 'flex',
    },
  },
});

export default CardLayout;
