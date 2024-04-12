import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, TextField, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { create } from './api-user';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 800,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    backgroundColor: '#626060',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  },
  textField: {
    width: '100%',
    marginBottom: theme.spacing(2),
    '& .MuiInputBase-input': {
      color: '#fff',
    },
    '& label': {
      color: '#DADBC0',
    },
    '& label.Mui-focused': {
      color: '#DADBC0',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#DADBC0',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#DADBC0',
    },
  },
  error: {
    color: 'pink',
    fontSize: 'inherit', // Set font size to inherit from the surrounding text
  },
  submit: {
    margin: '0 auto',
    marginBottom: theme.spacing(2),
    backgroundColor: 'orange',
    color: '#333',
    '&:hover': {
      backgroundColor: 'orange',
    },
  },
  title: {
    fontSize: 18,
    color: 'orange',
  },
}));

export default function Signup() {
  const classes = useStyles();

  const [values, setValues] = useState({ 
    name: '',
    password: '', 
    email: '',
  });

  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clickSubmit = () => { 
    const user = {
      name: values.name || undefined,
      email: values.email || undefined, 
      password: values.password || undefined,
    };

    create(user).then((data) => { 
      if (data.error) {
        setError(data.error);
      } else {
        setOpen(true);
      }
    });
  };

  Signup.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
  };

  return (
    <div>
      <Card className={classes.card}> 
        <CardContent>
          <Typography variant="h6" className={classes.title}> 
            Sign Up
          </Typography>
          {error && (
            <Typography variant="body2" className={classes.error}>
              {error}
            </Typography>
          )}
                  
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange('name')}
            margin="normal"
            InputProps={{
              className: classes.textField,
            }}
          />
          <TextField
            id="email"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange('email')}
            margin="normal"
            InputProps={{
              className: classes.textField,
            }}
          />
          <TextField
            id="password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange('password')}
            type="password"
            margin="normal"
            InputProps={{
              className: classes.textField,
            }}
          />
        </CardContent> 
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit} 
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions> 
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/Signin">
            <Button
              color="primary"
              autoFocus
              variant="contained"
              onClick={handleClose}
            >
              Sign In 
            </Button>
          </Link>
        </DialogActions> 
      </Dialog>
    </div>
  );
}
