import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import useForm from '../../utils/useForm';
import { validateSignUp } from '../../utils/validators';
import { AuthActions } from '../../redux/actions/authActions';
import { Box, Card, CardActions, CardContent, CardHeader, Link, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import GoogleButton from './GoogleButton';

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUp = ({ userProfile,redirect, dispatch, authError, isSubmitting, history }) =>{
  useEffect(() => {
    if (userProfile && userProfile !== 'No User') {
      redirect ? history.push(`/tv/${redirect}`) : history.push('/dashboard');
    }
  }, [userProfile]);

  const { values, handleChange, handleBlur, handleSubmit, errors } = useForm(
    initialValues,
    validateSignUp,
    isSubmitting,
    isSubmitting => dispatch(AuthActions.setSubmitting(isSubmitting)),
    credentials => dispatch(AuthActions.signUp(credentials))
  );

  return (
    <form onSubmit={handleSubmit}>
      <Box my={'1.5rem'} mx={'1rem'} component={Card}>
        <CardHeader title={'Sign Up'} />
        <CardContent>
          <TextField
            label="nickname"
            name="name"
            fullWidth
            value={values.name}
            autoFocus
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            helperText={errors['name']}
            error={!!errors.name}
          />
          <TextField
            label="email"
            name="email"
            fullWidth
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            helperText={errors['email']}
            error={!!errors.email}
          />
          <TextField
            label="password"
            name="password"
            type="password"
            fullWidth
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            helperText={errors['password']}
            error={!!errors.password}
          />
          <TextField
            label="confirm password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={values.confirmPassword}
            onChange={handleChange}
            margin="normal"
            helperText={errors['confirmPassword']}
            error={!!errors.confirmPassword}
          />
          {authError && (
            <CardActions>
              <Typography color={'error'} variant={'body2'}>
                {authError}
              </Typography>
            </CardActions>
          )}
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            variant={'contained'}
            fullWidth
            color={'primary'}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
        </CardActions>
        <Box justifyContent={'flex-end'} component={CardActions}>
          <Link component={RouterLink} to={'/signin'}>
            Already have an account?
          </Link>
        </Box>
      </Box>
      <GoogleButton />
    </form>
  );
}

const mapStateToProps = state => ({
  userProfile: state.user.profile,
  redirect: state.user.redirect,
  authError: state.user.error,
  isSubmitting: state.user.isSubmitting
});

export default connect(mapStateToProps)(SignUp);
