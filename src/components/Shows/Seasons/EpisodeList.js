import React from 'react';
import { Box, Checkbox, Divider, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { getImgElAttr } from '../../../services/api';
import { LayoutActions } from '../../../redux/actions/layoutActions';
import { connect } from 'react-redux';

function EpisodeList({ episodes, watched, dispatch }) {
  const handleClick = episodeData => e => {
    e.target.type !== 'checkbox' && dispatch(LayoutActions.toggleEpisodeDetail(episodeData));
  };
  const handleCheckboxClick = epNum => () => {
    console.log('checked episode:', epNum);
  };
  console.log('watched array', watched);

  return (
    <Box display={'flex'} flexDirection={'column'}>
      {episodes.map((episode, index) => (
        <Box key={episode.id} display={'flex'} flexDirection={'column'}>
          {index !== 0 && <Divider variant={'middle'} />}
          <Box
            position={'relative'}
            display={'flex'}
            key={episode.id}
            alignItems={'center'}
            my={'.3rem'}
            onClick={handleClick(episode)}
          >
            {watched && watched.includes(+episode.episode_number) && <WatchedOverlay />}
            {watched && (
              <Checkbox
                onChange={handleCheckboxClick(episode.episode_number)}
                checked={watched.includes(+episode.episode_number)}
              />
            )}
            <Box flexBasis={'35%'}>
              <EpisodeThumbnail {...getImgElAttr('still', episode.still_path)} />
            </Box>
            <Box
              ml={'.8rem'}
              flexBasis={'60%'}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
            >
              <Typography variant={'body2'} color={'textPrimary'}>
                E{episode.episode_number} {episode.name}
              </Typography>
              <Typography variant={'caption'} color={'textSecondary'}>
                Air Date: {episode.air_date}
              </Typography>
              <EpisodeOverview variant={'caption'} color={'textSecondary'}>
                {episode.overview}
              </EpisodeOverview>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

const EpisodeThumbnail = styled.img`
  width: 100%;
  object-fit: contain;
`;

const EpisodeOverview = styled(Typography)`
  display: none;
  @media (min-width: 600px) {
    display: block;
  }
`;

const WatchedOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.4);
`;

export default connect()(EpisodeList);
