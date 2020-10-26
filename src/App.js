import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './views/LoginPage';
import ChatPage from './views/ChatPage';
import NavBar from './components/NavBar';
import ProfilePage from './views/ProfilePage';
import { setUserData } from './actions/userDataActions';

function App() {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(setUserData());

    return user.user == null ? setShow(false) : setShow(true);
  }, [user.user, dispatch]);

  return (

    <Router>
      {show ? <NavBar /> : null}
      <Route path="/" component={LoginPage} exact />
      <Route path="/chat" component={ChatPage} />
      <Route path="/profile" component={ProfilePage} />
    </Router>

  );
}

export default App;
