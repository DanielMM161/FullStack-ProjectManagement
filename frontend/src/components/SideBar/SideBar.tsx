import { Avatar, IconButton, List, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';

import ListButtonItem from '../ListButtonItem/ListButtonItem';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { useNavigate } from 'react-router';
//import './style.css';
import { ListContainer, LogoutContainer, SideBarLayout } from './styled';
import LogoutIcon from '@mui/icons-material/Logout';
import { Logout } from '@mui/icons-material';
import { logOut } from '../../redux/slice/profile.slice';

function SideBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profileState = useAppSelector((state) => state.profile);
  const { profile } = profileState;

  return (
    <SideBarLayout>
      <div className="avatar-info">
        <div className="info-name">
          <Avatar alt={profile.firstName} src="/static/images/avatar/1.jpg" sx={{ width: 36, height: 36 }} />
          <Typography variant='h6' sx={{marginLeft: '8px'}}>
            {profile.firstName} {profile.lastName}
          </Typography>
        </div>
      </div>
      <ListContainer>
        <List>
          <ListButtonItem title="Dashboard" onClick={() => navigate('/dashboard')}>
            <DashboardIcon />
          </ListButtonItem>
          <ListButtonItem title="Settings" onClick={() => {}}>
            <SettingsIcon />
          </ListButtonItem>
        </List>
      </ListContainer>      
      <LogoutContainer >
        <List>
          <ListButtonItem title='Log out' onClick={() => {dispatch(logOut())}}>
            <LogoutIcon />
          </ListButtonItem>
        </List>
      </LogoutContainer>
    </SideBarLayout>
  );
}

export default SideBar;
