import styled from '@emotion/styled';
import { Paper } from '@mui/material';

export const ProjectInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '1.5rem',
  gap: 20,
  borderRadius: 18,
  '& .project-info-container': {
    display: 'flex',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    '& .update-info': {
      marginLeft: '2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
});

export const ListContainer = styled(Paper)({
  marginTop: '1rem',
  display: 'grid',
  height: '100%',
  width: '100%',
  overflowX: 'scroll',
  alignItems: 'flex-start',
  padding: '1.5rem',
  backgroundColor: '#ffffff',
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 15rem), 1fr))',
  gap: '25px',
  borderRadius: 18,
  overflow: 'hidden',
});
