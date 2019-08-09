import React from 'react';
import { Box, Divider, Link, Typography } from '@material-ui/core';

const Footer = () => (
  <>
    <Divider />
    <Typography variant={'body2'} component={'div'}>
      <Box display={'flex'} px={'1rem'} py={'.5rem'}>
        <Box mr={'.3rem'}>
          <span>Entertainment API powered by </span>
          <Link color="primary" href="https://www.themoviedb.org" target="_blank">
            The Movie DB
          </Link>
        </Box>
        <Box flexGrow={1} />
        <Box textAlign={'right'}>
          <Link color="primary" href="https://andregao.com" target="_blank">
            Andre Gao
          </Link>
          <span> 2019</span>
        </Box>
      </Box>
    </Typography>
  </>
);


export default Footer;
