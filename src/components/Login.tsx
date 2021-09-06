import React from 'react';
import { Alert, Box, Paper, TextField, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import useIsMobile from 'hooks/useIsMobile';
import { useLoginMutation } from 'redux/services/auth';
import { LoadingButton } from '@material-ui/lab';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
});

function Login() {
  const isMobile = useIsMobile();

  const [login, { isLoading, isError }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <Box
      margin={1}
      paddingTop={2}
      display="flex"
      flexDirection="column"
      maxWidth="400px"
      width="100%"
      height="100%"
      alignSelf="center"
      sx={{
        '& .MuiTextField-root': {
          marginTop: '1rem',
          marginBottom: '1rem',
        },

        '& .MuiTypography-root': {
          marginBottom: '1rem',
        },
      }}
    >
      <Paper
        elevation={isMobile ? 0 : 1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
        }}
      >
        <Typography variant="h4" textAlign="center">
          Login
        </Typography>
        {isError && (
          <Alert severity="error" variant="outlined">
            Could not login. Please try again.
          </Alert>
        )}
        <Box component="form" onSubmit={formik.handleSubmit} display="flex" flexDirection="column">
          <TextField
            label="Email"
            placeholder="john@email.xx"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            size="small"
          />
          <TextField
            label="Password"
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            size="small"
          />
          <LoadingButton
            variant="contained"
            type="submit"
            loading={isLoading}
            loadingIndicator="Logging in..."
            size="small"
          >
            Log in
          </LoadingButton>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
