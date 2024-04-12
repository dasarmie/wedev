import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import { list } from './api-user.js';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 800,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    backgroundColor: '#626060',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  },
  title: {
    marginTop: theme.spacing(2),
    color: 'orange',
  },
  listItem: {
    color: '#fff',
  },
  listItemText: {
    color: '#fff',
  },
  listItemIcon: {
    color: '#fff',
  },
}));

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then(data => {
      console.log(data);
      if (data && data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setUsers(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        All Users
      </Typography>
      <List dense>
        {users.map((item, i) => (
          <Link component={RouterLink} to={'/user/' + item._id} key={i}>
            <ListItem button className={classes.listItem}>
              <ListItemAvatar>
                <Avatar className={classes.listItemIcon}></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                className={classes.listItemText}
              />
              <ListItemSecondaryAction>
                <IconButton className={classes.listItemIcon}>
                  <ArrowForwardIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
        ))}
      </List>
    </Paper>
  );
}
