import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from '../lib/auth-helper'



import { Link, useNavigate, useLocation } from 'react-router-dom';

const isActive = (location, path) => {
  return location.pathname === path ? { color: 'orange' } : { color: '#DADBC0' };
};

const isPartActive = (location, path) => {
  if (location.pathname.includes(path))
    return {color: 'red'}
  else
    return {color: '#ffffff'}
}

export default function Menu(){ 
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" style={{ background: '#000000' }}>
    <Toolbar style={{ justifyContent: 'space-between' }}>
    <img src="../assets/images/WeDev_Logo.png" alt="WeDev" style={{ height: '70px', width: '120px' }}/>
      <div>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(location, "/")}>
            <HomeIcon/>
          </IconButton>
        </Link>
        <Link to="/users">
          <Button style={isActive(location, "/users")}>Users</Button>
        </Link>
        <Link to="/survey">
            <Button style={isActive(location, "/survey")}>Survey</Button>
        </Link>
        {
          !auth.isAuthenticated() && (<span>
            <Link to="/signup">
              <Button style={isActive(location, "/signup")}>Sign up</Button>
            </Link>
            <Link to="/signin">
              <Button style={isActive(location, "/signin")}>Sign In</Button>
            </Link>
          </span>)
        }
        {
          auth.isAuthenticated() && (<span>
            {auth.isAuthenticated().user && auth.isAuthenticated().user.seller && (<Link to="/seller/shops"><Button style={isPartActive(location, "/seller/")}>My Shops</Button></Link>)}
            <Link to={"/user/" + auth.isAuthenticated().user._id}>
              <Button style={isActive(location, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
            </Link>
            <Button color="inherit" onClick={() => {
                 auth.clearJWT(() => navigate('/'));
              }}>Sign out</Button>
          </span>)
        }
      </div>
    </Toolbar>
  </AppBar>
);
}
