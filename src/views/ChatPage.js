import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Button, Grid, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getChatData, sendNewChatMessage } from '../actions/chatDataActions';
import { setUserData } from '../actions/userDataActions';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    width: 'calc(100vw - 10%)',
    textAlign: 'center',
  },
  message: {
    display: 'flex',
    margin: '8px',
    width: '90%',

  },
  chat: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '4em',

  },
  chatBox: {
    borderRadius: '15px',
    height: '50vh',
    backgroundColor: theme.palette.background.paper,
    overflowY: 'scroll',
    scrollBehavior: 'smooth',
    marginLeft: '38px',
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginTop: 'auto',
  },
  messageText: {
    marginLeft: theme.spacing(2),
    height: 'auto',
    padding: '0 8px',
    display: 'inline-block',
    minWidth: '160px',

  },
  subtitleName: {
    display: 'block',
    borderBottom: `2px solid ${theme.palette.action.disabled}`,
  },
  chatInput: {
    width: '100%',
    maxWidth: '80vw',

  },
  chatInputBox: {
    display: 'flex',
    marginTop: theme.spacing(2),
    marginLeft: '36px',

  },
  loader: {
    margin: '30% 50% ',
  },

}));

const ChatPage = () => {
  const dispatch = useDispatch();
  const chatDetails = useSelector((state) => state.chatDetails);
  const { chat } = chatDetails;
  const chatName = useSelector((state) => state.currentChat);
  const classes = useStyles();
  const bottomRef = useRef();
  const [chatInputValue, setChatInputvalue] = useState('');
  const { currentChat } = chatName;

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      block: 'start',
    });
  };
  const [ch, setCh] = useState([]);

  useEffect(() => setCh(chat.filter((e) => e.to === currentChat)), [chat, currentChat]);

  useEffect(() => (ch.length > 0 ? scrollToBottom() : null), [ch, currentChat]);

  useEffect(() => {
    dispatch(getChatData());
    dispatch(setUserData());
  }, [dispatch, currentChat]);

  const handleChange = (e) => {
    setChatInputvalue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = { from: localStorage.getItem('chat').split(',')[1], to: currentChat, message: chatInputValue };
    setCh([...ch, newMessage]);

    const updateChat = [...chat, newMessage];
    dispatch(sendNewChatMessage(updateChat));
    setChatInputvalue('');
  };

  return (

    <Container>
      <Grid item xs={10} style={{ margin: '5em auto' }}>
        <Box className={classes.chat}>
          <Typography variant="h6" style={{ marginLeft: '40px', marginTop: '1em', marginBottom: '2em' }}>
            HEALTHY
            {' '}
            {currentChat.toUpperCase()}
            {' '}
            CHAT
          </Typography>
        </Box>
        {!(ch.length > 0) ? <CircularProgress className={classes.loader} />
          : (
            <>
              <Box className={classes.chatBox}>
                <div className="autoscroll-container">
                  {ch.length > 0 && ch.map((e) => (
                    <Box component="div" className={classes.message} key={`${e.message}.${e.from}.${e.to}`}>
                      <Avatar className={classes.avatar}>
                        {e.from.charAt(0)}
                      </Avatar>
                      <Chip
                        className={classes.messageText}
                        label={(
                          <Typography style={{ whiteSpace: 'normal' }}>
                            <Typography
                              component="span"
                              variant="button"
                              style={{ display: 'block' }}
                              className={classes.subtitleName}
                            >
                              {e.from}
                            </Typography>
                            {e.message}
                          </Typography>
                          )}
                      />
                    </Box>
                  ))}
                  <div ref={bottomRef} className="list-bottom" />
                </div>
              </Box>
              <Box>
                <form onSubmit={(e) => handleSubmit(e)} className={classes.chatInputBox}>
                  <TextField
                    id="outlined-basic"
                    label="New message"
                    variant="outlined"
                    value={chatInputValue}
                    onChange={(e) => handleChange(e)}
                    className={classes.chatInput}
                  />
                  <Button type="submit" variant="outlined" color="primary" style={{ display: 'block', margin: 'auto auto auto 2em', padding: '0.5em 1.5sem' }}>Send</Button>
                </form>
              </Box>
            </>
          )}
      </Grid>
    </Container>

  );
};

export default ChatPage;
