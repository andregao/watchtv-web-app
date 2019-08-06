import React, { useEffect } from 'react';
import ShowHeader from './Header/ShowHeader';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import ShowInfo from './Info/ShowInfo';
import ShowSeasons from './Seasons/ShowSeasons';
import Cast from './Info/Cast';
import ShowButtons from './ShowButtons';
import { AppActions } from '../../redux/actions/appActions';

function ShowPage({ match, shows, appSeasons, dispatch }) {
  const id = match.params.tvId;
  const haveShow = !!(shows[id] && shows[id].name);

  useEffect(() => {
    dispatch(AppActions.selectShow(id));
  }, [id, dispatch]);

  return !haveShow ? <></> : (
    <Box display={'flex'} flexDirection={'column'}>
      <ShowHeader show={shows[id]} />
      <ShowInfo {...shows[id].imdb} id={id} />
      <ShowButtons show={shows[id]} />
      <Cast id={id} />
      <ShowSeasons seasons={shows[id].seasons} appSeasons={appSeasons} shows={shows} />
    </Box>
  );
}

const mapStateToProps = state => ({ shows: state.shows, appSeasons: state.seasons });

export default connect(mapStateToProps)(ShowPage);
