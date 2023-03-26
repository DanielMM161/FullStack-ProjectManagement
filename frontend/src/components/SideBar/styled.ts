import styled from '@emotion/styled';

const StyledSideBar = styled('div')({
  position: 'fixed',
  width: '300px',
  height: '100%',
  backgroundColor: 'white',
  padding: '1rem',
  '& .avatar-info': {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    '& .info-name': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  '& .list-container': {
    padding: '1rem',
  },
  '& .logout-container': {
    position: 'fixed',
    bottom: 0,
    padding: '1rem',
  },
});

export default StyledSideBar;
