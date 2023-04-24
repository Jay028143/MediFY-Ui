import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import LoginService from 'src/services/LoginService';
//import {DatePicker} from '@mui/x-date-pickers/DatePicker'; 

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      storeId:'0',
      username: '',
      password: '',
      niNumber: '',
      dateOfBirth: '',
      role:['admin'],
      dateOfJoining: '',
      address: '',
      postCode: '',
      mobileNumber: '',
      createdAt:'2023-04-17',
      updatedAt:'2013-04-17',
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
      lastName: Yup
        .string()
        .max(255)
        .required('Last Name is required'),
      username: Yup
        .string()
        .max(255)
        .required('User Name is required'),
      niNumber: Yup
        .string()
        .max(255)
        .required('NI Number is required'),
      address: Yup
        .string()
        .max(255)
        .required('Address is required'),
      postCode: Yup
        .string()
        .max(255)
        .required('Post Code is required'),
      dateOfBirth: Yup
        .string()
        .max(255)
        .required('Date Of Birth is required'),
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
      <Head>
        <title>
          Register | MediFY
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Register
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
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
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
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
                  error={!!(formik.touched.lastName && formik.errors.lastName)}
                  fullWidth
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  label="Last Name"
                  name="lastName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />

                {/* <DatePicker label="Date Of Birth"
                  name="dateOfBirth" 
                  // onChange={formik.handleChange}
                  // value={formik.values.dateOfBirth}
                  /> */}

                <TextField
                  error={!!(formik.touched.dateOfBirth && formik.errors.dateOfBirth)}
                  fullWidth
                  helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                  label="Date Of Birth"
                  name="dateOfBirth"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.dateOfBirth}
                />
                <TextField
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
                  error={!!(formik.touched.address && formik.errors.address)}
                  fullWidth
                  helperText={formik.touched.address && formik.errors.address}
                  label="Address"
                  name="address"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                <TextField
                  error={!!(formik.touched.postCode && formik.errors.postCode)}
                  fullWidth
                  helperText={formik.touched.postCode && formik.errors.postCode}
                  label="Post Code"
                  name="postCode"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.postCode}
                />
                 <TextField
                  error={!!(formik.touched.mobileNumber && formik.errors.mobileNumber)}
                  fullWidth
                  helperText={formik.touched.pomobileNumberstCode && formik.errors.mobileNumber}
                  label="Mobile Number"
                  name="mobileNumber"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.mobileNumber}
                />
                <TextField
                  error={!!(formik.touched.niNumber && formik.errors.niNumber)}
                  fullWidth
                  helperText={formik.touched.niNumber && formik.errors.niNumber}
                  label="NI Number"
                  name="niNumber"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.niNumber}
                />
                {/* <DatePicker label="Date Of Joining"
                  name="dateOfJoining"  
                  // onChange={formik.handleChange}
                  // value={formik.values.dateOfJoining}
                  />
                 */}
                <TextField
                  error={!!(formik.touched.dateOfJoining && formik.errors.dateOfJoining)}
                  fullWidth
                  helperText={formik.touched.dateOfJoining && formik.errors.dateOfJoining}
                  label="Date Of Joining"
                  name="dateOfJoining"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.dateOfJoining}
                />

              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Register
              </Button>
            </form>
          </div>
        </Box>
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
