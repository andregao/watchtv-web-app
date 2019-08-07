import React, { forwardRef } from 'react';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@material-ui/core';
import { connect } from 'react-redux';
import { LayoutActions } from '../../redux/actions/layoutActions';
import ShowSeasons from '../Shows/Seasons/ShowSeasons';
import { UserActions } from '../../redux/actions/userActions';
import { AppActions } from '../../redux/actions/appActions';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TrackWizard = ({ open, showId, shows, appSeasons, wizard, dispatch }) => {
  const handleClose = () => dispatch(LayoutActions.toggleTrackWizard(null));
  const handleAddSeason = (seasonNum, showData) => {
    const trackShowData = {
      name: showData.name,
      id: showData.id,
      poster_path: showData.poster_path,
      seasonNum
    };
    dispatch(UserActions.wizardAddSeason(trackShowData));
    dispatch(AppActions.deselectSeason(showId));
  };
  const handleTrackShow = () => {
    dispatch(UserActions.trackShow(wizard));
    handleClose();
    const notify = {
      message: `Following ${wizard.name}`,
      variant: 'success',
      link: { internal: '/dashboard', text: 'Go To DashBoard' }
    };
    dispatch(LayoutActions.toggleNotification(notify));
  };

  const handleRemoveSeason = seasonNum => {
    dispatch(UserActions.wizardRemoveSeason(seasonNum));
    dispatch(AppActions.deselectSeason(showId));
  };

  return (
    open && (
      <Container
        maxWidth={'md'}
        style={{ padding: 0 }}
        component={Dialog}
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Which Seasons to Follow?</DialogTitle>
        <DialogContent style={{ padding: 0 }}>
          <ShowSeasons
            seasons={shows[showId].seasons}
            shows={shows}
            wizard={wizard}
            handleAddSeason={handleAddSeason}
            handleRemoveSeason={handleRemoveSeason}
            appSeasons={appSeasons}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color={'primary'}
            variant={'contained'}
            onClick={handleTrackShow}
            disabled={!wizard.seasons.length}
          >
            Follow
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Container>
    )
  );
};

const mapStateToProps = state => ({
  showId: state.layout.trackWizardShow,
  shows: state.shows,
  appSeasons: state.seasons,
  wizard: state.trackWizard
});

export default connect(mapStateToProps)(TrackWizard);
