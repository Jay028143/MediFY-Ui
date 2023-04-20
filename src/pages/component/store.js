import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import StoreService from 'src/services/Storeservice';

const Page = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      storeName: '',
      adminId: '',
      storeId:'0',
      address: '',
      postCode: '',
      createdAt:'2023-04-17',
      updatedAt:'2013-04-17',
      submit: null
    },
    response: {
     message:'',
    },
    validationSchema: Yup.object({
    
      storeName: Yup
        .string()
        .max(255)
        .required('Store Name is required'),
      address: Yup
        .string()
        .max(255)
        .required('Address is required'),
      postCode: Yup
        .string()
        .max(255)
        .required('Post Code is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        StoreService.create(values)
          .then(response => {
            alert(JSON.stringify(response));
            setSubmitted(true);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });


        router.push('/');
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
          Add Store | MediFY
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
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.storeName && formik.errors.storeName)}
                  fullWidth
                  helperText={formik.touched.storeName && formik.errors.storeName}
                  label="Store Name"
                  name="storeName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
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
                {/* <DatePicker label="Date Of Joining"
                  name="dateOfJoining"  
                  // onChange={formik.handleChange}
                  // value={formik.values.dateOfJoining}
                  />
                 */}

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
                Save
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
