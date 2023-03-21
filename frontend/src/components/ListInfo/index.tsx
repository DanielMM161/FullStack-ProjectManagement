import styled from '@emotion/styled';
import { MenuItem } from '@mui/material';
import TaskList from '../TaskList';
import ButtonInput from '../ButtonInput';
import MenuOptions from '../MenuOptions';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
});

const Content = styled('div')({
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: '#e1e1e1',
});

const TaskContent = styled('div')({
  marginBottom: '1rem',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 10,
});

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
});

interface ListInfoProps {
  title: string;
  tasks: [];
  taskClick: (id: number) => void;
  addTaskClick: (taskName: string) => void;
  deleteListClick: () => void;
}

function ListInfo({ title, tasks, taskClick, addTaskClick, deleteListClick }: ListInfoProps) {
  return (
    <Container>
      <Content>
        <Header>
          {title}
          <MenuOptions>
            <MenuItem onClick={deleteListClick}>Delete</MenuItem>
          </MenuOptions>
        </Header>

        {tasks && tasks.length > 0 && (
          <TaskContent>
            {tasks.map((t) => (
              <TaskList onClick={() => taskClick(1)} title="" />
            ))}
          </TaskContent>
        )}

        <ButtonInput buttonText="Add Task" addClick={(value) => addTaskClick(value)} />
      </Content>
    </Container>
  );
}

export default ListInfo;
