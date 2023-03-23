import { Avatar, Typography, MenuItem, Paper, styled, AvatarGroup, Chip } from '@mui/material';
import { Project } from '../../models/project.model';
import MenuOptions from '../MenuOptions';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

const CardLayout = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  maxWidth: 345,  
  padding: '1rem',
  borderRadius: 8,
  minHeight: 240,
  maxHeight: 280,
  '& .title-info': {
    display: 'flex',
    'justify-content': 'space-between'
  },
  '& .users-container': {
    'margin-bottom': '1rem',
    display: 'flex',
    'justify-content': 'space-between',
    '& .icons-content': {
      display: 'flex'
    }
  }

});

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
    <CardLayout elevation={6} >
      <div className='info-container'>
        <div className='title-info'>
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>
          <MenuOptions>
            <MenuItem onClick={() => onClick(id)}>View</MenuItem>
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </MenuOptions>
        </div>
        <Typography variant="body1" gutterBottom sx={{ marginTop: 3, color: 'GrayText', maxHeight: '150', marginBottom: 2 }}>
            {description}
        </Typography>
      </div>

      <div className="users-container">
        <AvatarGroup max={4} sx={{ alignItems: 'center'}}>
          {users
            .map((item) => (
              <Avatar alt={item.firstName} src={item.avatar} sx={{ width: 24, height: 24 }} key={item.firstName} />
            ))}
        </AvatarGroup>
        <div className='icons-content'>
          <Chip            
            icon={<AssignmentOutlinedIcon />}
            label='0 Tasks'
          />          
        </div>
      </div>
    </CardLayout>
  );
}

export default CardProject;
