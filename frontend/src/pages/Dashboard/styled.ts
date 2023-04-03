import styled from '@emotion/styled';

export const ProjectSummaryContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& .textContainer': {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const ProjectsContainer = styled('div')({
  marginTop: '2rem',
  height: '100%',
  display: 'grid',
  overflow: 'scroll',
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 15rem), 1fr))',
  gridTemplateRows: 'repeat(auto-fill, minmax(min(100%, 15rem), 1fr))',
  gap: '18px',
  borderRadius: 18,
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

export const EmptyList = styled('div')({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  textAlign: 'center',
  '& img': {
    height: '58%',
    bottom: '100px',
  },
});
