import React, { useEffect, useState } from 'react';
import { createStyles, Grid, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    margin: 'auto',
    alignContent: 'center',
  },
  data: {
    padding: theme.spacing(2),
    textAlign: 'center',
    border: '1px solid gray',
    margin: 'auto',
    height: '4em',
  },
  box: {
    marginTop: '5em',
  },
}));

const ProfileData = () => {
  const classes = useStyles();
  const profileData = useSelector((state) => state.userProfile.user);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setUserData(profileData);
  }, [profileData]);

  useEffect(() => {
    const user = localStorage.getItem('chat');
    const initialProfileData = user.split(',');
    setUserData(initialProfileData);
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.box}>
        <Grid item xs={10} className={classes.data}>
          Name:
          {' '}
          {userData[1] && userData[1] ? userData[1] : null}
        </Grid>
        <Grid item xs={10} className={classes.data}>
          Email:
          {' '}
          {userData[0] && userData[0] ? userData[0] : null}
        </Grid>
        <Grid item xs={10} className={classes.data}>
          Address:
          {' '}
          {userData[2] && userData[2] ? userData[2] : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileData;
