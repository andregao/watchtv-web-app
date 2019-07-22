import { LinearProgress } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

export function LoadingLine() {
  return <Line color={'secondary'}/>;
}
const Line = styled(LinearProgress)`
  margin: 5rem 2rem;
`;
