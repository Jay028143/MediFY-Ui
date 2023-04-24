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
  Divider, Container, Stack, TextField, Typography
} from '@mui/material';
import StoreService from 'src/services/StoreService';

export const AddUpdateStore = (props) => {

  const {
    items,
    handleAddStore
  } = props;
  const buttonval=items.storeId>0?'Update':'Save';
  const now = new Date();
  const currentdatetime = format(now, "yyyy-MM-dd HH:mm:ss");
  const user=JSON.parse(localStorage.getItem('user'));
  const createdAt=items.storeId>0?items.createdAt:currentdatetime;
  const adminId=items.storeId>0?items.adminId :user.id;
  console.log("data.eee.." + JSON.stringify(items));
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      storeName: items.storeName || '',
      adminId:  adminId,
      storeId: items.storeId ||'0',
      address: items.address || '',
      postCode: items.postCode || '',
      mobileNumber:items.mobileNumber || '',
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
      address: Yup
        .string()
        .max(255)
        .required('Address is required'),
      postCode: Yup
        .string()
        .max(255)
        .required('Post Code is required'),
      mobileNumber: Yup
        .string()
        .max(255)
        .required('Mobile Number is required')
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
                      value={formik.values.storeName}
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
                    {buttonval}
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

AddUpdateStore.prototype = {
  items: PropTypes.array,
  handleAddStore:PropTypes.func
}