import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Box, Paper, Typography } from '@material-ui/core';
import { getImgElAttr } from '../../../services/api';
import useDebounce from '../../../utils/useDebounce';
import { AppActions } from '../../../redux/actions/appActions';

const Talent = ({ talent, dispatch }) => {

  const handleSelectTalent = id => () => {
    dispatch(AppActions.selectTalent(id));
  };

  return (
    <Box
      display={'flex'}
      component={Paper}
      my={'.3rem'}
      onClick={handleSelectTalent(talent.id)}
    >
      <Box width={'40%'} display={'flex'}>
        <Portrait {...getImgElAttr('profile', talent.profile_path)} />
      </Box>
      <Box
        px={'.5rem'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        width={'60%'}
      >
        <Typography color={'textPrimary'} align={'center'}>
          {talent.name}
        </Typography>
        <Typography color={'textSecondary'} align={'center'}>
          {talent.character}
        </Typography>
      </Box>
    </Box>
  );
}

const Portrait = styled.img`
  width: 100%;
  object-fit: contain;
  cursor: pointer;
`;

const mapStateToProps = state => ({
  height: state.layout.talentCardHeight,
  width: state.layout.talentCardWidth
});

export default connect(mapStateToProps)(Talent);
