import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteUser from './DeleteUser';
import auth from '../lib/auth-helper';
import { read } from './api-user';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.mixins.gutters(),
    maxWidth: 800,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    backgroundColor: '#626060',
    color: '#fff',
  },
  title: {
    marginTop: theme.spacing(3),
    color: 'orange',
  },
  editIcon: {
    color: 'lightblue',
  },
  deleteIcon: {
    color: 'orange', 
  },
  emailText: {
    color: 'lightblue',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'grey',
    padding: theme.spacing(1),
    textAlign: 'left',
    color: '#fff',
  },
}));

export default function Profile() {
  const location = useLocation();
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();
  const { userId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    read({ userId: userId }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [userId]);

  if (redirectToSignin) {
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }

  return (
    <>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} classes={{ secondary: classes.emailText }} />
            {auth.isAuthenticated().user && auth.isAuthenticated().user._id === user._id && (
              <ListItemSecondaryAction>
                <Link to={`/user/edit/${user._id}`}>
                  <Tooltip title="Edit">
                    <IconButton aria-label="Edit" className={classes.editIcon}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
                <DeleteUserIconButton userId={user._id} classes={classes} />
              </ListItemSecondaryAction>
            )}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={`Joined: ${new Date(user.created).toDateString()}`} />
          </ListItem>
        </List>
      </Paper>
      <footer className={classes.footer}>
        <Typography variant="body2" color="white">
          © {new Date().getFullYear()} WeDev. All rights reserved.
        </Typography>
      </footer>
    </>
  );
}

function DeleteUserIconButton({ userId, classes }) {
  return (
    <DeleteUser userId={userId}>
      {({ deleteUser }) => (
        <Tooltip title="Delete">
          <IconButton aria-label="Delete" className={classes.deleteIcon} onClick={deleteUser}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </DeleteUser>
  );
}