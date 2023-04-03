import { useEffect, useState } from 'react';
import { Avatar, Chip, Divider, Tab, Tabs, TextField, Typography, Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { initialTaskValue, Task } from '../../models/task';
import { assignUser, deleteTask, getTaskById, removeUser, updateTask } from '../../services/task';
import { User } from '../../models/user';
import SelectUser from '../SelectUser';
import InputControlButton from '../InputControlButton';
import { createSubTask, updateDoneSubTask } from '../../services/subTask';
import SubTaskItem from '../SubTaskItem';
import MenuPriorityTask from '../MenuPriorityTask';
import { InfoContainer, StyledTaskDetail } from './styled';
import dayjs from 'dayjs';

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
    function fetchTask() { 
      setIsLoading(true);
      dispatch(getTaskById(taskId))
      .then((result) => {
        const { payload } = result;
        if (payload) {          
          const item = result.payload as Task;
          setTask(item);
          setTaskDescription(item.description);
        }
        setIsLoading(false);
      });
    }
    fetchTask()
  }, [dispatch]);

  function handleClick() {
    setTaskTitle(task?.title);
    setEditing(true);
  }

  function handleChange (event: React.SyntheticEvent, newValue: number) {
    setValue(newValue);
  }

  function handleRemoveUser(userId: number) {
    dispatch(removeUser({
      taskId: task.id,
      userId,
    }))
    .then((result) => {
      const { payload } = result;
      if (payload) {
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
      const { payload } = result;
      if (payload) {
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
      dispatch(updateTask({
        id: task.id,
        title: task.title,
        description: taskDescription,
        priority: task.priority.toString(),
        dueDate: task.dueDate.toString(),
      }))
    }
  }

  function handleUpdatePriority(priority: string) {
    if (priority !== task.priority.toString()) {
      dispatch(updateTask({
        id: task.id,
        title: task.title,
        description: task.description,
        priority,
        dueDate: task.dueDate.toString(),
      }))
      .then((result) => {
        const { payload } = result;
        if (payload) {
          setTask(payload);
        }
      });
    }
  }

  function handleAddSubTask(subTaskName: string) {
    dispatch(createSubTask({
      taskParentId: task.id,
      title: subTaskName,
      createdById: profile.id,
    }))
    .then((result) => {
      const { payload } = result;
      if (payload) {
        const item = { ...task };
        item.subTasks?.push(result.payload);
        setTask(item);
      }
    });
    setShowAddSubTask(!showAddSubTask);
  }

  function handleDeleteSubTask(subTaskId: number) {
    dispatch(deleteTask(subTaskId))
    .then((result) => {
      const { payload } = result;
      if (payload) {
        const item = { ...task };
        item.subTasks = item.subTasks?.filter((i) => i.id !== subTaskId);
        setTask(item);
      }
    });
  }

  function handleUpdateDoneSubTask(done: boolean, subTaskId: number) {
    dispatch(updateDoneSubTask({
      taskParentId: task.id,
      subTaskId,
      done,
    }))
    .then((result) => {
      const { payload } = result;
      if (payload) {
        const item = { ...task };
        const subTask = item.subTasks?.filter((st) => st.id !== subTaskId);
        subTask?.push(result.payload);
        item.subTasks = subTask;
        setTask(item);
      }
    });
  }

  function handleChangeDueDate(dueDate: string) {        
    const newDueDate = new Date(new Date(dueDate).getTime());

    dispatch(updateTask({...task, priority: task.priority.toString(), dueDate: newDueDate.toISOString()}))
    .then((result) => {
      const { payload } = result;
      if (payload) {        
        setTask({ ...task, dueDate: payload.dueDate });
      }
    });
  }

  function formatDate(date: string) {
    const fecha = new Date(date);
    return `${fecha.getMonth() + 1}/${fecha.getDate() + 1}/${fecha.getFullYear()}`;
  }

  return (
    <StyledTaskDetail>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <>
          {editing ? (
          <TextField
            autoFocus
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onBlur={() => {
              handleUpdateTitle();
              setEditing(!editing);
            }}
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
          Priority:
          <MenuPriorityTask
            actualPriority={task?.priority}
            selectPriorityClick={(priority) => handleUpdatePriority(priority)}
          />
        </Typography>
        <Divider />

        <InfoContainer marginTop="1rem">
          <Typography variant="subtitle2" display="block" gutterBottom>
            Assigness
          </Typography>
          <SelectUser users={members} selectUserClick={(user) => handleAssignUser(user)} />
          <div className="chip-container">
            {task?.users.map((user) => (
              <Chip
                key={user.email}
                avatar={<Avatar key={user.email} alt={user.firstName} src={user.avatar} />}
                label={user.firstName}
                onDelete={() => handleRemoveUser(user.id)}
                size="small"
              />
            ))}
          </div>
        </InfoContainer>

        <InfoContainer>
          <Typography variant="subtitle2" display="block" gutterBottom>
            Due Date
          </Typography>        
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker defaultValue={dayjs(formatDate(task?.dueDate.toString()))} onChange={(value) => handleChangeDueDate(value?.toString() ?? "")}/>
          </LocalizationProvider>
        </InfoContainer>

        <InfoContainer>
          <Typography variant="subtitle2" display="block" gutterBottom>
            Created By
          </Typography>
          <Chip
            avatar={<Avatar key={task?.createdBy.email} alt={task?.createdBy.firstName} src={task?.createdBy.avatar} />}
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
            <></>
          </TabPanel>
        </Box>

        <InfoContainer paddingTop="1rem">
          {showAddSubTask ? (
            <InputControlButton
              label="Subtask Name"
              addClick={(inputValue) => handleAddSubTask(inputValue)}
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
        <div className="subtask-container">
          {task.subTasks &&
            task.subTasks.map((st) => (
              <SubTaskItem
                key={st.id}
                title={st.title}
                done={st.done}
                deleteOnClick={() => handleDeleteSubTask(st.id)}
                checkedClick={(done) => handleUpdateDoneSubTask(done, st.id)}
              />
            ))}
        </div>
      </>
      )}
    </StyledTaskDetail>
  );
}

export default TaskDetail;
