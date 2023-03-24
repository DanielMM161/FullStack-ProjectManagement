import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Paper } from '@mui/material';

const Layout = styled(Paper)({
  display: 'flex',
  cursor: 'pointer',
  padding: '0.5rem',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxHeight: '40px',
  backgroundColor: 'white',
  borderRadius: 3,
});

const TitleContainer = styled('div')({
  width: '100%',
});

interface TaskListProps {
  title: string;
  onClick: () => void;
  onDeleteClick: () => void;
}

function TaskList({ title, onClick, onDeleteClick }: TaskListProps) {
  return (
    <Layout elevation={1}>
      <TitleContainer onClick={onClick}>{title}</TitleContainer>
      <IconButton onClick={onDeleteClick}>
        <DeleteIcon />
      </IconButton>
    </Layout>
  );
}

export default TaskList;
