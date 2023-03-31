import { MenuItem, Typography } from '@mui/material';
import TaskList from '../TaskList';
import ButtonInput from '../ButtonInput';
import MenuOptions from '../MenuOptions';
import { Task } from '../../models/task';
import { Content, StyledListInfo } from './styled';

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
    <StyledListInfo>
      <Content>
        <div className="head-list">
          <Typography variant='h5'>
            {title}
          </Typography>
          <MenuOptions>
            <MenuItem onClick={() => deleteListClick()}>Delete</MenuItem>
          </MenuOptions>
        </div>

        <ButtonInput className='button-add-task' labelText="Task Name" buttonText="Add Task" addClick={(value) => addTaskClick(value)} />

        {tasks && tasks.length > 0 && (
          <div className="task-content">
            {tasks.map((t) => (
              <TaskList
                key={t.id}
                onClick={() => taskClick(t.id)}
                title={t.title}
                onDeleteClick={() => deleteTaskClick(t.id)}
              />
            ))}
          </div>
        )}

      </Content>
    </StyledListInfo>
  );
}

export default ListInfo;
