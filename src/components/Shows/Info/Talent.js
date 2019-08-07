import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Box, Paper, Typography } from '@material-ui/core';
import { getImgElAttr } from '../../../services/api';
import useDebounce from '../../../utils/useDebounce';
import { AppActions } from '../../../redux/actions/appActions';

function Talent({ talent, size, setSize, dispatch }) {
  const firstEl = useRef(null);
  const [event, setEvent] = useState(null);
  const debouncedEvent = useDebounce(event, 300);
  const updateCardSize = () =>
    setSize({
      height: firstEl.current && firstEl.current.offsetHeight,
      width: firstEl.current && firstEl.current.offsetWidth
    });

  const handleSelectTalent = id => () => {
    dispatch(AppActions.selectTalent(id));
  };

  // listener effect: runs once
  useEffect(() => {
    setSize && setTimeout(updateCardSize, 600);
    setSize && window.addEventListener('resize', setEvent);
    return () => window.removeEventListener('resize', setEvent);
  }, []);

  // updater: runs when debounced event occur or size changes
  useEffect(() => {
    setSize && updateCardSize();
  }, [debouncedEvent, size.width, size.height]);

  return (
    <Box
      display={'flex'}
      flex={'1 0 200px'}
      component={Paper}
      my={'.3rem'}
      ref={setSize ? firstEl : null}
      maxHeight={setSize ? null : size.height + 'px'}
      maxWidth={setSize ? null : size.width + 'px'}
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
