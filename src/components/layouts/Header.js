import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem
} from '@material-ui/core';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LayoutActions } from '../../redux/actions/layoutActions';
import { AuthActions } from '../../redux/actions/authActions';
import { LoadingCircle } from './LoadingCircle';
import { navigateTo } from '../../services/app';

function Header({ userProfile, dispatch }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenMenu = e => setAnchorEl(e.currentTarget);
  const handleSignOut = () => {
    setAnchorEl(null);
    dispatch(AuthActions.signOut());
  };
  const saveRedirect = () => dispatch(AuthActions.saveRedirect());

  return (
    <AppBar position={'sticky'}>
      <Box component={Toolbar} display={'flex'}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="Dashboard"
          onClick={() => navigateTo('/dashboard')}
        >
          <TvIcon />
        </IconButton>
        <Typography color={'inherit'} variant={'h6'} component={Link} to={'/welcome'}>
          WatchTV
        </Typography>

        <Box flexGrow={1} />
        {!userProfile ? (
          <LoadingCircle />
        ) : (
          <>
            {userProfile === 'No User' ? (
              <Button color={'inherit'} component={Link} to={'/signin'} onClick={saveRedirect}>
                Sign In
              </Button>
            ) : (
              <>
                <Button
                  color={'inherit'}
                  aria-controls="user-menu"
                  aria-haspopup="true"
                  onClick={handleOpenMenu}
                >
                  {userProfile.displayName}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={!!anchorEl}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={() => setAnchorEl(null)} component={Link} to={'/dashboard'}>
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                </Menu>
              </>
            )}
          </>
        )}

        <IconButton
          edge="end"
          color="inherit"
          aria-label="Search"
          onClick={() => dispatch(LayoutActions.toggleSearch())}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </AppBar>
  );
}

const mapStateToProps = state => ({
  userProfile: state.user.profile
});
export default connect(mapStateToProps)(Header);
