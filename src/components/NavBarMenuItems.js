import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChatIcon from '@material-ui/icons/Chat';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../actions/userDataActions';

const NavBarMenuItems = () => {
  const dispatch = useDispatch();
  const ProfilePage = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/profile" {...props} />
  ));
  const ChatPage = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/chat" {...props} />
  ));
  const LoginPage = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/" {...props} />
  ));

  const handleLogout = () => {
    localStorage.removeItem('chat');
    dispatch(setUserData([]));
  };
  const location = useLocation();
  const [loc, setLoc] = useState('/');
  useEffect(() => {
    setLoc(location.pathname);
  }, [location.pathname]);
  return (
    <List>
      <ListItem button key="Chat" selected={loc === '/chat'} component={ChatPage}>
        <ListItemIcon>
          <ChatIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Chat" />
      </ListItem>
      <ListItem button key="Profile" selected={loc === '/profile'} component={ProfilePage}>
        <ListItemIcon>
          <AccountBoxIcon style={{ color: 'green' }} />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button key="Logout" component={LoginPage} onClick={handleLogout}>
        <ListItemIcon>
          <ExitToAppIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
};

export default NavBarMenuItems;
