import React from 'react';
import { connect } from 'react-redux';
import { Box, Checkbox, Divider, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { getImgElAttr } from '../../../services/api';
import { LayoutActions } from '../../../redux/actions/layoutActions';
import { UserActions } from '../../../redux/actions/userActions';

const EpisodeList = ({ episodes, watched, dispatch }) => {
  const handleEpisodeClick = episodeData => () => {
    dispatch(LayoutActions.toggleEpisodeDetail(episodeData));
  };

  const handleCheckboxClick = (e, episode) => {
    e.stopPropagation();
    const {show_id, season_number, episode_number} = episode;
    const watchData = {
      show: show_id,
      season: season_number,
      episode: episode_number,
      watched: e.target.checked
    };
    // update redux store and database
    dispatch(UserActions.watchEpisode(watchData));
  };


  return (
    <Box display={'flex'} flexDirection={'column'}>
      {episodes.map((episode, index) => (
        <div key={episode.id}>
          {index !== 0 && <Divider variant={'middle'} />}
          <Box
            display={'flex'}
            key={episode.id}
            alignItems={'center'}
            my={'.3rem'}
            onClick={handleEpisodeClick(episode)}
          >
            {watched && (
              <Checkbox
                onClick={e => handleCheckboxClick(e, episode)}
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
        </div>
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


export default connect()(EpisodeList);
