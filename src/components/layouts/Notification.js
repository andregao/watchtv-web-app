import React from 'react';
import { Box, Button, IconButton, Link, Snackbar, SnackbarContent, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import { LayoutActions } from '../../redux/actions/layoutActions';

const variantConfig = {
  success: { icon: <CheckCircleIcon color={'action'} />, color: '#43a047' },
  error: { icon: <ErrorIcon color={'action'} />, color: '#d32f2f' },
  info: { icon: <InfoIcon color={'action'} />, color: '#2979ff' }
};

const Notification = ({ history, notification, dispatch }) => {
  const { message, variant, link } = notification;
  const config = variantConfig[variant];
  const handleClose = () => dispatch(LayoutActions.toggleNotification(null));
  const handleNavigate = () => {
    link.internal && history.push(link.internal);
    handleClose();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={!!notification}
      autoHideDuration={7000}
      onClose={handleClose}
    >
      <SnackbarContent
        aria-describedby="notification-message"
        message={
          <Box id="notification-message" display={'flex'} alignItems={'center'}>
            {config && config.icon}
            <Typography color={'textPrimary'} variant={'body1'} style={{ paddingLeft: '1rem' }}>
              {message}
            </Typography>
          </Box>
        }
        action={
          link
            ? [
              <Button key="navigate" variant={'outlined'} size="small" onClick={handleNavigate}>
                {link.external ? <Link color={'inherit'} href={link.external}>{link.text}</Link> : link.text}
              </Button>,
              <IconButton key="close" aria-label="close" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            ]
            : [
              <IconButton key="close" aria-label="close" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            ]
        }
        style={config ? { backgroundColor: config.color } : {}}
      />
    </Snackbar>
  );
};

export default Notification;
