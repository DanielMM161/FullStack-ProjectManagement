import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { Box, Typography, TextField, Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import RegisterSVG from '../../assets/register.svg';
import Register2SVG from '../../assets/register-2.svg';
import { register } from '../../redux/slice/ProfileSlice';
import Layout from '../../styled/LoginRegisterLayout';
import { RegisterRequest } from '../../services/request/user';

function Register() {

  /** Hook to trigger the functions into the slices */
  const dispatch = useAppDispatch();

  /** Hook to navigate others pages */
  const navigate = useNavigate();

  /** Global Profile State */
  const profileState = useAppSelector((state) => state.profile);
  const { profile } = profileState;

  /** State to manage the info in the form */
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (profile.email !== '') navigate('/dashboard');
  }, [profile]) 

  const checkFields = (): boolean => {
    let isError = false;
    const newErrors: { [key: string]: string } = {};
    if (!firstName) {
      isError = true;
      newErrors.firstName = 'firstName is required';
    }
    if (!lastName) {
      isError = true;
      newErrors.lastName = 'Last name is required';
    }
    if (!email) {
      isError = true;
      newErrors.email = 'Email is required';
    }
    if (!password) {
      isError = true;
      newErrors.password = 'password is required';
    }
    setErrors(newErrors);
    return isError;
  };  

  const handleRegister = () => {
    if (!checkFields()) {
      const request: RegisterRequest = {
        firstName,
        lastName,
        email,
        password
      };
      dispatch(register(request));
    }
  };

  return (
    <Layout>
      <div className="left-side">
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Join the team!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Create an account to start managing your projects.
        </Typography>
        <form style={{ width: '100%' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Name
          </Typography>
          <TextField
            autoFocus
            id="name"
            label="Name"
            variant="outlined"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
            fullWidth
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
            sx={{ mb: 2 }}
          />
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Last Name
          </Typography>
          <TextField
            id="lastName"
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
            fullWidth
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
            sx={{ mb: 2 }}
          />
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Email
          </Typography>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            fullWidth
            error={Boolean(errors.email)}
            helperText={errors.email}
            sx={{ mb: 2 }}
          />
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Password
          </Typography>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={Boolean(errors.password)}
            helperText={errors.password}
            type="password"
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth sx={{ marginTop: '1rem' }} onClick={() => handleRegister()}>
            Sign Up
          </Button>
        </form>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1">
            Already have an account?{' '}
            <Button component="a" href="/login" sx={{ pl: 0 }} type="submit">
              Log in now
            </Button>
          </Typography>
        </Box>
      </div>
      <div className="right-side">
        <img id="first-logo" src={RegisterSVG} alt="logo" />
        <img id="second-logo" src={Register2SVG} alt="logo" />
      </div>
    </Layout>
  );
}

export default Register;
