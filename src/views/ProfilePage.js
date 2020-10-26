import React from 'react';
import {
  createStyles, Grid, makeStyles, Typography,
} from '@material-ui/core';

import ProfileForm from '../components/ProfileForm';
import ProfileData from '../components/ProfileData';

const useStyles = makeStyles(() => createStyles({
  root: {
    marginLeft: '74px',
    width: 'calc(100vw - 80px)',
  },
  dataFields: {
    margin: '1em auto 0 auto',
  },
  title: {
    margin: '4em auto 1em auto',
  },
}));

const ProfilePage = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid className={classes.title} alignContent="center">
        <Typography variant="overline" style={{ fontSize: '2em', marginTop: '2em' }}>
          YOUR PROFILE
        </Typography>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={10} lg={6} className={classes.dataFields}>
          <ProfileData />
        </Grid>
        <Grid item xs={12} md={10} lg={6} className={classes.dataFields}>
          <ProfileForm />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
