import React, { useEffect } from 'react';
import ShowHeader from './Header/ShowHeader';
import { connect } from 'react-redux';
import { ApiActions } from '../../redux/actions/apiActions';
import { Box } from '@material-ui/core';
import ShowInfo from './Info/ShowInfo';
import ShowSeasons from './Seasons/ShowSeasons';

function ShowPage({ dispatch, match, shows }) {
  const id = match.params.tvId;

  useEffect(() => {
    dispatch(ApiActions.selectShow(id));
  }, [id, dispatch]);

  return !shows[id] ? <></> : (
    <Box display={'flex'} flexDirection={'column'}>
      <ShowHeader show={shows[id]} />
      <ShowInfo {...shows[id].imdb} id={id} />
      <ShowSeasons seasons={shows[id].seasons} />
    </Box>
  );
}

const mapStateToProps = state => ({ shows: state.shows });

export default connect(mapStateToProps)(ShowPage);
