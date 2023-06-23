import { useEffect, useState } from 'react';

import { Avatar, Chip, Divider, Tab, Tabs, TextField, Typography, Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { initialTaskValue, SubTask, Task } from '../../models/task';
import { User } from '../../models/user';
import SelectUser from '../SelectUser';
import InputControlButton from '../InputControlButton';
import SubTaskItem from '../SubTaskItem';
import MenuPriorityTask from '../MenuPriorityTask';
import { InfoContainer, StyledTaskDetail } from './styled';
import { HttpService } from '../../services/HttpService';
import { TaskUserRequest, UpdateTaskRequest } from '../../services/request/task';
import { CreateSubTaskRequest, UpdateDoneSubTaskRequest } from '../../services/request/subTask';

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

  /** Profile Global State */
  const profileState = useAppSelector((state) => state.profile);
  const { profile } = profileState;

  const httpService = new HttpService("");
  
  /** State to manage the UI to show the task detail and the differents interacion with that task */
  const [ task, setTask ] = useState<Task>(initialTaskValue);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ taskTitle, setTaskTitle ] = useState(task.title);
  const [ taskDescription, setTaskDescription ] = useState(task.description ?? "");
  const [ editing, setEditing ] = useState(false);
  const [ showAddSubTask, setShowAddSubTask ] = useState(false);
  const [ value, setValue ] = useState(0);
  
  useEffect(() => {   
    fetchTask();
  }, [dispatch]);

  async function fetchTask() {
    setIsLoading(true);
    
    const result = await httpService.getById<Task>("tasks", taskId);
    if (result) {        
      setTask(result);
      setTaskDescription(result.description);
    }

    setIsLoading(false);
  }

  function handleClick() {
    setTaskTitle(task?.title);
    setEditing(true);
  }

  function handleTabChange(event: React.SyntheticEvent, newValue: number) {
    setValue(newValue);
  }

  async function handleRemoveUser(userId: number) {
    const request: TaskUserRequest = {      
      userId
    };

    const result = await httpService.update<TaskUserRequest, Task>(`tasks/${task.id}/remove-user`, request);
    if (result) {
      const copyTask = { ...task };
      copyTask.users = copyTask.users.filter((u) => u.id !== userId);
      setTask(copyTask);
    }    
  }

  async function handleAssignUser(user: User) {
    const request: TaskUserRequest = {      
      userId: user.id,
    };

    const result = await httpService.update<TaskUserRequest, Task>(`tasks/${task.id}/assign-user`, request);
    if (result) {
      const copyTask = { ...task };
      copyTask.users.push(user);
      setTask(copyTask);
    }
  }

  async function handleUpdateTitle() {
    if (taskTitle.trim() !== '' && taskTitle.trim() !== task.title) {
      const request: UpdateTaskRequest = {
        id: task.id,
        title: taskTitle,
        description: task.description,
        priorityTask: task.priorityTask.toString(),
        dueDate: task.dueDate.toString(),
      }
      const result = await httpService.update<UpdateTaskRequest, Task>('tasks', request, request.id);
      if (result) setTask(result);     
      setEditing(!editing);
    }
  }

  async function handleUpdateDescription() {
    if (taskDescription.trim() !== '' && taskDescription.trim() !== task.description) {
      const request: UpdateTaskRequest = {
        id: task.id,
        title: task.title,
        description: taskDescription,
        priorityTask: task.priorityTask.toString(),
        dueDate: task.dueDate.toString(),
      }
      const result = await httpService.update<UpdateTaskRequest, Task>('tasks', request, request.id);
      if (result) setTask(result);
    }
  }

  async function handleUpdatePriority(priorityTask: string) {
    if (priorityTask !== task.priorityTask.toString()) {
      const request: UpdateTaskRequest = {
        id: task.id,
        title: task.title,
        description: task.description,
        priorityTask,
        dueDate: task.dueDate.toString(),
      }
      
      const result = await httpService.update<UpdateTaskRequest, Task>('tasks', request, request.id);
      if (result) setTask(result);
    }
  }

  async function handleAddSubTask(subTaskName: string) {
    const request: CreateSubTaskRequest = {      
      title: subTaskName,
      createdById: profile.id
    };

    const result = await httpService.post<CreateSubTaskRequest, SubTask>(`tasks/${task.id}/subtask`, request)
    if (result) {
      const item = { ...task };
      item.subTasks?.push(result);
      setTask(item);
    }

    setShowAddSubTask(!showAddSubTask);
  }

  async function handleDeleteSubTask(subTaskId: number) {
    const result = await httpService.remove("tasks", subTaskId);
    if (result) {
      const item = { ...task };
      item.subTasks = item.subTasks?.filter((i) => i.id !== subTaskId);
      setTask(item);
    }
  }

  async function handleUpdateDoneSubTask(done: boolean, subTaskId: number) {
    const request: UpdateDoneSubTaskRequest = {      
      done
    };

    const url = `tasks/${task.id}/subtask/${subTaskId}`;
    const result = await httpService.update<UpdateDoneSubTaskRequest, SubTask>(url, request)
    if (result) {
      const item = { ...task };
      const subTask = item.subTasks?.filter((st) => st.id !== subTaskId);
      subTask?.push(result);
      item.subTasks = subTask;
      setTask(item);
    }
  }

  async function handleChangeDueDate(dueDate: string) {    
    const newDueDate = new Date(new Date(dueDate).getTime());
    const request: UpdateTaskRequest = { 
      ...task, 
      priorityTask: task.priorityTask.toString(), 
      dueDate: newDueDate.toISOString() 
    }

    const result = await httpService.update<UpdateTaskRequest, Task>('tasks', request, task.id);
    if (result) setTask({ ...task, dueDate: result.dueDate });
  }

  function formatDate(date: string) {    
    const fecha = new Date(date);    
   
    return `${fecha.getFullYear()}-${("0" + (fecha.getMonth() + 1)).slice(-2)}-${("0" + fecha.getDate()).slice(-2)}`;
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
              actualPriority={task?.priorityTask}
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
            <input 
              type="date" 
              value={formatDate(task?.dueDate.toString())}              
              onChange={(e) => handleChangeDueDate(e.target.value)}                           
            >
            </input>            
          </InfoContainer>

          <InfoContainer>
            <Typography variant="subtitle2" display="block" gutterBottom>
              Created By
            </Typography>
            <Chip
              avatar={
                <Avatar key={task?.createdBy.email} alt={task?.createdBy.firstName} src={task?.createdBy.avatar} />
              }
              label={task?.createdBy.firstName}
              size="small"
            />
          </InfoContainer>

          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                <Tab label="Description" {...a11yProps(0)} />
                <Tab label="Comments" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <TextField
                id="outlined-multiline-flexible"
                label="Desription"
                multiline
                value={taskDescription ?? ""}
                onChange={(e) => setTaskDescription(e.target.value)}
                onBlur={handleUpdateDescription}                
                maxRows={4}
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
