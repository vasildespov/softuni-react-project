import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default function Success({message, notify, handleClose}) {
    
  return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={notify}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        ClickAwayListenerProps={{ onClickAway: () => {return} }}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
   
  );
}
