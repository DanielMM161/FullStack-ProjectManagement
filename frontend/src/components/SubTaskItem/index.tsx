import { useState } from 'react';
import { Checkbox, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StyledSubTaskItem from './styled';

interface SubTaskItemProps {
  title: string;
  done: boolean;
  deleteOnClick: () => void;
  checkedClick: (checked: boolean) => void;
}

function SubTaskItem({ title, done, deleteOnClick, checkedClick }: SubTaskItemProps) {
  const [checked, setChecked] = useState(done);

  function handleCheckedClick() {
    checkedClick(!checked);
    setChecked(!checked);
  }

  return (
    <StyledSubTaskItem>
      <div className="title-container">
        <Checkbox defaultChecked size="small" checked={checked} onClick={() => handleCheckedClick()} />
        <Typography variant="subtitle1">{title}</Typography>
      </div>
      <IconButton onClick={deleteOnClick}>
        <DeleteIcon />
      </IconButton>
    </StyledSubTaskItem>
  );
}

export default SubTaskItem;
