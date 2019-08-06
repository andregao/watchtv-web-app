import React from 'react';
import { Snackbar, SnackbarContent, Box, Button, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import { connect } from 'react-redux';
import { LayoutActions } from '../../redux/actions/layoutActions';

const white = { color: 'white' };
const variantConfig = {
  success: { icon: <CheckCircleIcon style={white} />, color: '#43a047' },
  error: { icon: <ErrorIcon style={white} />, color: '#d32f2f' },
  info: { icon: <InfoIcon style={white} />, color: '#2979ff' }
};

const Notification = ({ history, data, dispatch }) => {
  let message, variant, style;
  data && ({ message, variant } = data);
  variant && (style = variantConfig[variant]);
  const handleClose = () => dispatch(LayoutActions.toggleNotification(null));
  const handleNavigate = () => {
    history.push('/dashboard');
    handleClose();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={!!data}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <SnackbarContent
        aria-describedby="notification-message"
        message={
          <Box id="notification-message" display={'flex'} alignItems={'center'}>
            {style && style.icon}
            <Typography color={'textPrimary'} variant={'body1'} style={{ paddingLeft: '1rem' }}>
              {message}
            </Typography>
          </Box>
        }
        action={[
          <Button key="navigate" variant={'outlined'} size="small" onClick={handleNavigate}>
            Go To Dashboard
          </Button>,
          <IconButton key="close" aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        ]}
        style={style ? { backgroundColor: style.color } : {}}
      />
    </Snackbar>
  );
};

const mapStateToProps = state => ({ data: state.layout.notification });

export default connect(mapStateToProps)(Notification);
