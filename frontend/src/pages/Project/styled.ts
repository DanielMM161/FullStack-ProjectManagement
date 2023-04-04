import { styled } from '@mui/material';

export const ProjectInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 20,
  borderRadius: 18,
  '& .project-info-container': {
    width: '100%',
    display: 'flex',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .name-container': {
      display: 'flex',
      flexDirection: 'inline',
      gap: 10,
      [`@media screen and (max-width: ${theme.breakpoints.values.md}px)`]: {
        flexDirection: 'column',
        gap: 0,
        '& .update-info': {
          marginLeft: '0',
        },
      },
    },
    '& .update-info': {
      gap: '5px',
      marginLeft: '2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '& .avatar-container': {
      display: 'flex',
    },
  },
}));

export const ListOptions = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '4rem',
  maxHeight: '40px',
  '& .filter-tasks': {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 5,
  },
}));

export const ListContainer = styled('div')({
  marginTop: '4rem',
  display: 'flex',
  height: '100%',
  width: '100%',
  overflowX: 'auto',
  overflowY: 'hidden',
  alignItems: 'flex-start',
  scrollBehavior: 'smooth',
  gap: '25px',
});
