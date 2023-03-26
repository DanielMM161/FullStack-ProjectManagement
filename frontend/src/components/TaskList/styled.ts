import styled from '@emotion/styled';
import { Paper } from '@mui/material';

const StyledTaskList = styled(Paper)({
  display: 'flex',
  cursor: 'pointer',
  padding: '0.5rem',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxHeight: '40px',
  backgroundColor: 'white',
  borderRadius: 3,
  '& .title-container': {
    width: '100%',
  },
});

export default StyledTaskList;
