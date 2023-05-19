import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';
import { useCallback, useMemo, useState, useEffect } from 'react';
import {
  Box, Button, Card, Link,
  CardActions,
  CardContent,
  CardHeader,
  Divider, Container, Stack, TextField, Typography, Unstable_Grid2 as Grid
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import LoginService from 'src/services/LoginService';

import 'react-datepicker/dist/react-datepicker.css';


const Page = () => {

  const genders = [
    {
      value: '-1',
      label: '--Select Gender--'
    },
    {
      value: 'Male',
      label: 'Male'
    },
    {
      value: 'Female',
      label: 'Female'
    }
  ];

  const now = new Date();
  const [isSecurity, setSecurity] = useState(false);
  const [securityAns, setSecurityAns] = useState('');
  const [popup, setPopup] = useState(false);
  const currentdatetime = format(now, "yyyy-MM-dd HH:mm:ss");
  const handleSecurityAnswer = (ans) => {

    setSecurityAns(ans);

  }
  const handleClose = () => {
    setPopup(false);

};
  const onSecurityAnsSubmit = () => {
    if (securityAns == "Bhagavad Gita") {
      setSecurity(true);
    }
    else {
      setPopup(true);
    }
  }
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      email: '',
      houseNo: '',
      username: '',
      password: '',
      streetName: '',
      state: '',
      country: '',
      city: '',
      postCode: '',
      email: '',
      mobileNumber: '',
      dateOfJoining: '',
      storeId: '-1',
      userId: '0',
      securityAns:'answer',
      createdAt: currentdatetime,
      updatedAt: currentdatetime,
      role: ['admin'],
      submit: null
    },
    response: {
      id: '',
      username: '',
      email: '',
      roles: '',
      storeId: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      firstName: Yup
        .string()
        .max(255)
        .required('First Name is required'),
        securityAns: Yup
        .string()
        .max(255)
        .required('Security Ans is Required'),
      middleName: Yup
        .string()
        .max(255)
        .required('Middle Name is required'),
      lastName: Yup
        .string()
        .max(255)
        .required('Last Name is required'),
      username: Yup
        .string()
        .max(255)
        .required('User Name is required')
        .matches(

          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
          "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number")
      ,

      houseNo: Yup
        .string()
        .max(255)
        .required('House No is required'),
      streetName: Yup
        .string()
        .max(255)
        .required('Street Name is required'),
      state: Yup
        .string()
        .max(255)
        .required('State is required'),
      country: Yup
        .string()
        .max(255)
        .required('Country is required'),
      city: Yup
        .string()
        .max(255)
        .required('City is required'),
      postCode: Yup
        .string()
        .max(255)
        .required('Post Code is required'),
      dateOfJoining: Yup
        .date()
        .max(new Date(), 'You can not choose future date')
        .required('Date Of Joiming Required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),
      mobileNumber: Yup
        .string()
        .max(255)
        .required('Mobile Number is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        LoginService.register(values)
          .then(response => {
            if (response.status == 200) {
              router.push('/');
            }
            else if (response.status == 201) {
              helpers.setStatus({ success: false });
              helpers.setErrors({ submit: response.data.message });
            }
          })
          .catch(e => {
            console.log(e);
          });

      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Head  >
        <title>
          Register | MediFY
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        {!isSecurity ? <>
          <Card>
            <CardHeader

              title="Register"

            />

            <Typography
              color="text.secondary"
              variant="body2"
            >
              &nbsp;
              &nbsp;
              &nbsp;
              Already have an account?
              &nbsp;
              <Link
                component={NextLink}
                href="/medify/login"
                underline="hover"
                variant="subtitle2"
              >
                Log in
              </Link>
            </Typography>
            <Divider />

            <Grid
              xs={6}
              md={6}
              ml={10}
              sx={{ justifyContent: 'center' }}
            >

            </Grid>

            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ m: -1.5 }}>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    xs={24}
                    md={6}
                  >

                    <CardHeader
                      sx={{ justifyContent: 'center' }}
                      title="Security Question"
                    />


                    <TextField
                     // error={!!(formik.touched.securityAns && formik.errors.securityAns)}
                      fullWidth
                      sx={{ justifyContent: 'center' }}

                      label="What is the name of your favorite book?"
                      //name="securityAns"
                      onBlur={formik.handleBlur}
                      onChange={(e) => { handleSecurityAnswer(e.target.value) }}

                    />
                    <Dialog
                                                            open={popup}
                                                            onClose={handleClose}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                        >
                                                            <DialogTitle id="ageilligible">
                                                                {'Security Check'}
                                                            </DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                    {'Your Anser is wrong'}
                                                                </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>

                                                                <Button onClick={handleClose} autoFocus>
                                                                    OK
                                                                </Button>
                                                            </DialogActions>
                                                        </Dialog>

                    <CardActions sx={{ justifyContent: 'left' }}>
                      <Button
                        size="large"
                        sx={{ mt: 3 }}
                        type="submit"
                        variant="contained"
                        onClick={onSecurityAnsSubmit}
                      >
                        Submit
                      </Button>
                    </CardActions>

                  </Grid></Grid></Box></CardContent>
          </Card>

        </> :
          <Container maxWidth="xl" >
            <Stack spacing={3}  >

              <div>

                <Grid
                  container
                  spacing={3}
                  sx={{ justifyContent: 'center' }}
                >
                  <Grid
                    xs={12}
                    md={6}
                    lg={8}
                  >

                    <form

                      noValidate
                      onSubmit={formik.handleSubmit}
                    >
                      <Card>
                        <CardHeader

                          title="Register"

                        />

                        <Typography
                          color="text.secondary"
                          variant="body2"
                        >
                          &nbsp;
                          &nbsp;
                          &nbsp;
                          Already have an account?
                          &nbsp;
                          <Link
                            component={NextLink}
                            href="/medify/login"
                            underline="hover"
                            variant="subtitle2"
                          >
                            Log in
                          </Link>
                        </Typography>
                        <Divider />
                        <Grid
                          xs={6}
                          md={6}
                          ml={10}
                        >

                        </Grid>

                        <CardContent sx={{ pt: 0 }}>
                          <Box sx={{ m: -1.5 }}>
                            <Grid
                              container
                              spacing={3}
                            >
                              <Grid
                                xs={12}
                                md={6}
                              >


                                <TextField
                                  error={!!(formik.touched.firstName && formik.errors.firstName)}
                                  fullWidth
                                  helperText={formik.touched.firstName && formik.errors.firstName}
                                  label="First Name"
                                  name="firstName"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  value={formik.values.firstName}
                                />

                                <TextField
                                  sx={{ marginTop: 2 }}
                                  error={!!(formik.touched.lastName && formik.errors.lastName)}
                                  fullWidth
                                  helperText={formik.touched.lastName && formik.errors.lastName}
                                  label="Last Name"
                                  name="lastName"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  value={formik.values.lastName}
                                />

                                <TextField
                                  sx={{ marginTop: 2 }}
                                  error={!!(formik.touched.username && formik.errors.username)}
                                  fullWidth
                                  helperText={formik.touched.username && formik.errors.username}
                                  label="User Name"
                                  name="username"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  value={formik.values.username}
                                />

                                <TextField
                                  sx={{ marginTop: 2 }}

                                  fullWidth

                                  label="Gender"
                                  name="gender"
                                  onClick={(e) => formik.setFieldValue('gender', e.target.value)}
                                  select
                                  SelectProps={{ native: true }}

                                >
                                  {genders.map((option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))}

                                </TextField>


                                <TextField
                                  sx={{ marginTop: 2 }}
                                  error={!!(formik.touched.houseNo && formik.errors.houseNo)}
                                  fullWidth
                                  helperText={formik.touched.houseNo && formik.errors.houseNo}
                                  label="House No"
                                  type="number"
                                  name="houseNo"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  value={formik.values.houseNo}
                                />

                                <TextField
                                  sx={{ marginTop: 2 }}
                                  error={!!(formik.touched.city && formik.errors.city)}
                                  fullWidth
                                  helperText={formik.touched.city && formik.errors.city}
                                  label="City"
                                  name="city"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  value={formik.values.city}
                                />

                                <TextField
                                  sx={{ marginTop: 2 }}
                                  error={!!(formik.touched.country && formik.errors.country)}
                                  fullWidth
                                  helperText={formik.touched.country && formik.errors.country}
                                  label="Country"
                                  name="country"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  value={formik.values.country}
                                />
                                <TextField
                                  sx={{ marginTop: 2 }}
                                  error={!!(formik.touched.mobileNumber && formik.errors.mobileNumber)}
                                  fullWidth
                                  helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                                  label="Mobile Number"
                                  name="mobileNumber"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  value={formik.values.mobileNumber}
                                  type="number"
                                />



                              </Grid>
                              <Grid
                                xs={12}
                                md={6}
                              >
                                <TextField
                                  error={!!(formik.touched.middleName && formik.errors.middleName)}
                                  fullWidth
                                  helperText={formik.touched.middleName && formik.errors.middleName}
                                  label="Middle Name"
                                  name="middleName"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  value={formik.values.middleName}
                                />

                                <TextField
                                  sx={{ marginTop: 2 }}
                                  error={!!(formik.touched.email && formik.errors.email)}
                                  fullWidth
                                  helperText={formik.touched.email && formik.errors.email}
                                  label="Email Address"
                                  name="email"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  type="email"
                                  value={formik.values.email}
                                />

                                <TextField
                                  sx={{ marginTop: 2 }}
                                  error={!!(formik.touched.password && formik.errors.password)}
                                  fullWidth
                                  helperText={formik.touched.password && formik.errors.password}
                                  label="Password"
                                  name="password"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  type="password"
                                  value={formik.values.password}
                                />


                                <TextField
                                  sx={{ marginTop: 2 }}

                                  error={!!(formik.touched.dateOfJoining && formik.errors.dateOfJoining)}
                                  fullWidth
                                  helperText={formik.touched.dateOfJoining && formik.errors.dateOfJoining}
                                  label="Date Of Joining"
                                  name="dateOfJoining"
                                  //label="Date Of Joining"
                                  type={'date'}
                                  value={formik.values.dateOfJoining}
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  InputLabelProps={{ shrink: true }}
                                >


                                </TextField>

                                <TextField
                                  sx={{ marginTop: 2 }}
                                  error={!!(formik.touched.streetName && formik.errors.streetName)}
                                  fullWidth
                                  helperText={formik.touched.streetName && formik.errors.streetName}
                                  label="Street Name"
                                  name="streetName"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}

                                  value={formik.values.streetName}
                                />
                                <TextField
                                  sx={{ marginTop: 2 }}
                                  error={!!(formik.touched.state && formik.errors.state)}
                                  fullWidth
                                  helperText={formik.touched.state && formik.errors.state}
                                  label="State"
                                  name="state"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  value={formik.values.state}
                                />

                                <TextField
                                  sx={{ marginTop: 2 }}
                                  error={!!(formik.touched.postCode && formik.errors.postCode)}
                                  fullWidth
                                  helperText={formik.touched.postCode && formik.errors.postCode}
                                  label="Post Code"
                                  name="postCode"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  value={formik.values.postCode}
                                />



                              </Grid>
                            </Grid>


                          </Box>
                        </CardContent>
                        <Divider />
                        {formik.errors.submit && (<>
                          <CardActions sx={{ justifyContent: 'center' }}>
                            <Typography
                              color="error"
                              sx={{ mt: 3 }}
                              variant="body2"
                            >
                              {formik.errors.submit}
                            </Typography></CardActions></>
                        )}
                        <CardActions sx={{ justifyContent: 'center' }}>
                          <Button
                            size="large"
                            sx={{ mt: 3 }}
                            type="submit"
                            variant="contained"
                          >
                            Register
                          </Button>
                        </CardActions>
                      </Card>
                    </form>
                  </Grid>
                </Grid>
              </div>
            </Stack>
          </Container>}
      </Box>
    </>

  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
