import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { LayoutActions } from '../../redux/actions/layoutActions';
import { Link } from 'react-router-dom';

function Welcome({ dispatch, userProfile }) {
  return (
    <>
      <Box mt={'3rem'} px={'2rem'}>
        <Typography align={'center'} variant={'h4'} gutterBottom>
          Welcome to Your Personal TV Show Tracker
        </Typography>
        <Typography align={'center'} variant={'body1'} color={'textSecondary'} gutterBottom>
          Browse, favorite or track shows so you don't miss an episode
        </Typography>
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-evenly'}
        alignItems={'center'}
        minHeight={'20vh'}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(LayoutActions.toggleSearch())}
        >
          Find a TV show
        </Button>
        {userProfile === 'No User' && (
          <Button variant="contained" color="primary" component={Link} to={'/signup'}>
            Sign Up
          </Button>
        )}
      </Box>
    </>
  );
}
const mapStateToProps = state => ({
  userProfile: state.user.profile
});

export default connect(mapStateToProps)(Welcome);
