import styled from '@emotion/styled';

const Layout = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '300px',
  padding: '1.5rem 2rem 1.5rem;',
  height: '100%',
  '@media (max-width: 960px)': {
    marginLeft: 0,
  },
});

export default Layout;
