import { useEffect, useState } from 'react';
import { Avatar, Chip, Divider, styled, Tab, Tabs, TextField, Typography, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { initialTaskValue, Task } from '../../models/task.model';
import { assignUser, deleteTask, getTaskById, removeUser, updateTask } from '../../services/task.service';
import { User } from '../../models/user.model';
import SelectUser from '../SelectUser';

import InputControlButton from '../InputControlButton';
import { createSubTask, updateDoneSubTask } from '../../services/subTask.service';
import SubTaskItem from '../SubTaskItem';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, index, value }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const InfoContainer = styled(Box)({
  display: 'flex',
  gap: 30,
  width: '100%',
  marginBottom: '1rem',
});

const ChipContainer = styled(Box)({
  display: 'grid',
  width: '100%',
  gap: 5,
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 6rem), 1fr))',
});

const SubTaskContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column'
});

interface TaskDetailProps {
  members: User[];
  taskId: number;
}

function TaskDetail({ members, taskId }: TaskDetailProps) {
  const dispatch = useAppDispatch();
  const profileState = useAppSelector((state) => state.profile);
  const { profile } = profileState;
  const [task, setTask] = useState<Task>(initialTaskValue);
  const [isLoading, setIsLoading] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [editing, setEditing] = useState(false);
  const [showAddSubTask, setShowAddSubTask] = useState(false);  
  const [value, setValue] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getTaskById(taskId))
    .then((result) => {
      if (result && result.payload) {
        setIsLoading(!isLoading);
        const item = result.payload as Task
        setTask(item);        
        setTaskDescription(item.description);
      }
    });
  }, [dispatch]);

  const handleClick = () => {
    setTaskTitle(task?.title);
    setEditing(true);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function handleRemoveUser(userId: number) {
    dispatch(
      removeUser({
        taskId: task.id,
        userId,
      }),
    ).then((result) => {
      if (result) {
        const copyTask = { ...task };
        copyTask.users = copyTask.users.filter((u) => u.id !== userId);
        setTask(copyTask);
      }
    });
  }

  function handleAssignUser(user: User) {
    dispatch(
      assignUser({
        taskId: task.id,
        userId: user.id,
      }),
    ).then((result) => {
      if (result && result.payload) {
        const copyTask = { ...task };
        copyTask.users.push(user);
        setTask(copyTask);
      }
    });
  }

  function handleUpdateTitle() {
    if (taskTitle.trim() !== '' && taskTitle.trim() !== task.title) {
      dispatch(
        updateTask({
          id: task.id,
          title: taskTitle,
          description: task.description,
          priority: task.priority.toString(),
          dueDate: task.dueDate.toString(),
        }),
      ).then((result) => {
        if (result && result.payload) {
          setTask(result.payload);
        }
      });
      setEditing(!editing);
    }
  }

  function handleUpdateDescription() {
    if (taskDescription.trim() !== '' && taskDescription.trim() !== task.description) {
      dispatch(
        updateTask({
          id: task.id,
          title: task.title,
          description: taskDescription,
          priority: task.priority.toString(),
          dueDate: task.dueDate.toString(),
        }),
      ).then((result) => {
        if (result && result.payload) {
          setTask(result.payload);
        }
      });      
    }
  }

  function handleAddSubTask(subTaskName: string) {
    dispatch(createSubTask({
        taskParentId: task.id,
        title: subTaskName,
        createdById: profile.id
    }))
    .then(result => {
        if (result && result.payload) {
            const item = {...task}
            item.subTasks.push(result.payload)
            setTask(item)
        }
    })
    setShowAddSubTask(!showAddSubTask)
  }

  function handleDeleteSubTask(subTaskId: number) {
    dispatch(deleteTask(subTaskId))
    .then(result => {
        if (result && result.payload) {
            const item = {...task}
            item.subTasks = item.subTasks.filter(i => i.id !== subTaskId)
            setTask(item)
        }
    })
  }

  function handleUpdateDoneSubTask(done: boolean, subTaskId: number) {
    dispatch(updateDoneSubTask({
        taskParentId: task.id,
        subTaskId: subTaskId,
        done:done
    }))
    .then(result => {
        if (result && result.payload) {
            const item = {...task}
            const subTask = item.subTasks.filter(st => st.id !== subTaskId)
            subTask.push(result.payload);
            item.subTasks = subTask;
            setTask(item)
        }
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        padding: '1rem',
        flexDirection: 'column',
        width: '500px',
      }}
    >
      {editing ? (
        <TextField
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onBlur={() => setEditing(!editing)}
          size="small"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleUpdateTitle();
          }}
        />
      ) : (
        <Typography onClick={handleClick} variant="h4">
          {task?.title}
        </Typography>
      )}

      <Typography variant="caption" marginTop="4px" marginBottom="4px">
        Prioridad: {task?.priority}
      </Typography>
      <Divider />

      <InfoContainer marginTop="1rem">
        <Typography variant="subtitle2" display="block" gutterBottom>
          Assigness
        </Typography>
        <ChipContainer>
          {task?.users.map((user) => (
            <Chip
                key={user.email}
              avatar={<Avatar key={user.email} alt="Natacha" src={user.avatar} />}
              label={user.firstName}
              onDelete={() => handleRemoveUser(user.id)}
              size="small"
            />
          ))}
        </ChipContainer>
        <SelectUser users={members} selectUserClick={(user) => handleAssignUser(user)} />
      </InfoContainer>

      <InfoContainer>
        <Typography variant="subtitle2" display="block" gutterBottom>
          Due Date
        </Typography>
        {task?.dueDate.toString()}
      </InfoContainer>

      <InfoContainer>
        <Typography variant="subtitle2" display="block" gutterBottom>
          Created By
        </Typography>
        <Chip
          avatar={<Avatar key={task?.createdBy.email} alt="Natacha" src={task?.createdBy.avatar} />}
          label={task?.createdBy.firstName}
          size="small"
        />
      </InfoContainer>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Description" {...a11yProps(0)} />
            <Tab label="Comments" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TextField
            id="outlined-multiline-static"
            multiline
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            onBlur={handleUpdateDescription}
            rows={2}
            sx={{
              width: 600,
              maxWidth: '100%',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleUpdateDescription();
            }}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>

      <InfoContainer paddingTop="1rem">
        {showAddSubTask ? (
          <InputControlButton
            label='Subtask Name'
            addClick={(value) => handleAddSubTask(value)}
            closeClick={() => setShowAddSubTask(!showAddSubTask)}
          />
        ) : (
          <Typography
            onClick={() => setShowAddSubTask(!showAddSubTask)}
            variant="subtitle2"
            display="block"
            gutterBottom
          >
            Add SubTasks
          </Typography>
        )}
      </InfoContainer>
        <SubTaskContainer>
            {task.subTasks.map(st => 
                <SubTaskItem 
                    key={st.id} 
                    title={st.title} 
                    done={st.done} 
                    deleteOnClick={() => handleDeleteSubTask(st.id)} 
                    checkedClick={(done) => handleUpdateDoneSubTask(done, st.id)}
                />
            )}
        </SubTaskContainer>
    </Box>
  );
}

export default TaskDetail;
