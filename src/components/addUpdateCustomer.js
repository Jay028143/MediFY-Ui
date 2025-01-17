import Head from 'next/head';
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
import CustomerService from 'src/services/Customerservice';

export const AddUpdateCustomer = (props) => {

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



    const {
        customer,
        handleAddCustomer
    } = props;
    const buttonval = customer.customerId > 0 ? 'Update' : 'Save';
    const now = new Date();
    const currentdatetime = format(now, "yyyy-MM-dd HH:mm:ss");
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = customer.customerId > 0 ? customer.userId : user.id;
    const defaultStoreId = localStorage.getItem('defaultStoreId');
    const storeId = customer.customerId > 0 ? customer.storeId : defaultStoreId;
    const createdAt = customer.customerId > 0 ? customer.createdAt : currentdatetime;
    const defaultStoreName = localStorage.getItem('defaultStoreName');

    const formik = useFormik({
        initialValues: {
            customerId: customer.customerId || '',
            firstName: customer.firstName || '',
            middleName: customer.middleName || '',
            disease:customer.disease || '',
            lastName: customer.lastName || '',
            gender: customer.gender || '',
            storeName: defaultStoreName,
            houseNo: customer.houseNo || '',
            streetName: customer.streetName || '',
            state: customer.state || '',
            country: customer.country || '',
            city: customer.city || '',
            postCode: customer.postCode || '',

            mobileNumber: customer.mobileNumber || '',
            dateOfBirth: customer.dateOfBirth || '',
            storeId: storeId || '0',
            userId: userId || '0',
            createdAt: createdAt,
            updatedAt: currentdatetime,
            submit: null
        },
        response: {
            message: '',
        },
        validationSchema: Yup.object({

            firstName: Yup
                .string()
                .max(255)
                .required('First Name is required'),
            middleName: Yup
                .string()
                .max(255)
                .required('Middle Name is required'),
                disease:Yup
                .string()
                .max(255)
                .required('Disease required'),
            lastName: Yup
                .string()
                .max(255)
                .required('last Name is required'),
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
            mobileNumber: Yup
                .string()
                .max(255)
                .required('Mobile Number is required'),

            dateOfBirth: Yup
                .date()
                .max(new Date(), 'You can not choose future date')
                .required('Date Of Birth Required'),
        }),
        onSubmit: async (values, helpers) => {
            try {
                CustomerService.create(values)
                    .then(response => {
                        handleAddCustomer(false);
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
                    Add Customer | MediFY
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
                                                subheader="Add Customer"
                                                title="Customers"
                                            />
                                            <Divider />
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
                                                                error={!!(formik.touched.gender && formik.errors.gender)}
                                                                fullWidth
                                                                helperText={formik.touched.gender && formik.errors.gender}
                                                                label="Gender"
                                                                name="gender"
                                                                onBlur={formik.handleBlur}
                                                                onChange={formik.handleChange}
                                                                select
                                                                SelectProps={{ native: true }}
                                                                value={formik.values.gender}
                                                                InputLabelProps={{ shrink: true }}
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
                                                                error={!!(formik.touched.disease && formik.errors.disease)}
                                                                fullWidth
                                                                helperText={formik.touched.disease && formik.errors.disease}
                                                                label="Disease"
                                                                name="disease"
                                                                onBlur={formik.handleBlur}
                                                                onChange={formik.handleChange}
                                                                value={formik.values.disease}
                                                                
                                                            />


                                                            <TextField
                                                                sx={{ marginTop: 2 }}
                                                                error={!!(formik.touched.dateOfBirth && formik.errors.dateOfBirth)}
                                                                fullWidth
                                                                helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                                                                label="Date Of Birth"
                                                                name="dateOfBirth"
                                                                onBlur={formik.handleBlur}
                                                                onChange={formik.handleChange}
                                                                type={'date'}
                                                                value={formik.values.dateOfBirth}
                                                                InputLabelProps={{ shrink: true }}
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

AddUpdateCustomer.prototype = {
    customer: PropTypes.array,
    handleAddCustomer: PropTypes.func
}