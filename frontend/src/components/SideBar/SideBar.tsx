import { Avatar, List, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';

import ListButtonItem from '../ListButtonItem/ListButtonItem';
import { useAppSelector } from '../../hooks/redux.hook';
import { useNavigate } from 'react-router';
//import './style.css';
import { ListContainer, SideBarLayout } from './styled';

function SideBar() {
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
    </SideBarLayout>
  );
}

export default SideBar;
