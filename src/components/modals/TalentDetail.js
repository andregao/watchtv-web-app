import {
  Box, Button,
  Container,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Typography
} from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getExternalLinkAttr, getImdbTalentLink, getImgElAttr } from '../../services/api';
import { AppActions } from '../../redux/actions/appActions';

const TalentDetail = ({ open, talent, dispatch }) => {
  const handleClose = () => dispatch(AppActions.deselectTalent());
  return !talent ? null : (
    <DialogContainer
      maxWidth={'sm'}
      component={Dialog}
      fullScreen
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{talent.name}</DialogTitle>

      <DialogContent>
        <Box display={'flex'} flexDirection={'column'}>
          <Box flex={'1 0 200px'}>
            <Profile {...getImgElAttr('profile', talent.profile_path, true)} />
          </Box>

          <Typography variant={'body2'} gutterBottom color={'textSecondary'}>
            {talent.biography}
          </Typography>
          {talent.place_of_birth && (
            <>
              <Typography color={'textPrimary'} variant={'caption'}>
                Birthplace:
              </Typography>
              <Typography variant={'body2'} gutterBottom color={'textSecondary'}>
                {talent.place_of_birth}
              </Typography>
            </>
          )}
          {talent.birthday && (
            <>
              <Typography color={'textPrimary'} variant={'caption'}>
                Date of Birth:
              </Typography>
              <Typography variant={'body2'} gutterBottom color={'textSecondary'}>
                {talent.birthday}
              </Typography>
            </>
          )}
          {talent.imdb_id && (
            <>
              <Typography color={'textPrimary'} variant={'caption'}>
                IMDB Profile:
              </Typography>
              <Typography variant={'body2'} gutterBottom color={'textSecondary'}>
                <Link href={getImdbTalentLink(talent.imdb_id)} {...getExternalLinkAttr()}>
                  {talent.name}
                </Link>
              </Typography>
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

const Profile = styled.img`
  width: 100%;
  object-fit: contain;
`;

const mapStateToProps = state => ({
  talent: state.talents && state.talents[state.talents.selectedTalent]
});

export default connect(mapStateToProps)(TalentDetail);
