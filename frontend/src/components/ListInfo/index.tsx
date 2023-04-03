import { MenuItem, TextField, Typography } from '@mui/material';
import TaskList from '../TaskList';
import ButtonInput from '../ButtonInput';
import MenuOptions from '../MenuOptions';
import { Task } from '../../models/task';
import { Content, StyledListInfo } from './styled';
import { useState } from 'react';

interface ListInfoProps {
  title: string;
  tasks: Task[];
  taskClick: (id: number) => void;
  addTaskClick: (taskName: string) => void;
  deleteListClick: () => void;
  deleteTaskClick: (taskId: number) => void;
  updateTitleList: (newTitle: string) => void;
}

function ListInfo({
  title,
  tasks,
  taskClick,
  addTaskClick,
  deleteListClick,
  deleteTaskClick,
  updateTitleList,
}: ListInfoProps) {
  const [titleList, setTitleList] = useState(title);
  const [editing, setEditing] = useState(false);

  function handleUpdateTitleList() {
    if (titleList === '') {
      setTitleList(title);
    }
    setEditing(!editing);
    updateTitleList(titleList);
  }

  return (
    <StyledListInfo>
      <Content>
        <div className="head-list">
          {editing ? (
            <TextField
              autoFocus
              value={titleList}
              onChange={(e) => setTitleList(e.target.value)}
              onBlur={() => {
                handleUpdateTitleList();
              }}
              size="small"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleUpdateTitleList();
              }}
            />
          ) : (
            <Typography variant="h5" onClick={() => setEditing(!editing)}>
              {titleList}
            </Typography>
          )}
          <MenuOptions>
            <MenuItem onClick={() => deleteListClick()}>Delete</MenuItem>
          </MenuOptions>
        </div>

        <ButtonInput
          className="button-add-task"
          labelText="Task Name"
          buttonText="Add Task"
          addClick={(value) => addTaskClick(value)}
        />

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
