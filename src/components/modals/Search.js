import React, { useEffect, useState, forwardRef } from 'react';
import {
  AppBar,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
  Box,
  Container
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { LayoutActions } from '../../redux/actions/layoutActions';
import { ApiActions } from '../../redux/actions/apiActions';
import ShowList from '../Shows/ShowList';
import useDebounce from '../../utils/useDebounce';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Search({ open, dispatch, results }) {
  const [query, setQuery] = useState('');

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    query && dispatch(ApiActions.search(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  function handleClose() {
    dispatch(LayoutActions.toggleSearch());
  }

  return (
    <Container
      maxWidth={'lg'}
      component={Dialog}
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar position={'sticky'}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Search TV Shows</Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="name of the show"
          type="text"
          fullWidth
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Divider />
        {results && results.length ? (
          <ShowList shows={results} handleClick={handleClose}/>
        ) : (
          results && (
            <Box
              p={'3rem'}
              textAlign={'center'}
              color={'text.secondary'}
              component={Typography}
              variant="h4"
            >
              No Result
            </Box>
          )
        )}
      </DialogContent>
    </Container>
  );
}

const mapStateToProps = state => ({
  results: state.api.searchResults
});

export default connect(mapStateToProps)(Search);
