import styled from '@emotion/styled';

const LayoutUserContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  '& .user-container': {
    display: 'flex',
    flexDirection: 'column',
    scrollBehavior: 'smooth',
    overflowY: 'scroll',
  },
});

export default LayoutUserContainer;
