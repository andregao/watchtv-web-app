import React, { useState } from 'react';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LayoutActions } from '../../redux/actions/layoutActions';
import { AuthActions } from '../../redux/actions/authActions';
import LoadingCircle from './LoadingCircle';
import { UserActions } from '../../redux/actions/userActions';

const Header = ({ userProfile, dispatch }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenMenu = e => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleSignOut = () => {
    handleCloseMenu();
    dispatch(AuthActions.signOut());
  };
  const saveRedirect = () => dispatch(AuthActions.saveRedirect());
  const handleSwitchTheme = () => {
    handleCloseMenu();
    dispatch(UserActions.switchTheme());
  };

  return (
    <AppBar position={'sticky'}>
      <Box component={Toolbar} display={'flex'}>
        <IconButton edge="start" color="inherit" aria-label="Dashboard">
          <Typography component={Link} color={'inherit'} to={'/welcome'}>
            <TvIcon />
          </Typography>
        </IconButton>
        <Typography color={'inherit'} variant={'h6'} component={Link} to={'/dashboard'}>
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
                  {userProfile.displayName.length < 13
                    ? userProfile.displayName
                    : `${userProfile.displayName.slice(0, 12)}...`}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={!!anchorEl}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={handleCloseMenu} component={Link} to={'/dashboard'}>
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={handleSwitchTheme}>Switch Theme</MenuItem>
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
};

const mapStateToProps = state => ({
  userProfile: state.user.profile
});
export default connect(mapStateToProps)(Header);
