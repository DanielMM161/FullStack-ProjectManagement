import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Typography, AvatarGroup, Avatar, Dialog, Chip, IconButton } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import Layout from '../../components/Layout';
import ButtonInput from '../../components/ButtonInput';
import { ListProject } from '../../models/listProject';
import ListInfo from '../../components/ListInfo';
import { Project } from '../../models/project';
import Transition from '../../transitions';
import DialogInfoAction from '../../components/DialogContent/DialogInfoAction';
import TaskDetail from '../../components/TaskDetail';
import useDialog, { FORMS } from '../../hooks/useModal.hook';
import { formatDate, isInstanceOf, showNotification } from '../../utils/common';
import AssignUser from '../../components/AssignUser';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EmptyElement from '../../components/EmptyElement';
import { CreateListRequest, UpdateListRequest } from '../../services/request/list';
import ListEmpty from '../../assets/listEmpty.svg';
import { HttpService } from '../../services/HttpService';
import { ListContainer, ListOptions, ProjectInfo } from './styled';
import { CreateTaskRequest } from '../../services/request/task';
import { Task } from '../../models/task';
import { UpdateProjectRequest } from '../../services/request/project';

function ProjectDetail() {

  /** Project selected by the user in Dashboard */
  const { projectId } = useParams();

  /** Hook to navigate to others pages */
  const navigate = useNavigate();  

  /** Service class to manage http calls */
  const httpService = new HttpService("");

  /** Global State to manage loads UI */
  const actionState = useAppSelector((state) => state.actions);
  const { loading } = actionState;

  /** States to manage the selections from the elements belongs to the project */
  const [ listProject, setListProject ] = useState<ListProject[]>([]);
  const [ actualProject, setActualProject ] = useState<Project>();
  const [ listSelectedId, setListSelectedId ] = useState(0);
  const [ taskSelectedId, setTaskSelectedId ] = useState(0);
  const [ showDeleteTask, setShowDeleteTask ] = useState(false);
  const { typeForm, setTypeForm, toggleDialog, showDialog } = useDialog();

  useEffect(() => {
    const id = Number.parseInt(projectId ?? '0', 10);
    fetchProjectById(id);
    fetchListByProject(id);
  }, [projectId]);

  async function fetchProjectById(id: number) {
    const result = await httpService.getById<Project>('projects', id);

    if (result) {
      setActualProject(result)      
      return;
    }

    navigate("/dashboard")
  }

  async function fetchListByProject(id: number) {
    const result = await httpService.get<ListProject>(`lists/project/${id}`);
    setListProject(result);
  }

  async function createList(nameList: string) {
    const request: CreateListRequest = {
      title: nameList,
      projectId: parseInt(projectId ?? '0', 10)      
    }
    const result = await httpService.post<CreateListRequest, ListProject>('lists', request)
    if (result) {
      setListProject((prevState) => {          
        return [...prevState, result];
      });
    }
  }

  /**
   * Show the Modal for delete the list and save the 
   * listId in a state to use it when the user click in accept
   * @param listId 
   */
  function handleDeleteListClick(listId: number) {
    setShowDeleteTask(false);
    setTypeForm({
      title: 'Delete List',
      form: FORMS.delete,
    });
    toggleDialog();
    setListSelectedId(listId);
  }

  async function deleteList() {
    toggleDialog();
    const result = await httpService.remove('lists', listSelectedId);
    if (result) {
      const newList = listProject.filter((l) => l.id !== listSelectedId);
      setListProject(newList);
    }
  }

  async function createTask(taskTitle: string, listId: number) {
    const request: CreateTaskRequest = {
      title: taskTitle,
      listId,
    }
    const result = await httpService.post<CreateTaskRequest, Task>("tasks", request);
    if (result) {
      const index = listProject.findIndex((l) => l.id === listId);
      const list = [...listProject];
      const item = {
        ...list[index],
        tasks: [...list[index].tasks, result],
      };
      list[index] = item;
      setListProject(list);
    }
  }

  function handleTaskClick(taskId: number) {
    setTaskSelectedId(taskId);
    toggleDialog();
    setTypeForm({
      title: '',
      form: FORMS.detail,
    });
  }

  function handleShowDeleteTask(taskId: number, listId: number) {
    setListSelectedId(listId);
    setTaskSelectedId(taskId);
    setTypeForm({
      title: 'Delete Task',
      form: FORMS.delete,
    });
    setShowDeleteTask(true);
    toggleDialog();
  }

  async function deleteTask() {
    const result = await httpService.remove("tasks", taskSelectedId);
    if (result) {
      const items = [...listProject];
      const item = items.filter((i) => i.id === listSelectedId);
      const index = items.indexOf(item[0]);
      items[index].tasks = item[0].tasks.filter((t) => t.id !== taskSelectedId);
      setListProject(items);
    }
    toggleDialog();
  }

  function handleAssignUser() {
    setTypeForm({
      title: 'Assign Users',
      form: FORMS.assign,
    });
    toggleDialog();
  }

  async function assignUserToProject(usersId: number[]) {
    toggleDialog();
    const request: UpdateProjectRequest = {
      id: actualProject?.id ?? 0,
      name: actualProject?.name ?? '',
      description: actualProject?.description ?? '',
      usersId,
    }
    const result = await httpService.update<UpdateProjectRequest, Project>("projects", request, request.id)
    if (result) setActualProject(result)
  }

  async function handleUpdateList(listId: number, newTitle: string) {
    const request: UpdateListRequest = {
      id: listId,
      title: newTitle,
    }
    const result = await httpService.update<UpdateListRequest, ListProject>('lists', request, listId);
    if (result) {
      const items = [...listProject];
      const item = items.filter((i) => i.id === listId);
      const index = items.indexOf(item[0]);
      items[index].title = newTitle;
      setListProject(items);
    }
  }

  return (
    <Layout>
      <ProjectInfo>
        <div className="project-info-container">
          <div className="name-container">
            <Typography sx={{ textTransform: 'capitalize' }} variant="h2">
              {actualProject?.name}
            </Typography>
            <div className="update-info">
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Last Updated on:
              </Typography>
              <Chip icon={<CalendarMonthIcon />} label={formatDate(actualProject?.updatedAt ?? '')} />
            </div>
          </div>
          <div className="avatar-container">
            <AvatarGroup max={4} sx={{ alignItems: 'center' }}>
              {actualProject?.users.map((u) => (
                <Avatar key={u.email} alt={u.firstName} src="/static/images/avatar/1.jpg" sx={{ width: 34, height: 34 }} />
              ))}
            </AvatarGroup>
            <IconButton onClick={() => handleAssignUser()}>
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
        </div>
      </ProjectInfo>

      <ListOptions>        
        <ButtonInput
          labelText="List Name"
          buttonText="Add another List"
          addClick={(nameList) => createList(nameList)}
        />
      </ListOptions>

      {loading.show && listProject.length == 0 ? null : (
        <>
          {listProject.length > 0 ? (
            <ListContainer>
              {listProject.map((list) => (
                <ListInfo
                  key={list.id}
                  title={list.title}
                  tasks={list.tasks}
                  taskClick={(id) => handleTaskClick(id)}
                  addTaskClick={(taskTitle) => createTask(taskTitle, list.id)}
                  deleteListClick={() => handleDeleteListClick(list.id)}
                  deleteTaskClick={(id) => handleShowDeleteTask(id, list.id)}
                  updateTitleList={(title) => handleUpdateList(list.id, title)}
                />
              ))}
            </ListContainer>
          ) : (
            <EmptyElement src={ListEmpty} />
          )}
        </>
      )}

      <Dialog
        open={showDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => toggleDialog()}
        aria-describedby="alert-dialog-slide-description"
      >
        {showDialog && typeForm.form === FORMS.detail ? (          
          <TaskDetail members={actualProject?.users ?? []} taskId={taskSelectedId} />
        ) : null}

        {!showDeleteTask && showDialog && typeForm.form === FORMS.delete ? (
          <DialogInfoAction
            dialogTitle={typeForm.title}
            contentText="Are you sure that you want to delete this List ? all the tasks will be delete"
            onClickAccept={() => deleteList()}
            onClickCancel={() => toggleDialog()}
          />
        ) : null}

        {showDeleteTask && showDialog && typeForm.form === FORMS.delete ? (
          <DialogInfoAction
            dialogTitle={typeForm.title}
            contentText="Are you sure that you want to delete this Task ?"
            onClickAccept={() => deleteTask()}
            onClickCancel={() => toggleDialog()}
          />
        ) : null}

        {showDialog && typeForm.form === FORMS.assign ? (
          <AssignUser
            users={actualProject?.users ?? []}
            cancelClick={toggleDialog}
            acceptClick={(usersId) => assignUserToProject(usersId)}
          />
        ) : null}
      </Dialog>
    </Layout>
  );  
}

export default ProjectDetail;
