import { Avatar, Chip, Divider, IconButton, Menu, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { User } from '../../models/user';
import ControlledInput from '../ControlledInput/ControlledInput';
import LayoutUserContainer from './styled';

interface SelectUserProps {
  users: User[];
  selectUserClick: (user: User) => void;
}

function SelectUser({ users, selectUserClick }: SelectUserProps) {
  const [members, setMembers] = useState(users);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  function handleOnUpdateInput(text: string) {
    if (text.trim() === '') {
      setMembers(users);
    } else {
      let items = [...members];
      items = items.filter((item) => item.firstName.toLowerCase().startsWith(text.toLowerCase()));
      setMembers(items);
    }
  }

  function handleSelectUser(user: User) {
    handleClose();
    selectUserClick(user);
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <Add fontSize="small" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        onBlur={() => handleClose()}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <LayoutUserContainer>
          <Typography variant="subtitle1" textAlign="center">
            Members
          </Typography>
          <Divider />
          <ControlledInput onUpdate={(value) => handleOnUpdateInput(value)} />
          <Typography variant="subtitle1" sx={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
            All Members
          </Typography>
          <div className="user-container">
            {members.map((u) => (
              <Chip
                key={u.email}
                avatar={<Avatar key={u.email} alt={u.firstName} src={u.avatar} />}
                label={`${u.firstName} ${u.lastName}`}
                size="small"
                sx={{ cursor: 'pointer' }}
                onClick={() => handleSelectUser(u)}
              />
            ))}
          </div>
        </LayoutUserContainer>
      </Menu>
    </>
  );
}

export default SelectUser;
