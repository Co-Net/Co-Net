import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './main.module.css';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import TextField from '@material-ui/core/TextField';


export default function AlertDialog() {
  const [open1,setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);


  const handleClickOpenUp = () => {
    setOpen1(true);
  };
  const handleClickOpenDown = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen1(false);
    setOpen2(false);
  };

  return (
    <div>
    <Button onClick={handleClickOpenUp} className = {styles.tUp} variant = 'contained'><ThumbUpIcon style = {{color: 'green', marginRight: 10}}></ThumbUpIcon>54</Button>
    <Button onClick={handleClickOpenDown} className = {styles.tDown} variant = 'contained'><ThumbDownIcon style = {{color: '#d6361d', marginRight: 10}}></ThumbDownIcon>72</Button>
      <Dialog
      maxWidth = 'sm'
        open={open1}
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Write a Review"}<ThumbUpIcon style = {{verticalAlign: 'sub', marginLeft: 10, color: 'green'}}></ThumbUpIcon>
        </DialogTitle>
        <DialogContent>
        <TextField
        id="outlined-multiline-static"
        label="Say something about this user..."
        placeholder = "Ex: 'Great teamwork, would play again with this person!'"
        multiline
        rows="10"
        fullWidth
        variant="outlined"
      />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Post Review
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
      maxWidth = 'sm'
      fullWidth
        open={open2}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Write a Review"}<ThumbDownIcon style = {{verticalAlign: 'sub', marginLeft: 10, color: '#ce0606'}}></ThumbDownIcon></DialogTitle>
        <DialogContent>
        <TextField
        id="outlined-multiline-static"
        label="Say something about this user..."
        placeholder = "Ex: 'Negative attitude, not very skilled at this game.'"
        multiline
        rows="10"
        fullWidth
        variant="outlined"
      />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Post Review
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}