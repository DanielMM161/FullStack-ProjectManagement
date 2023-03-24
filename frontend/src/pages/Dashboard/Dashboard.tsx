import { useCallback, useEffect, useState } from 'react';
import { Button, Dialog, styled, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import CardProject from '../../components/CardProject/CardProject';
import CreateProject from '../../components/Forms/CreateProject';
import { CreateProjectRequest } from '../../services/request/project.request';
import Transition from '../../transitions/transition';
import { createProject, deleteProject, getProjects, updateProject } from '../../services/project.service';
import { removeProject } from '../../redux/slice/project.slice';
import UpdateProject from '../../components/Forms/UpdateProject';
import { Project } from '../../models/project.model';
import DialogInfoAction from '../../components/DialogContent/DialogInfoAction';
import Layout from '../../components/Layout';
import useDialog, { FORMS } from '../../hooks/useModal.hook';
import './style.css';
import { closeLoading } from '../../redux/slice/loading.slice';
import EmptyContent from '../../components/EmptyContent';

const ProjectSummaryContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& .textContainer': {
    display: 'flex',
    'flex-direction': 'column',
  },
});

const ProjectsContainer = styled(Paper)({
  marginTop: '1rem',
  height: '100%',
  display: 'grid',
  overflow: 'scroll',
  //gridAutoFlow: 'column',
  //gridTemplateRows: 'repeat(auto-fill, minmax(min(100%, 15rem), 1fr))',
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 15rem), 1fr))',
  padding: '1.5rem',
  backgroundColor: '#ffffff',
  gap: '18px',
  borderRadius: 18,
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

function Dashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const projectState = useAppSelector((state) => state.projects);
  const { projects } = projectState;
  const { typeForm, setTypeForm, toggleDialog, showDialog } = useDialog();
  const [projectSelected, setProjectSelected] = useState<Project>(projects[0]);

  const getUserProjects = useCallback(() => {
    //dispatch(closeLoading());
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    getUserProjects();
  }, [getUserProjects]);

  function showCreateProject() {
    setTypeForm({
      title: 'New Project',
      form: FORMS.create,
    });
    toggleDialog();
  }

  function showEditProject(project: Project) {
    setTypeForm({
      title: 'Update Project',
      form: FORMS.update,
    });
    setProjectSelected(project);
    toggleDialog();
  }

  function showDeleteProject(project: Project) {
    setTypeForm({
      title: 'Delete Project',
      form: FORMS.delete,
    });
    setProjectSelected(project);
    toggleDialog();
  }

  function handleCreateProject(request: CreateProjectRequest) {
    toggleDialog();
    const newProject: CreateProjectRequest = request;
    dispatch(createProject(newProject));
  }

  function handleDeleteProject() {
    toggleDialog();
    dispatch(deleteProject(projectSelected.id)).then((result) => {
      if (result) {
        dispatch(removeProject(projectSelected.id));
      }
    });
  }

  function handleUpdateProject(project: Project) {
    dispatch(
      updateProject({
        id: project.id,
        name: project.name,
        description: project.description,
        usersId: project.users.map((u) => u.id),
      }),
    );
    toggleDialog();
  }

  return (
    <Layout>
      <ProjectSummaryContainer>
        <div className="textContainer">
          <Typography variant="h4">Project Summary</Typography>
          <Typography variant="subtitle2" sx={{ color: 'gray' }}>
            You can edit all the stufs as you wish
          </Typography>
        </div>
        <Button
          sx={{ heigh: '70%' }}
          variant="outlined"
          onClick={() => {
            showCreateProject();
          }}
        >
          Create Project
        </Button>
      </ProjectSummaryContainer>

      <ProjectsContainer elevation={4}>
        {projects.length > 0 &&
          projects.map((project) => (
            <CardProject
              key={project.name}
              project={project}
              onClick={(projectId) => {
                navigate(`project/${projectId}`);
              }}
              editProject={() => showEditProject(project)}
              deleteProject={() => showDeleteProject(project)}
            />
          ))}
        {projects.length == 0 && <EmptyContent message="Hey Try to Create a new Project" />}
      </ProjectsContainer>

      <Dialog
        open={showDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          toggleDialog();
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        {showDialog && typeForm.form === FORMS.create ? (
          <CreateProject
            dialogTitle={typeForm.title}
            acceptOnClick={(value) => handleCreateProject(value)}
            cancelClick={() => toggleDialog()}
          />
        ) : null}

        {showDialog && typeForm.form === FORMS.update ? (
          <UpdateProject
            dialogTitle={typeForm.title}
            project={projectSelected}
            acceptOnClick={(project) => handleUpdateProject(project)}
            cancelClick={() => toggleDialog()}
          />
        ) : null}

        {showDialog && typeForm.form === FORMS.delete ? (
          <DialogInfoAction
            dialogTitle={typeForm.title}
            contentText="Are you sure that you want to delete this project ?"
            onClickAccept={() => handleDeleteProject()}
            onClickCancel={() => toggleDialog()}
          />
        ) : null}
      </Dialog>
    </Layout>
  );
}

export default Dashboard;
