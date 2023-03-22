import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from '@emotion/styled';
import { Typography, IconButton, AvatarGroup, Avatar, Dialog } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import { useAppDispatch } from '../../hooks/redux.hook';
import Layout from '../../components/Layout';
import ButtonInput from '../../components/ButtonInput';
import { createList, deleteList, getListsByProject } from '../../services/list.service';
import { ListProject } from '../../models/listProject.model';
import ListInfo from '../../components/ListInfo';
import { getProjectId } from '../../services/project.service';
import { Project } from '../../models/project.model';
import Transition from '../../transitions/transition';
import DialogInfoAction from '../../components/DialogContent/DialogInfoAction';
import { createTask } from '../../services/task.service';
import TaskDetail from '../../components/TaskDetail';
import useDialog, { FORMS } from '../../hooks/useModal.hook';

const ProjectInfo = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: '15px',
  backgroundColor: '#f3f3f3',
});

const ListContainer = styled('div')({
  marginTop: '1rem',
  display: 'grid',
  height: '100%',
  width: '100%',
  overflowX: 'scroll',
  alignItems: 'flex-start',
  padding: '15px',
  backgroundColor: '#f3f3f3',
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 15rem), 1fr))',
  gap: '25px',
});

const ProjectName = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
});

const AddUserButton = styled(IconButton)({
  marginLeft: '10px',
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

function ProjectDetail() {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  const [listProject, setListProject] = useState<ListProject[]>([]);
  const [actualProject, setActualProject] = useState<Project>();
  const [listSelectedId, setListSelectedId] = useState(0);
  const [taskSelectedId, setTaskSelectedId] = useState(0);
  const { typeForm, setTypeForm, toggleDialog, showDialog } = useDialog();

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

  return (
    <Layout>
      <ProjectInfo>
        <Container>
          <Typography variant="h5">Boards</Typography>
          <ProjectName>
            <p>Nombre del proyecto</p>
            <IconButton>
              <Edit />
            </IconButton>
          </ProjectName>
        </Container>
        <Container>
          <Typography variant="h5">Team</Typography>
          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <AddUserButton>
              <Add />
            </AddUserButton>
          </AvatarGroup>
        </Container>
      </ProjectInfo>

      <ListContainer>
        <>
          {listProject &&
            listProject.map((l) => (
              <ListInfo
                key={l.id}
                title={l.title}
                tasks={l.tasks}
                taskClick={(id) => handleTaskClick(id)}
                addTaskClick={(taskTitle) => handleCreateTask(taskTitle, l.id)}
                deleteListClick={() => handleDeleteListClick(l.id)}
              />
            ))}
          <ButtonInput buttonText="Add another List" addClick={(nameList) => handleAddList(nameList)} />
        </>
      </ListContainer>

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

        {showDialog && typeForm.form === FORMS.delete ? (
          <DialogInfoAction
            dialogTitle={typeForm.title}
            contentText="Are you sure that you want to delete this List ? all the tasks will be delete"
            onClickAccept={() => handleDeleteList()}
            onClickCancel={() => toggleDialog()}
          />
        ) : null}
      </Dialog>
    </Layout>
  );
}

export default ProjectDetail;
