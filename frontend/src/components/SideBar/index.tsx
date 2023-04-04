import { useNavigate } from 'react-router';
import { Avatar, List, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import ListButtonItem from '../ListButtonItem/ListButtonItem';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import StyledSideBar from './styled';
import FolderIcon from '@mui/icons-material/Folder';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { logOut } from '../../redux/slice/profile';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { useState } from 'react';
import { toggleSideBar } from '../../redux/slice/actions';

function SideBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profileState = useAppSelector((state) => state.profile);
  const projectState = useAppSelector((state) => state.projects);
  const { projectSelectedId } = projectState;
  const actionsState = useAppSelector((state) => state.actions);
  const { showSideBar } = actionsState;
  const [dashboardItem, setDashboardItem] = useState(false);
  const [projectItem, setProjectItem] = useState(false);  
  const { profile } = profileState;

  function handleDashboardClick() {
    setDashboardItem(!dashboardItem);
    setProjectItem(false);
    navigate('/dashboard');
  }

  function handleProjectClick() {
    setDashboardItem(false);
    setProjectItem(!projectItem);
    navigate(`dashboard/project/${projectSelectedId}`);
  }

  return (
    <StyledSideBar className={showSideBar ? 'close-side-bar glassmorphism' : 'open-side-bar'}>
      <div className="top-side">
        <div className="avatar-info">
          <div className="info-name">
            <Avatar alt={profile.firstName} src="/static/images/avatar/1.jpg" sx={{ width: 56, height: 56 }} />
            <KeyboardArrowLeftIcon className="arrow-icon" onClick={() => dispatch(toggleSideBar())} />
            {showSideBar ? (
              <ExpandCircleDownIcon className="expand-icon" onClick={() => dispatch(toggleSideBar())} />
            ) : null}
          </div>
          <Typography variant="h6">
            {profile.firstName} {profile.lastName}
          </Typography>
          <Typography variant="subtitle1">{profile.email}</Typography>
        </div>
        <div className="list-container">
          <List>
            <ListButtonItem 
              title="Dashboard" 
              onClick={() => handleDashboardClick()} 
              //selected={!projectItem || dashboardItem || projectSelectedId !== 0}
            >
              <DashboardIcon />
            </ListButtonItem>
            <ListButtonItem
              title="Project"
              onClick={() => {
                handleProjectClick();
              }}
              disabled={projectSelectedId == 0 ? true : false}
             // selected={projectItem || projectSelectedId !== 0}
            >
              <FolderIcon />
            </ListButtonItem>
          </List>
        </div>
      </div>
      <div className="bottom-side">
        <List>
          <ListButtonItem
            title="Log out"
            onClick={() => {
              dispatch(logOut());
            }}
            selected={false}
          >
            <LogoutIcon />
          </ListButtonItem>
        </List>
      </div>
    </StyledSideBar>
  );
}

export default SideBar;
