import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { Box, Typography, TextField, Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import loginSVG from '../../assets/login.svg';
import login2SVG from '../../assets/login-2.svg';
import Layout from '../../styled/LoginRegisterLayout';
import { GoogleLogin } from '@react-oauth/google';
import { login, loginGoogle } from '../../redux/slice/ProfileSlice';

function Login() {

  /** Hook to trigger the functions into the slices */
  const dispatch = useAppDispatch();

  /** Hook to navigate others pages */
  const navigate = useNavigate();

  /** Global Profile State */
  const profileState = useAppSelector((state) => state.profile);
  const { profile } = profileState;

  /** State to manage the login form */
  const [email, setEmail] = useState('userdemo@example.com');
  const [password, setPassword] = useState('userDemo456*');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (profile.email !== '') navigate('/dashboard');
  }, [profile]) 

  function checkFields(): boolean {
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

  function handleSubmit() {
    if (!checkFields()) {
      dispatch(login({ email, password }))
    }
  };

  function handleLoginGoogle(token: string) {
    dispatch(loginGoogle({ token }))
  };

  return (
    <Layout>
      <div className="left-side">
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome back!
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '1rem' }}>Log in to your account to continue.</Typography>
        <GoogleLogin
          onSuccess={response => handleLoginGoogle(response.credential ?? "")}
          onError={() => {
            console.log('Login Failed');
          }}
        />
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

        <div className='user-demo'>
          <h3>userdemo@example.com</h3>
          <h3>userDemo456*</h3>
        </div>
      </div>

      <div className="right-side">
        <img id="first-logo" src={login2SVG} alt="logo" />
        <img id="second-logo" src={loginSVG} alt="logo" />
      </div>
    </Layout>
  )
}

export default Login;
