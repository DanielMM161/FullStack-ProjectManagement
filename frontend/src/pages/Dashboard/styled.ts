import styled from '@emotion/styled';
import { Paper } from '@mui/material';

export const ProjectSummaryContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& .textContainer': {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const ProjectsContainer = styled(Paper)({
  marginTop: '1rem',
  height: '100%',
  display: 'grid',
  overflow: 'scroll',
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 15rem), 1fr))',
  padding: '1.5rem',
  backgroundColor: '#ffffff',
  gap: '18px',
  borderRadius: 18,
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});
