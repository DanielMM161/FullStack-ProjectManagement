import { Avatar, Card, Typography, CardContent, MenuItem } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { useState } from 'react';
import { Project } from '../../models/project.model';
import MenuOptions from '../MenuOptions';
import './style.css';

interface ICardProjectProps {
  project: Project;
  editProject: () => void;
  deleteProject: () => void;
  onClick: (projectId: number) => void;
}

function CardProject({ project, editProject, deleteProject, onClick }: ICardProjectProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { id, name, description, users } = project;

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  function handleEdit() {
    handleClose();
    editProject();
  }

  function handleDelete() {
    handleClose();
    deleteProject();
  }

  return (
    <Card sx={{ maxWidth: 345, cursor: 'pointer' }}>
      <CardContent onClick={() => onClick(id)}>
        <Typography variant="h3" gutterBottom>
          {name}
        </Typography>

        <Typography variant="body1" gutterBottom sx={{ marginBottom: 15 }}>
          {description}
        </Typography>

        <div className="users-container">
          {users
            .map((item) => (
              <Avatar alt={item.firstName} src={item.avatar} sx={{ width: 24, height: 24 }} key={item.firstName} />
            ))
            .slice(0, 4)}
        </div>
      </CardContent>
      <CardActions sx={{ justifyContent: 'end' }}>
        <Typography variant="overline" display="block" gutterBottom>
          {/* {`${todoTasks?.length ?? 0} Total Tasks`} */}
        </Typography>

        <MenuOptions>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </MenuOptions>
      </CardActions>
    </Card>
  );
}

export default CardProject;
