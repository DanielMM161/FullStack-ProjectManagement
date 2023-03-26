import { Chip, Menu, styled } from '@mui/material';
import { useState } from 'react';
import FlagIcon from '@mui/icons-material/Flag';
import { Priority } from '../../models/task';
import PrioritiesContainer from './styled';

interface MenuPriorityTaskProps {
  actualPriority: Priority;
  selectPriorityClick: (priority: string) => void;
}

function MenuPriorityTask({ actualPriority, selectPriorityClick }: MenuPriorityTaskProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  function handleSelectPriority(priority: string) {
    setAnchorEl(null);
    selectPriorityClick(priority);
  }

  return (
    <>
      <Chip onClick={(e) => handleClick(e)} size="small" icon={<FlagIcon />} label={actualPriority.toString()} />
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
        <PrioritiesContainer>
          <Chip
            size="small"
            icon={<FlagIcon />}
            label={Priority[Priority.low]}
            sx={{ cursor: 'pointer', justifyContent: 'flex-start' }}
            onClick={() => handleSelectPriority(Priority[Priority.low])}
          />
          <Chip
            size="small"
            icon={<FlagIcon />}
            label={Priority[Priority.medium]}
            sx={{ cursor: 'pointer', justifyContent: 'flex-start' }}
            onClick={() => handleSelectPriority(Priority[Priority.medium])}
          />
          <Chip
            size="small"
            icon={<FlagIcon />}
            label={Priority[Priority.high]}
            sx={{ cursor: 'pointer', justifyContent: 'flex-start' }}
            onClick={() => handleSelectPriority(Priority[Priority.high])}
          />
        </PrioritiesContainer>
      </Menu>
    </>
  );
}

export default MenuPriorityTask;
