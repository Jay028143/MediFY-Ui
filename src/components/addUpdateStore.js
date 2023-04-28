import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Box, Button, Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider, Container, Stack, TextField, Typography, Unstable_Grid2 as Grid
} from '@mui/material';
import StoreService from 'src/services/Storeservice';

export const AddUpdateStore = (props) => {

  const {
    store,
    handleAddStore
  } = props;
  const buttonval = store.storeId > 0 ? 'Update' : 'Save';
  const now = new Date();
  const currentdatetime = format(now, "yyyy-MM-dd HH:mm:ss");
  const user = JSON.parse(localStorage.getItem('user'));
  const createdAt = store.storeId > 0 ? store.createdAt : currentdatetime;
  const adminId = store.storeId > 0 ? store.adminId : user.id;
  console.log("data.eee.." + JSON.stringify(store));
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      storeName: store.storeName || '',
      adminId: adminId,
      storeId: store.storeId || '0',
      address: store.address || '',
      postCode: store.postCode || '',
      mobileNumber: store.mobileNumber || '',
      houseNo: store.houseNo || '',
      streetName: store.streetName || '',
      state: store.state || '',
      country: store.country || '',
      city: store.city || '',
      createdAt: createdAt,
      updatedAt: currentdatetime,
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
      postCode: Yup
        .string()
        .max(255)
        .required('Post Code is required'),
      mobileNumber: Yup
        .string()
        .max(255)
        .required('Mobile Number is required'),
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
    }),
    onSubmit: async (values, helpers) => {
      try {
        StoreService.create(values)
          .then(response => {
            alert(JSON.stringify(response));
            //auth.skip();
            //router.push('/stores');
            //setSubmitted(true);
            handleAddStore(false);
            console.log(response.data);
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
                         subheader="Add Store"
                        title="Stores"
                      />
                      <Divider />
                      <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: 2.5 }}>
                          <Grid
                            container
                            spacing={3}
                          >
                            <Grid
                              xs={12}
                              md={6}
                            >
                              <TextField
                                error={!!(formik.touched.storeName && formik.errors.storeName)}
                                fullWidth
                                helperText={formik.touched.storeName && formik.errors.storeName}
                                label="Store Name"
                                name="storeName"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.storeName}
                              />
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

                            </Grid>
                            <Grid
                              xs={12}
                              md={6}
                            >
                              <TextField

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
                          {buttonval}
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

AddUpdateStore.prototype = {
  store: PropTypes.array,
  handleAddStore: PropTypes.func
}