import { Box } from '@material-ui/core';
import googleLogo from '../../static/google.png';
import { signInWithGoogle } from '../../services/auth';
import React from 'react';
import styled from 'styled-components';

const GoogleButton = () => (
  <Box textAlign={'center'}>
    <Branding src={googleLogo} alt={'google sign in'} onClick={signInWithGoogle} />
  </Box>
);

const Branding = styled.img`
  cursor: pointer;
  &:hover {
    filter: drop-shadow(0 4px 5px rgba(0, 0, 0, 0.7));
  }
`;

export default GoogleButton;
