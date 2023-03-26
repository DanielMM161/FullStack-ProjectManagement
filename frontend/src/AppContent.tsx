import { Outlet } from 'react-router-dom';
import SideBar from './components/SideBar';

function AppContent() {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
}

export default AppContent;
