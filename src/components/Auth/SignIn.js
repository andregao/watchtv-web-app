import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useForm from '../../utils/useForm';
import { validateSignIn } from '../../utils/validators';
import { AuthActions } from '../../redux/actions/authActions';
import { Link as RouterLink } from 'react-router-dom';
import { user$ } from '../../services/auth';

const initialValues = {
  email: '',
  password: ''
};

function SignIn({ dispatch, authError, isSubmitting, history }) {
  useEffect(() => {
    const userSub = user$.subscribe(user => user && history.push('/dashboard'));
    return () => userSub.unsubscribe();
  }, []);

  const { values, handleChange, handleBlur, handleSubmit, errors } = useForm(
    initialValues,
    validateSignIn,
    isSubmitting,
    isSubmitting => dispatch(AuthActions.setSubmitting(isSubmitting)),
    credentials => dispatch(AuthActions.signIn(credentials))
  );

  return (
    <form onSubmit={handleSubmit}>
      <Box my={'1.5rem'} mx={'1rem'} component={Card}>
        <CardHeader title={'Sign In'} />
        <CardContent>
          <TextField
            label="email"
            name="email"
            fullWidth
            value={values.name}
            autoFocus
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors['email'] || ' '}
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
            helperText={errors['password'] || ' '}
            error={!!errors.password}
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
            type={'submit'}
            variant={'contained'}
            fullWidth
            color={'primary'}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Sign In
          </Button>
        </CardActions>
        <Box justifyContent={'flex-end'} component={CardActions}>
          <Link component={RouterLink} to={'/signup'}>
            Sign up for an account
          </Link>
        </Box>
      </Box>
    </form>
  );
}

const mapStateToProps = state => ({
  authError: state.user.error,
  isSubmitting: state.user.isSubmitting
});

export default connect(mapStateToProps)(SignIn);
