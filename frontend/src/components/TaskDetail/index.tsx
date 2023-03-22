import { useEffect, useState } from 'react';
import { Avatar, Chip, Divider, IconButton, styled, Tab, Tabs, TextField, Typography, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useAppDispatch } from '../../hooks/redux.hook';
import { initialTaskValue, Task } from '../../models/task.model';
import { assignUser, getTaskById, removeUser, updateTask } from '../../services/task.service';
import { User } from '../../models/user.model';
import SelectUser from '../SelectUser';

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
  marginBottom: '1rem',
});

const ChipContainer = styled(Box)({
  display: 'grid',
  width: '100%',
  gap: 5,
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 6rem), 1fr))',
});

interface TaskDetailProps {
  members: User[];
  taskId: number;
}

function TaskDetail({ members, taskId }: TaskDetailProps) {
  const dispatch = useAppDispatch();
  const [task, setTask] = useState<Task>(initialTaskValue);
  const [isLoading, setIsLoading] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [editing, setEditing] = useState(false);
  const [showAddSubTask, setShowAddSubTask] = useState(false);
  const [subTask, setSubTask] = useState('');
  const [value, setValue] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getTaskById(taskId)).then((result) => {
      if (result && result.payload) {
        setIsLoading(!isLoading);
        setTask(result.payload);
        setTaskDescription(task?.description ?? '');
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

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' && taskTitle.trim() !== '' && taskTitle.trim() !== task.title) {
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
          onKeyDown={(e) => handleOnKeyDown(e)}
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
        <SelectUser users={members} selectUserClick={(user) => handleAssignUser(user)} />
        <ChipContainer>
          {task?.users.map((user) => (
            <Chip
              avatar={<Avatar key={user.email} alt="Natacha" src={user.avatar} />}
              label={user.firstName}
              onDelete={() => handleRemoveUser(user.id)}
              size="small"
            />
          ))}
        </ChipContainer>
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
            rows={2}
            sx={{
              width: 600,
              maxWidth: '100%',
            }}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>

      <InfoContainer paddingTop="1rem">
        {showAddSubTask ? (
          <TextField
            value={subTask}
            placeholder="New SubTask"
            onChange={(e) => setSubTask(e.target.value)}
            onBlur={() => setShowAddSubTask(!showAddSubTask)}
            size="small"
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
    </Box>
  );
}

export default TaskDetail;
