import { Menu, MenuItem, Typography } from '@material-ui/core';
import React from 'react';

const PopoverMenu = ({ anchorEl, onClose, items }) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    open={!!anchorEl}
    onClose={onClose}
  >
    {items.map(item => (
      <MenuItem key={item.text} onClick={item.onClick}>
        <Typography variant={'button'}>{item.text}</Typography>
      </MenuItem>
    ))}
  </Menu>
);

export default PopoverMenu;
