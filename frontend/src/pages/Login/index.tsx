import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useAppDispatch } from '../../hooks/redux.hook';
import { getProfile, login } from '../../services/auth';
import loginSVG from '../../assets/login.svg';
import login2SVG from '../../assets/login-2.svg';
import Layout from '../../styled/LoginRegisterLayout';

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const checkFields = (): boolean => {
    let isError = false;
    const newErrors: { [key: string]: string } = {};
    if (!email) {
      isError = true;
      newErrors.email = 'Email is required';
    }
    if (!password) {
      isError = true;
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return isError;
  };

  const handleGetProfile = () => {
    dispatch(getProfile()).then((result) => {
      const { payload } = result;
      if (payload) navigate('/dashboard');
    });
  };

  const handleSubmit = () => {
    if (!checkFields()) {
      dispatch(login({ email, password })).then((result) => {
        const { payload } = result;
        if (payload) handleGetProfile();
      });
    }
  };

  return (
    <Layout>
      <div className="left-side">
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome back!
        </Typography>
        <Typography variant="body1" >
          Log in to your account to continue.
        </Typography>
        {/* <Button variant="contained" fullWidth onClick={() => handleSubmit()}>
          Log In With Google
        </Button> */}
        <div className="divider-area">
          <hr />
          <Typography variant="subtitle1">Or Login With Email</Typography>
          <hr />
        </div>

        <form style={{ width: '100%' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Email
          </Typography>
          <TextField
            autoFocus
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={Boolean(errors.email)}
            helperText={errors.email}
            required
            fullWidth
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
          <Button variant="contained" sx={{ marginTop: '1rem' }} fullWidth onClick={() => handleSubmit()}>
            Log In
          </Button>
        </form>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1">
            Don&apos;t have an account yet?{' '}
            <Button component="a" href="/register" sx={{ pl: 0 }}>
              Sign up now
            </Button>
          </Typography>
        </Box>
      </div>

      <div className="right-side">
        <img id="first-logo" src={login2SVG} alt="logo" />
        <img id="second-logo" src={loginSVG} alt="logo" />
      </div>
    </Layout>
  );
}

export default Login;
