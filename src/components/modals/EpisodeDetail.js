import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { LayoutActions } from '../../redux/actions/layoutActions';
import styled from 'styled-components';
import { getImgElAttr } from '../../services/api';

const EpisodeDetail = ({ open, episode, dispatch }) => {
  const handleClose = () => dispatch(LayoutActions.toggleEpisodeDetail(null));
  return !episode ? null : (
    <DialogContainer
      maxWidth={'sm'}
      component={Dialog}
      fullScreen
      open={open}
      onClose={handleClose}
    >
      <Thumbnail {...getImgElAttr('still', episode.still_path)} />
      <DialogTitle>
        {episode.name}
        <Typography variant={'body2'} color={'textSecondary'}>
          {`S${episode.season_number}E${episode.episode_number}`} - Air Date: {episode.air_date}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box display={'flex'} flexDirection={'column'}>
          <Typography variant={'body1'} color={'textSecondary'} gutterBottom>
            {episode.overview}
          </Typography>
          {episode.guest_stars && !!episode.guest_stars.length && (
            <>
              <Divider />
              <Typography variant={'body2'} align={'right'} gutterBottom color={'textPrimary'}>
                Guest Stars:
              </Typography>
              {episode.guest_stars.map(talent => (
                <Box my={'0.2rem'} key={talent.id}>
                  <Typography variant={'body2'} color={'textSecondary'} align={'right'}>
                    {talent.name} {talent.character && `as ${talent.character}`}
                  </Typography>
                </Box>
              ))}
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Back
        </Button>
      </DialogActions>
    </DialogContainer>
  );
};

const DialogContainer = styled(Container)`
  margin: 1rem 3vw;
`;

const Thumbnail = styled.img`
  width: 100%;
  object-fit: contain;
`;

const mapStateToProps = state => ({
  episode: state.layout.episodeDetail
});

export default connect(mapStateToProps)(EpisodeDetail);
