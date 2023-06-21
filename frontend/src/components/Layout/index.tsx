import { StyledLayout } from './styled';

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
