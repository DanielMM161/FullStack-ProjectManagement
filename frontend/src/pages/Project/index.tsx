import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Typography, AvatarGroup, Avatar, Dialog, Button, Paper, Chip } from '@mui/material';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useAppDispatch } from '../../hooks/redux.hook';
import Layout from '../../components/Layout';
import ButtonInput from '../../components/ButtonInput';
import { createList, deleteList, getListsByProject } from '../../services/list';
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
import EmptyContent from '../../components/EmptyContent';
import { ListContainer, ProjectInfo } from './styled';

function ProjectDetail() {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  const [listProject, setListProject] = useState<ListProject[]>([]);
  const [actualProject, setActualProject] = useState<Project>();
  const [listSelectedId, setListSelectedId] = useState(0);
  const [taskSelectedId, setTaskSelectedId] = useState(0);
  const { typeForm, setTypeForm, toggleDialog, showDialog } = useDialog();
  const [showDeleteTask, setShowDeleteTask] = useState(false);

  useEffect(() => {
    const id = Number.parseInt(projectId ?? '0', 10);
    dispatch(getProjectId(id)).then((result) => {
      if (result != null) {
        setActualProject(result.payload);
      }
    });
    dispatch(getListsByProject(id)).then((result) => {
      setListProject(result.payload);
    });
  }, [dispatch, projectId]);

  function handleAddList(nameList: string) {
    dispatch(
      createList({
        title: nameList,
        projectId: parseInt(projectId ?? '0', 10),
      }),
    ).then((result) => {
      if (result) setListProject([...listProject, result.payload]);
    });
  }

  function handleDeleteListClick(listId: number) {
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
      if (result && result.payload) {
        const newList = listProject.filter((l) => l.id !== listSelectedId);
        console.log('new list --< ', newList);
        setListProject(newList);
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
        const index = listProject.findIndex((l) => l.id === listId);
        const list = [...listProject];
        const item = {
          ...list[index],
          tasks: [...list[index].tasks, result.payload],
        };
        list[index] = item;
        setListProject(list);
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
    setShowDeleteTask(!showDeleteTask);
    toggleDialog();
  }

  function handleDeleteTask() {
    dispatch(deleteTask(taskSelectedId)).then((result) => {
      if (result && result.payload) {
        const items = [...listProject];
        const item = items.filter((i) => i.id === listSelectedId);
        const index = items.indexOf(item[0]);
        items[index].tasks = item[0].tasks.filter((t) => t.id !== taskSelectedId);
        setListProject(items);
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

  return (
    <Layout>
      <ProjectInfo>
        <div className="project-info-container">
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
        <div className="project-info-container">
          <AvatarGroup max={4} sx={{ alignItems: 'center' }}>
            {actualProject?.users.map((u) => (
              <Avatar alt={u.firstName} src="/static/images/avatar/1.jpg" sx={{ width: 34, height: 34 }} />
            ))}
          </AvatarGroup>
          <Button
            onClick={() => handleAssignUser()}
            variant="outlined"
            sx={{ border: 'none', color: 'black', gap: 1, fontWeight: 'bold', textTransform: 'none' }}
          >
            <Person2OutlinedIcon />
            Assigned to Project
          </Button>
        </div>
      </ProjectInfo>

      <ListContainer elevation={4}>
        {listProject &&
          listProject.map((l) => (
            <ListInfo
              key={l.id}
              title={l.title}
              tasks={l.tasks}
              taskClick={(id) => handleTaskClick(id)}
              addTaskClick={(taskTitle) => handleCreateTask(taskTitle, l.id)}
              deleteListClick={() => handleDeleteListClick(l.id)}
              deleteTaskClick={(id) => handleShowDeleteTask(id, l.id)}
            />
          ))}
        <ButtonInput
          labelText="List Name"
          buttonText="Add another List"
          addClick={(nameList) => handleAddList(nameList)}
        />
      </ListContainer>
      {listProject.length === 0 && <EmptyContent message="Hey Try to Create a new List" />}

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
