import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TransferList from '../TransferList/TransferList';
import { User } from '../../models/user';
import { CreateProjectRequest } from '../../services/request/project';
import useUsers from '../../hooks/useUsers.hook';
import { useAppSelector } from '../../hooks/redux.hook';
import './style.css';

interface CreateProjectProps {
  dialogTitle: string;
  acceptOnClick: (values: CreateProjectRequest) => void;
  cancelClick: () => void;
}

interface FormValues {
  title: string;
  description: string;
}

function CreateProject({ dialogTitle, acceptOnClick, cancelClick }: CreateProjectProps) {
  const profileState = useAppSelector((state) => state.profile);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [usersIn, setUsersIn] = useState<User[]>([profileState.profile]);
  const { allUsers } = useUsers();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (usersIn.length > 0) {
      acceptOnClick({
        name: data.title,
        description: data.description,
        usersId: usersIn.map((u) => u.id),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>{dialogTitle}</DialogTitle>

      <DialogContent className="create-project-content" sx={{ width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Title
        </Typography>
        <TextField {...register('title', { required: true })} id="outlined-basic" className="title-field" />
        {errors.title && <p className="error">*Title is required.</p>}

        <Typography variant="h5" gutterBottom>
          Description
        </Typography>
        <TextField
          {...register('description', { required: true })}
          id="outlined-multiline-static"
          multiline
          rows={4}
          sx={{
            width: 600,
            maxWidth: '100%',
          }}
        />
        {errors.description && <p className="error">*Description is required.</p>}

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Add Users</Typography>
          </AccordionSummary>

          {allUsers && allUsers.length > 0 ? (
            <AccordionDetails>
              <TransferList allUsers={allUsers} usersIn={usersIn} onUsersIn={(value) => setUsersIn(value)} />
            </AccordionDetails>
          ) : null}
        </Accordion>
        {usersIn.length === 0 ? <p className="error">*You must to add at least one user.</p> : null}
      </DialogContent>

      <Divider />

      <DialogActions>
        <Button
          onClick={() => {
            cancelClick();
          }}
        >
          Cancel
        </Button>
        <Button type="submit">Acept</Button>
      </DialogActions>
    </form>
  );
}

export default CreateProject;
