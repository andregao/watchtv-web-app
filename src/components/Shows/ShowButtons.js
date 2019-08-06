import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { UserActions } from '../../redux/actions/userActions';
import { LayoutActions } from '../../redux/actions/layoutActions';
import { navigateTo } from '../../services/app';
import ShowButton from './ShowButton';
import PopoverMenu from '../layouts/PopoverMenu';
import { Link } from 'react-router-dom';
import { AuthActions } from '../../redux/actions/authActions';

const ShowButtons = ({ userProfile, show, favShows, trackShows, dispatch }) => {
  const isMdUp = useMediaQuery('(min-width:600px)');
  const { name, id, poster_path } = show;
  const showData = { id, name, poster_path };
  const handleTrack = () => dispatch(LayoutActions.toggleTrackWizard(id));
  const handleFavoriteShow = () => dispatch(UserActions.favoriteShow(showData));
  const isFavorited = showId => favShows.some(s => s.id === showId);
  const isTracked = showId => trackShows.some(s => s.id === showId);

  const [trackMenuAnchor, setTrackMenuAnchor] = useState(null);
  const handleTrackedMenu = e => setTrackMenuAnchor(e.currentTarget);
  const handleNavigate = () => navigateTo('/dashboard');
  const handleRemoveTracking = () => {
    dispatch(UserActions.removeTrackShow(id));
    setTrackMenuAnchor(null);
  };

  const [favMenuAnchor, setFavMenuAnchor] = useState(null);
  const handleFavoritedMenu = e => setFavMenuAnchor(e.currentTarget);
  const handleRemoveFavorite = () => {
    dispatch(UserActions.removeFavorite(id));
    setFavMenuAnchor(null);
  };

  const saveRedirect = () => dispatch(AuthActions.saveRedirect());

  return userProfile === 'No User' ? (
    <Box m={'1rem'} textAlign={'center'}>
      <Button variant="contained" color="primary" component={Link} to={'/signup'} onClick={saveRedirect}>
        Sign Up to Follow This Show
      </Button>
    </Box>
  ) : (
    <Box
      m={'1rem'}
      display={'flex'}
      justifyContent={isMdUp ? 'flex-start' : 'space-evenly'}
      maxWidth={600}
    >
      {/* Follow Button */}
      <ShowButton
        isMdUp={isMdUp}
        condition={isTracked(id)}
        matchConfig={{ handler: handleTrackedMenu, text: 'Following', color: 'default' }}
        mismatchConfig={{ handler: handleTrack, text: 'Follow', color: 'primary' }}
      />
      <PopoverMenu
        anchorEl={trackMenuAnchor}
        onClose={() => setTrackMenuAnchor(null)}
        items={[
          { text: 'Go To Dashboard', onClick: handleNavigate },
          {
            text: 'Unfollow',
            onClick: handleRemoveTracking
          }
        ]}
      />

      {/* Favorite Button */}
      <ShowButton
        isMdUp={isMdUp}
        condition={isFavorited(id)}
        matchConfig={{ handler: handleFavoritedMenu, text: 'Favorited', color: 'default' }}
        mismatchConfig={{ handler: handleFavoriteShow, text: 'Favorite', color: 'secondary' }}
      />
      <PopoverMenu
        anchorEl={favMenuAnchor}
        onClose={() => setFavMenuAnchor(null)}
        items={[
          { text: 'Go To Dashboard', onClick: handleNavigate },
          {
            text: 'Remove Favorite',
            onClick: handleRemoveFavorite
          }
        ]}
      />
    </Box>
  );
};

const mapStateToProps = state => ({
  userProfile: state.user.profile,
  favShows: state.user.favShows,
  trackShows: state.user.trackShows
});

export default connect(mapStateToProps)(ShowButtons);
