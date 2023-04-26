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
    Divider, Container, Stack, TextField, Typography, Grid
} from '@mui/material';
import CustomerService from 'src/services/CustomerService';

export const AddUpdateCustomer = (props) => {

    const genders = [
        {
            value: 'male',
            label: 'Male'
        },
        {
            value: '',
            label: 'Female'
        }
    ];

    const {
        customer,
        handleAddCustomer
    } = props;
    const buttonval = customer.storeId > 0 ? 'Update' : 'Save';
    const now = new Date();
    const currentdatetime = format(now, "yyyy-MM-dd HH:mm:ss");
    const user = JSON.parse(localStorage.getItem('user'));
    const createdAt = customer.customerId > 0 ? customer.createdAt : currentdatetime;
    const userId = customer.customerId > 0 ? customer.userId : user.id;
    const storeId = customer.customerId > 0 ? customer.storeId : user.storeId;
    console.log("data.eee.." + JSON.stringify(customer));
    const formik = useFormik({
        initialValues: {
            customerId: customer.customerId || '',
            firstName: customer.firstName || '',
            middleName: customer.middleName || '',
            lastName: customer.lastName || '',
            gender: customer.gender || '',
            email: customer.email || '',
            houseNo: customer.houseNo || '',
            streetName: customer.streetName || '',
            state: customer.state || '',
            country: customer.country || '',
            city: customer.city || '',
            postCode: customer.postCode || '',
            nhsNumber: customer.nhsNumber || '',
            email: customer.email || '',
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
            nhsNumber: Yup
                .string()
                .max(255)
                .required('NHS Number is required'),
            email: Yup
                .string()
                .max(255)
                .required('Email is required'),
            mobileNumber: Yup
                .string()
                .max(255)
                .required('Mobile Number is required'),
            dateOfBirth: Yup
                .string()
                .max(255)
                .required('Date Of Birth is required'),
        }),
        onSubmit: async (values, helpers) => {
            try {
                CustomerService.create(values)
                    .then(response => {
                        alert(JSON.stringify(response));
                        //auth.skip();
                        //router.push('/stores');
                        //setSubmitted(true);
                        handleAddCustomer(false);
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
                            <Typography variant="h4">
                                Customers
                            </Typography>
                        </div>
                        <div>
                            <Grid
                                container
                                spacing={3}
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
                                                // subheader="Add Customer"
                                                title="Add Customer"
                                            />
                                            <Divider />
                                            <CardContent sx={{ pt: 0 }}>
                                                <Box sx={{ m: 10}}>
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

                                                            {/* <DatePicker label="Date Of Birth"
                  name="dateOfBirth" 
                  // onChange={formik.handleChange}
                  // value={formik.values.dateOfBirth}
                  
                  /> */}

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

                                                            <TextField
                                                                sx={{ marginTop: 2 }}
                                                                error={!!(formik.touched.nhsNumber && formik.errors.nhsNumber)}
                                                                fullWidth
                                                                helperText={formik.touched.nhsNumber && formik.errors.nhsNumber}
                                                                label="NHS Number"
                                                                name="nhsNumber"
                                                                onBlur={formik.handleBlur}
                                                                onChange={formik.handleChange}
                                                                value={formik.values.nhsNumber}
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