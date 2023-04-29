import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';
import {
  Box, Button, Card, Link,
  CardActions,
  CardContent,
  CardHeader,
  Divider, Container, Stack, TextField, Typography, Unstable_Grid2 as Grid
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import LoginService from 'src/services/LoginService';

//import {DatePicker} from '@mui/x-date-pickers/DatePicker'; 

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
  const currentdatetime = format(now, "yyyy-MM-dd HH:mm:ss");
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
        .required('User Name is required'),

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
        .string()
        .max(255)
        .required('dateOfJoining is required'),
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
        //  await auth.signUp(values.email, values.name, values.password);
        LoginService.register(values)
          .then(response => {
            alert(JSON.stringify(response));
            //setSubmitted(true);
            console.log(response.data);
            router.push('/');
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
                          href="/auth/login"
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
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik.values.dateOfJoining}
                              />


                              {/* role */}


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
                          {/* <DatePicker label="Date Of Joining"
          name="dateOfJoining"  
          // onChange={formik.handleChange}
          // value={formik.values.dateOfJoining}
          />
         */}

                        </Box>
                      </CardContent>
                      <Divider />
                      {formik.errors.submit && (
                        <Typography
                          color="error"
                          sx={{ mt: 3 }}
                          variant="body2"
                        >
                          {formik.errors.submit}
                        </Typography>
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
        </Container>
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
