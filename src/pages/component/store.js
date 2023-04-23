import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box, Button, Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider, Container, Stack, TextField, Typography
} from '@mui/material';
import StoreService from 'src/services/StoreService';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const Page = () => {


  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      storeName: '',
      adminId: '',
      storeId: '0',
      address: '',
      postCode: '',
      createdAt: '2023-04-17',
      updatedAt: '2013-04-17',
      submit: null
    },
    response: {
      message: '',
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
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >

        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4">
              Stores
            </Typography>
            <form

              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Card>
                <CardHeader
                 // subheader="Add Store"
                  title="Add Store"
                />
                <Divider />
                <CardContent>
                  <Stack spacing={3}
                    sx={{ maxWidth: 400 }}
                  >
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
                <CardActions sx={{ justifyContent: 'flex-start' }}>
                  <Button
                    size="large"
                    sx={{ mt: 3 }}
                    type="submit"
                    variant="contained"
                  >
                    Save
                  </Button>
                </CardActions>
              </Card>
            </form>

          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
