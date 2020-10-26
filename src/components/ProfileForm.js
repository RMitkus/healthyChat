import React, { useState } from 'react';
import {
  Button, createStyles, Grid, makeStyles, TextField,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfileData } from '../actions/userDataActions';

const useStyles = makeStyles(() => createStyles({
  root: {

    marginTop: '0',
  },
  textField: {
    '& > *': {
      width: '100%',
    },
  },
  submitButton: {
    marginTop: '24px',
  },
  title: { textAlign: 'center', fontSize: '1.2em' },
  successMessage: { color: 'green' },
  errorMessage: { color: 'red' },
  logo: {
    width: '100%',
    paddingTop: '10em',
    '& img': { maxWidth: '100%' },
  },
}));

const formStatusProps = {
  success: {
    message: 'Profile updated successfully.',
    type: 'success',
  },
  error: {
    message: 'Something went wrong. Please try again.',
    type: 'error',
  },
};

const ProfileForm = () => {
  const classes = useStyles();
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState({
    message: '',
    type: '',
  });
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);

  // Save/override profile data
  const checkUpdateProfileData = (user) => {
    for (let i = 0; i < userProfile.user.length; i++) {
      if (user[i] === '') {
        user[i] = userProfile.user[i];
      }
    }
  };

  const updateUserProfile = (data, resetForm) => {
    const user = [data.email, data.fullName, data.address];

    checkUpdateProfileData(user);

    setDisplayFormStatus(true);

    dispatch(setUserProfileData(user));
    if (data) {
      setFormStatus(formStatusProps.success);
      resetForm({});
    } else {
      setFormStatus(formStatusProps.error);
    }
  };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          address: '',
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            updateUserProfile(values, actions.resetForm);
            // actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email(),
          fullName: Yup.string().min(3).max(20),
          address: Yup.string().min(4).max(50),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
          } = props;
          return (
            <Form>
              <h1 className={classes.title}>Update your profile data</h1>
              <Grid container justify="space-around" direction="row">

                <Grid item xs={10} className={classes.textField}>
                  <TextField
                    name="fullName"
                    id="fullName"
                    label="Your name"
                    value={values.fullName}
                    type="text"
                    helperText={errors.fullName && touched.fullName ? errors.fullName : 'Enter your name.'}
                    error={!!(errors.fullName && touched.fullName)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={10} className={classes.textField}>
                  <TextField
                    name="email"
                    id="email"
                    label="Email"
                    value={values.email}
                    type="email"
                    helperText={errors.email && touched.email ? errors.email : 'Enter email'}
                    error={!!(errors.email && touched.email)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={10} className={classes.textField}>
                  <TextField
                    name="address"
                    id="address"
                    label="Address"
                    value={values.address}
                    type="text"
                    helperText={errors.address && touched.address ? errors.address : 'Enter address'}
                    error={!!(errors.address && touched.address)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.submitButton}>
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Entering chat..' : 'Enter'}
                  </Button>
                  {displayFormStatus && (
                    <div className="formStatus">
                      {formStatus.type === 'error' ? (
                        <p className={classes.errorMessage}>
                          {formStatus.message}
                        </p>
                      ) : formStatus.type === 'success' ? (
                        <p className={classes.successMessage}>
                          {formStatus.message}
                        </p>
                      ) : null}
                    </div>
                  )}
                </Grid>
              </Grid>

            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ProfileForm;
