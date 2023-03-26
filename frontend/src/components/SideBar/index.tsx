import { useNavigate } from 'react-router';
import { Avatar, List, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ListButtonItem from '../ListButtonItem/ListButtonItem';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import StyledSideBar from './styled';
import { logOut } from '../../redux/slice/profile';

function SideBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profileState = useAppSelector((state) => state.profile);
  const { profile } = profileState;

  return (
    <StyledSideBar>
      <div className="avatar-info">
        <div className="info-name">
          <Avatar alt={profile.firstName} src="/static/images/avatar/1.jpg" sx={{ width: 36, height: 36 }} />
          <Typography variant="h6" sx={{ marginLeft: '8px' }}>
            {profile.firstName} {profile.lastName}
          </Typography>
        </div>
      </div>
      <div className="list-container">
        <List>
          <ListButtonItem title="Dashboard" onClick={() => navigate('/dashboard')}>
            <DashboardIcon />
          </ListButtonItem>
          <ListButtonItem title="Settings" onClick={() => {}}>
            <SettingsIcon />
          </ListButtonItem>
        </List>
      </div>
      <div className="logout-container">
        <List>
          <ListButtonItem
            title="Log out"
            onClick={() => {
              dispatch(logOut());
            }}
          >
            <LogoutIcon />
          </ListButtonItem>
        </List>
      </div>
    </StyledSideBar>
  );
}

export default SideBar;
