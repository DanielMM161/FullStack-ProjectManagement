import { styled } from '@mui/material';
import { StyledLayout } from './styled';

// const Layout = styled('div')(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   marginLeft: '240px',  
//   height: '100%',
//   paddingTop: '80px',
//   paddingBottom: '60px',
//   maxWidth: '1170px',
//   margin: '0 auto',
//   [`@media screen and (max-width: ${theme.breakpoints.values.md}px)`]: {
//     marginLeft: 0,
//   },
// }));

// export default Layout;

interface Props {
  children: React.ReactNode
}

function Layout({children}: Props) {

  return (
    <StyledLayout>
      <div>
        {children}
      </div>      
    </StyledLayout>
  )
}

export default Layout;
