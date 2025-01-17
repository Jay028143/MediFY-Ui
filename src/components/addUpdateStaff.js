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
import LoginService from 'src/services/LoginService';
import UserService from 'src/services/UserService';

export const AddUpdateStaff = (props) => {


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




    const roles = [
        {
            value: 'Select Role',
            label: '--Select Role--'
        },
        {
            value: 'manager',
            label: 'Manager'
        },
        {
            value: 'staff',
            label: 'Staff'
        }
    ];

    const {
        staff,
        handleAddStaff,
    } = props;
    console.log(staff);
    const buttonval = staff.userId > 0 ? 'Update' : 'Save';
    const now = new Date();
    const currentdatetime = format(now, "yyyy-MM-dd HH:mm:ss");
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = staff.userId > 0 ? staff.userId : user.id;
    const createdAt = staff.userId > 0 ? staff.createdAt : currentdatetime;
    const defaultStoreId = localStorage.getItem('defaultStoreId');
    const disabled= staff.userId > 0?true:false;
    
    const formik = useFormik({
        initialValues: {
            firstName: staff.firstName || '',
            middleName: staff.middleName || '',
            lastName: staff.lastName || '',
            gender: staff.gender,
            email: staff.email || '',
            houseNo: staff.houseNo || '',
            username: staff.userName || '',
            password: staff.password,
            streetName: staff.streetName || '',
            state: staff.state || '',
            country: staff.country || '',
            city: staff.city || '',
            postCode: staff.postCode || '',
            email: staff.email || '',
            mobileNumber: staff.mobileNumber || '',
            dateOfJoining: staff.dateOfJoining || '',
            storeId: staff.storeId || defaultStoreId,
            userId: userId || '0',
            createdAt: createdAt,
            updatedAt: currentdatetime,
            role:  '',
            submit: null
        },
        response: {
            message: '',
        },
        validationSchema: Yup.object({


            username: Yup
                .string()
                .max(255)
                .required('User Name is required')
                .matches(
                   
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
                    "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number")      
                ,


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
            email: Yup
                .string()
                .max(255)
                .required('Email is required'),
            mobileNumber: Yup
                .string()
                .max(255)
                .required('Mobile Number is required'),
            dateOfJoining:  Yup
            .date()
            .max(new Date(),'You can not choose future date')
            .required('Date Of Joiming Required'),
            storeId: Yup
                .string()
                .max(255)
                .required('Please Select the Store required'),
        }),
        onSubmit: async (values, helpers) => {
            if (buttonval == "Save") {
                try {
                    const clonedObj = Object.assign({}, values);
                    const targetKey = clonedObj['username'];   
                    clonedObj['password'] = targetKey;
                    values = clonedObj;
                    LoginService.register(values)
                        .then(response => {
                            if(response.status==200){
                                handleAddStaff(false);
                              }
                              else if(response.status==201){
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
            else {
                try {

                    const clonedObj = Object.assign({}, values);
                    const targetKey = clonedObj['username'];
                    delete clonedObj['username'];
                    clonedObj['userName'] = targetKey;
                    values = clonedObj;
                    UserService.create(values)
                        .then(response => {
                            handleAddStaff(false);
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

        }
    });

    return (
        <>
            <Head  >
                <title>
                    Add Staff | MediFY
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
                                                subheader="Add Staff"
                                                title="Staffs"
                                            />
                                            <Divider />
                                            <Grid
                                                xs={6}
                                                md={6}
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
                                                                disabled={disabled}
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
                                                                disabled={disabled}
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
                                                            />
                                                          


                                                            <TextField
                                                                sx={{ marginTop: 2 }}
                                                                // error={!!(formik.touched.gender && formik.errors.gender)}
                                                                fullWidth
                                                                // helperText={formik.touched.gender && formik.errors.gender}
                                                                label="Role"
                                                                name="role"
                                                                // onBlur={formik.handleBlur}
                                                                //onChange={formik.handleChange}
                                                                value={formik.values.role}
                                                                
                                                                onClick={(e) => formik.setFieldValue('role', [e.target.value])}
                                                                select
                                                                SelectProps={{ native: true }}

                                                            >
                                                                {roles.map((option) => (
                                                                    <option
                                                                        key={option.value}
                                                                        value={option.value}

                                                                    >
                                                                        {option.label}
                                                                    </option>
                                                                ))}
                                                            </TextField>
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
                                                    

                                                </Box>
                                            </CardContent>
                                            <Divider />
                                            {formik.errors.submit && (<><CardActions sx={{ justifyContent: 'center' }}>
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

AddUpdateStaff.prototype = {
    staff: PropTypes.array,
    handleAddStaff: PropTypes.func,
}