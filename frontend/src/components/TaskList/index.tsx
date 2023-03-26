import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import StyledTaskList from './styled';

interface TaskListProps {
  title: string;
  onClick: () => void;
  onDeleteClick: () => void;
}

function TaskList({ title, onClick, onDeleteClick }: TaskListProps) {
  return (
    <StyledTaskList elevation={1}>
      <div className="title-container" onClick={onClick}>
        {title}
      </div>
      <IconButton onClick={onDeleteClick}>
        <DeleteIcon />
      </IconButton>
    </StyledTaskList>
  );
}

export default TaskList;
