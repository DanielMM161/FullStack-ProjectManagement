import { useNavigate } from 'react-router';
import { Avatar, List, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import ListButtonItem from '../ListButtonItem/ListButtonItem';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import StyledSideBar from './styled';
import FolderIcon from '@mui/icons-material/Folder';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { logout } from '../../redux/slice/ProfileSlice';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { useEffect, useState } from 'react';
import { toggleSideBar } from '../../redux/slice/ActionsSlice';

interface ItemListOption {
  title: string;
  icon: JSX.Element;
  navigateTo: string;
}

const itemListOptions: ItemListOption[] = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
    navigateTo: '/dashboard'    
  },
  {
    title: 'Profile',
    icon: <PersonIcon />,
    navigateTo: '/profile' 
  },
  {
    title: 'Settings',
    icon: <SettingsIcon />,
    navigateTo: '/profile'     
  }
]

function SideBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profileState = useAppSelector((state) => state.profile);  
  const actionsState = useAppSelector((state) => state.actions);
  const { showSideBar } = actionsState;
  const { profile } = profileState;
  const [activeItem, setActiveItem] = useState(itemListOptions[0]);

  function handleItemClick(item: ItemListOption) {
    setActiveItem(item)
    navigate(item.navigateTo)
  }

  return (
    <StyledSideBar className={showSideBar ? 'close-side-bar glassmorphism' : 'open-side-bar'}>
      <div className="top-side">
        <div className="avatar-info">
          <div className="info-name">
            <Avatar 
              alt={profile.firstName} 
              src={`data:image/jpeg;base64,${profile.pictureProfile}`} 
              sx={{ width: 56, height: 56 }} 
            />

            <KeyboardArrowLeftIcon 
              className="arrow-icon" 
              onClick={() => dispatch(toggleSideBar({}))} 
            />

            {showSideBar ? (
              <ExpandCircleDownIcon className="expand-icon" onClick={() => dispatch(toggleSideBar({}))} />
            ) : null}
          </div>
          <Typography variant="h6">
            {profile.firstName} {profile.lastName}
          </Typography>
          <Typography variant="subtitle1">{profile.email}</Typography>
        </div>
        
          <List>
            {itemListOptions.map((item, index) => 
               <ListButtonItem
                key={index}
                selected={activeItem.title == item.title}
                title={item.title}
                onClick={() => handleItemClick(item)}              
              >
               {item.icon}
              </ListButtonItem>
            )}            
          </List>
        
      </div>
      <ListButtonItem
        title="Log out"
        selected={false}
        onClick={() => dispatch(logout())}
      >
        <LogoutIcon />
      </ListButtonItem>
      
    </StyledSideBar>
  );
}

export default SideBar;
