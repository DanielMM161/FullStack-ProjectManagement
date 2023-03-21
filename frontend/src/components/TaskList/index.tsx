import styled from '@emotion/styled';

const Container = styled('div')({
  display: 'flex',
  cursor: 'pointer',
  padding: '0.5rem',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
});

interface TaskListProps {
  title: string;
  onClick: () => void;
}

function TaskList({ title, onClick }: TaskListProps) {
  return <Container onClick={onClick}>{title}</Container>;
}

export default TaskList;
