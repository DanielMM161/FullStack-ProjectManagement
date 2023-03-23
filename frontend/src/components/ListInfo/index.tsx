import styled from '@emotion/styled';
import { MenuItem, Paper } from '@mui/material';
import TaskList from '../TaskList';
import ButtonInput from '../ButtonInput';
import MenuOptions from '../MenuOptions';
import { Task } from '../../models/task.model';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',  
});

const Content = styled(Paper)({
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: '#e1e1e1',
  borderRadius: 3
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
  tasks: Task[];
  taskClick: (id: number) => void;
  addTaskClick: (taskName: string) => void;
  deleteListClick: () => void;  
  deleteTaskClick: (taskId: number) => void;  
}

function ListInfo({ title, tasks, taskClick, addTaskClick, deleteListClick, deleteTaskClick }: ListInfoProps) {  
  return (
    <Container>
      <Content elevation={2}>
        <Header>
          {title}
          <MenuOptions>
            <MenuItem onClick={deleteListClick}>Delete</MenuItem>
          </MenuOptions>
        </Header>

        {tasks && tasks.length > 0 && (
          <TaskContent>
            {tasks.map((t) => (
              <TaskList key={t.id} onClick={() => taskClick(t.id)} title={t.title} onDeleteClick={() => deleteTaskClick(t.id)} />
            ))}
          </TaskContent>
        )}

        <ButtonInput labelText='Task Name' buttonText="Add Task" addClick={(value) => addTaskClick(value)} />
      </Content>
    </Container>
  );
}

export default ListInfo;
