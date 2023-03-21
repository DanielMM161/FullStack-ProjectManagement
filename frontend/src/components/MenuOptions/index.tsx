import { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton, Menu } from '@mui/material';

interface MenuOptionsProps {
  children: React.ReactNode;
}

function MenuOptions({ children }: MenuOptionsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        aria-label="options"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onBlur={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {children}
      </Menu>
    </>
  );
}

export default MenuOptions;
