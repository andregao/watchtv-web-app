import { Button } from '@material-ui/core';
import React from 'react';

const ShowButton = ({ isMdUp, condition, matchConfig, mismatchConfig }) => (
  <Button
    variant={condition ? 'outlined' : 'contained'}
    color={condition ? matchConfig.color : mismatchConfig.color}
    style={{ marginLeft: isMdUp ? '1rem' : '' }}
    onClick={condition ? matchConfig.handler : mismatchConfig.handler}
  >
    {condition ? matchConfig.text : mismatchConfig.text}
  </Button>
);

export default ShowButton
