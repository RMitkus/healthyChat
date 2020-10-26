import React, { useEffect, useState } from 'react';
import {
  Button, createStyles, Grid, makeStyles, TextField,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { setUserData, setUserProfileData } from '../actions/userDataActions';

const useStyles = makeStyles(() => createStyles({
  root: {
    maxWidth: '450px',
    display: 'block',
    margin: 'auto',

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
    width: '80%',
    paddingTop: '10em',
    margin: '40px  auto',
    '& img': { maxWidth: '100%' },
  },
}));

const formStatusProps = {
  success: {
    message: 'Signed up successfully.',
    type: 'success',
  },
  error: {
    message: 'Something went wrong. Please try again.',
    type: 'error',
  },
};

const LoginPage = ({ history }) => {
  const classes = useStyles();
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState({
    message: '',
    type: '',
  });

  const dispatch = useDispatch();

  const loginToChat = (data, resetForm) => {
    const user = [data.email, data.fullName, 'Your address'];

    localStorage.setItem('chat', user);
    history.push('/chat');
    setDisplayFormStatus(true);
    dispatch(setUserData(user));
    dispatch(setUserProfileData(user));
    if (data) {
      setFormStatus(formStatusProps.success);
      resetForm({});
    }
  };
  useEffect(() => {
    const user = localStorage.getItem('chat');
    return !(user === null) ? history.push('/chat') : null;
  }, [history]);

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <img src="images/kilologo.svg" alt="kilo_logo" />
      </div>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            loginToChat(values, actions.resetForm);
            // actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required('Enter valid email'),
          fullName: Yup.string().required('Please enter your name'),
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
              <h1 className={classes.title}>Login in to healthy chat!</h1>
              <Grid container justify="space-around" direction="row">
                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
                  <TextField
                    name="fullName"
                    id="fullName"
                    label="Your name"
                    value={values.fullName}
                    type="text"
                    required
                    helperText={errors.fullName && touched.fullName ? errors.fullName : 'Enter your name.'}
                    error={!!(errors.fullName && touched.fullName)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
                  <TextField
                    name="email"
                    id="email"
                    label="Email"
                    value={values.email}
                    type="email"
                    required
                    helperText={errors.email && touched.email ? errors.email : 'Enter email'}
                    error={!!(errors.email && touched.email)}
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

export default LoginPage;
