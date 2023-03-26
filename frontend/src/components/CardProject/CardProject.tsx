import { Avatar, Typography, MenuItem, AvatarGroup, Chip } from '@mui/material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { Project } from '../../models/project';
import MenuOptions from '../MenuOptions';
import CardLayout from './styled';

interface CardProjectProps {
  project: Project;
  editProject: () => void;
  deleteProject: () => void;
  onClick: (projectId: number) => void;
}

function CardProject({ project, editProject, deleteProject, onClick }: CardProjectProps) {
  const { id, name, description, users } = project;

  function handleEdit() {
    editProject();
  }

  function handleDelete() {
    deleteProject();
  }

  return (
    <CardLayout elevation={6}>
      <div className="info-container">
        <div className="title-info">
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>
          <MenuOptions>
            <MenuItem onClick={() => onClick(id)}>View</MenuItem>
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </MenuOptions>
        </div>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ marginTop: 3, color: 'GrayText', maxHeight: '150', marginBottom: 2 }}
        >
          {description}
        </Typography>
      </div>

      <div className="users-container">
        <AvatarGroup max={4} sx={{ alignItems: 'center' }}>
          {users.map((item) => (
            <Avatar alt={item.firstName} src={item.avatar} sx={{ width: 24, height: 24 }} key={item.firstName} />
          ))}
        </AvatarGroup>
        <div className="icons-content">
          <Chip icon={<AssignmentOutlinedIcon />} label="0 Tasks" />
        </div>
      </div>
    </CardLayout>
  );
}

export default CardProject;
