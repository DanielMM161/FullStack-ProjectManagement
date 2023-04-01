import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Typography, AvatarGroup, Avatar, Dialog, Chip, IconButton } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useAppDispatch } from '../../hooks/redux.hook';
import Layout from '../../components/Layout';
import ButtonInput from '../../components/ButtonInput';
import { createList, deleteList, getListsByProject, updateList } from '../../services/list';
import { ListProject } from '../../models/listProject';
import ListInfo from '../../components/ListInfo';
import { getProjectId, updateProject } from '../../services/project';
import { Project } from '../../models/project';
import Transition from '../../transitions';
import DialogInfoAction from '../../components/DialogContent/DialogInfoAction';
import { createTask, deleteTask } from '../../services/task';
import TaskDetail from '../../components/TaskDetail';
import useDialog, { FORMS } from '../../hooks/useModal.hook';
import { formatDate } from '../../utils/common';
import AssignUser from '../../components/AssignUser';
import { ListContainer, ListOptions, ProjectInfo } from './styled';
import Assigne from '../../components/Filter/Assigne';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LineLoader from '../../components/LineLoader';
import ListEmpty from '../../assets/listEmpty.svg';
import EmptyElement from '../../components/EmptyElement';
import { closeLoading } from '../../redux/slice/actions';

interface ListProjectState {
  list: ListProject[],
  loading: boolean,
}

function ProjectDetail() {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  const [listProject, setListProject] = useState<ListProjectState>({
    list: [],
    loading: false,
  });
  const [actualProject, setActualProject] = useState<Project>();
  const [listSelectedId, setListSelectedId] = useState(0);
  const [taskSelectedId, setTaskSelectedId] = useState(0);
  const { typeForm, setTypeForm, toggleDialog, showDialog } = useDialog();
  const [showDeleteTask, setShowDeleteTask] = useState(false);

  
  useEffect(() => {
    const id = Number.parseInt(projectId ?? '0', 10);
    fetchProjectById(id)    
  }, [projectId]);
  
  function fetchProjectById(id: number) {
    dispatch(getProjectId(id)).then((result) => {      
      const { payload } = result;
      if (payload) setActualProject(payload);
      fetchListByProject(id)
    })   
  }

  function fetchListByProject(id: number) {
    setListProject({...listProject, loading: true });
    dispatch(getListsByProject(id))
    .then((result) => {
      dispatch(closeLoading())
      const { payload } = result
      const value = payload ?? []
      setListProject({list: value, loading: false });
    })
  }

  function handleAddList(nameList: string) {
    dispatch(createList({
      title: nameList,
      projectId: parseInt(projectId ?? '0', 10),
    }))
    .then((result) => {
      const { payload } = result  
      if (payload) setListProject({list: [...listProject.list, payload], loading: false });
    });
  }

  function handleDeleteListClick(listId: number) {
    setShowDeleteTask(false);
    setTypeForm({
      title: 'Delete List',
      form: FORMS.delete,
    });
    toggleDialog();
    setListSelectedId(listId);
  }

  function handleDeleteList() {    
    toggleDialog();
    dispatch(deleteList(listSelectedId)).then((result) => {
      const { payload } = result;      
      if (payload) {
        const newList = listProject.list.filter((l) => l.id !== listSelectedId);               
        setListProject({...listProject, list: newList});
      }
    });
  }

  function handleCreateTask(taskTitle: string, listId: number) {
    dispatch(
      createTask({
        title: taskTitle,
        listId,
      }),
    ).then((result) => {
      if (result) {
        const index = listProject.list.findIndex((l) => l.id === listId);
        const list = [...listProject.list];
        const item = {
          ...list[index],
          tasks: [...list[index].tasks, result.payload],
        };
        list[index] = item;
        setListProject({...listProject, list: list});
      }
    });
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

  function handleDeleteTask() {
    dispatch(deleteTask(taskSelectedId)).then((result) => {
      if (result && result.payload) {
        const items = [...listProject.list];
        const item = items.filter((i) => i.id === listSelectedId);
        const index = items.indexOf(item[0]);
        items[index].tasks = item[0].tasks.filter((t) => t.id !== taskSelectedId);        
        setListProject({...listProject, list: items});
      }
    });
    toggleDialog();
  }

  function handleAssignUser() {
    setTypeForm({
      title: 'Assign Users',
      form: FORMS.assign,
    });
    toggleDialog();
  }

  function handleAssignedUser(usersId: number[]) {
    toggleDialog();
    dispatch(
      updateProject({
        id: actualProject?.id ?? 0,
        name: actualProject?.name ?? '',
        description: actualProject?.description ?? '',
        usersId,
      }),
    ).then((result) => {
      if (result && result.payload) {
        setActualProject(result.payload);
      }
    });
  }

  function handleUpdateList(listId: number, newTitle: string) {
    dispatch(updateList({
      id: listId,
      title: newTitle,
    }))
    .then((result) => {
      const { payload } = result      
      if (payload) {
        const items = [...listProject.list];        
        const item = items.filter((i) => i.id === listId);
        const index = items.indexOf(item[0]);
        items[index].title = newTitle;
        setListProject({...listProject, list: items});
      }
    })
  }

  return (
    <Layout>
      <ProjectInfo>
        <div className="project-info-container">
          <div className='name-container'>
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
          <div className='avatar-container'>
            <AvatarGroup max={4} sx={{ alignItems: 'center' }}>
              {actualProject?.users.map((u) => (
                <Avatar alt={u.firstName} src="/static/images/avatar/1.jpg" sx={{ width: 34, height: 34 }} />
              ))}
            </AvatarGroup>
            <IconButton onClick={() => handleAssignUser()}>
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
        </div>
      </ProjectInfo>

      <ListOptions>
        <Assigne />        
        <ButtonInput
          labelText="List Name"
          buttonText="Add another List"
          addClick={(nameList) => handleAddList(nameList)}
        />
      </ListOptions>
      
      {listProject.loading ? (
        <LineLoader />
      ) : (
        <>
          {listProject.list.length > 0 ? (
            <ListContainer >
              {listProject.list.map((list) => (
                <ListInfo
                  key={list.id}
                  title={list.title}
                  tasks={list.tasks}
                  taskClick={(id) => handleTaskClick(id)}
                  addTaskClick={(taskTitle) => handleCreateTask(taskTitle, list.id)}
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
            onClickAccept={() => handleDeleteList()}
            onClickCancel={() => toggleDialog()}
          />
        ) : null}

        {showDeleteTask && showDialog && typeForm.form === FORMS.delete ? (
          <DialogInfoAction
            dialogTitle={typeForm.title}
            contentText="Are you sure that you want to delete this Task ?"
            onClickAccept={() => handleDeleteTask()}
            onClickCancel={() => toggleDialog()}
          />
        ) : null}

        {showDialog && typeForm.form === FORMS.assign ? (
          <AssignUser
            users={actualProject?.users ?? []}
            cancelClick={toggleDialog}
            acceptClick={(usersId) => handleAssignedUser(usersId)}
          />
        ) : null}
      </Dialog>
    </Layout>
  );
}

export default ProjectDetail;
