import { Box, Button } from '@material-ui/core';
import googleLogo from '../../static/google.svg';
import { signInWithGoogle } from '../../services/auth';
import React from 'react';
import styled from 'styled-components';

const GoogleButton = () => (
  <Box textAlign={'center'} mb={'2rem'}>
    <Button aria-label={'google sign in'} onClick={signInWithGoogle} variant={'contained'} color={'secondary'}>
      <Branding src={googleLogo} />
      Sign In With Google
    </Button>
  </Box>
);

const Branding = styled.img`
  height: 2rem;
  width: auto;
  margin-right: 0.4rem;
`;

export default GoogleButton;
