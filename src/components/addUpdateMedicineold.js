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
import MedicineService from 'src/services/MedicineService';

export const AddUpdateMedicine = (props) => {

    const {
        medicine,
        handleAddMedicine
    } = props;
    const buttonval = medicine.storeId > 0 ? 'Update' : 'Save';
    const now = new Date();
    const currentdatetime = format(now, "yyyy-MM-dd HH:mm:ss");
    const user = JSON.parse(localStorage.getItem('user'));
    const createdAt = medicine.medicineId > 0 ? medicine.createdAt : currentdatetime;
    const userId = medicine.medicineId > 0 ? medicine.userId : user.id;
    const storeId = medicine.medicineId > 0 ? medicine.storeId : user.storeId;
    console.log("data.eee.." + JSON.stringify(medicine));
    const formik = useFormik({
        initialValues: {
            medicineId: medicine.medicineId || '',
            medicineCode: medicine.medicineCode || '',
            medicineName: medicine.medicineName || '',
            medicinePrice: medicine.medicinePrice || '',
            description: medicine.description || '',
            idCheck: medicine.idCheck || '',
            availableStock: medicine.availableStock || '',
            totalStock: medicine.totalStock || '',
            expiryDate: medicine.expiryDate || '',
            userId: userId || '0',
            createdAt: createdAt,
            updatedAt: currentdatetime,
            quantity:medicine.quantity || '',
            submit: null
        },
        response: {
            message: '',
        },
        validationSchema: Yup.object({

            medicineName: Yup
                .string()
                .max(255)
                .required('Medicine Name is required'),
              medicineCode: Yup
                .string()
                .max(255)
                .required('Medicine Code is required'),
                medicinePrice: Yup
                .string()
                .max(255)
                .required('Medicine Price is required'),
                description: Yup
                .string()
                .max(255)
                .required('Description is required'),
                expiryDate: Yup
                .string()
                .max(255)
                .required('Expiry Date is required'),
                quantity: Yup
                .string()
                .max(255)
                .required('Quantity is required')
        }),
        onSubmit: async (values, helpers) => {
            try {
                MedicineService.create(values)
                    .then(response => {
                        alert(JSON.stringify(response));
                        //auth.skip();
                        //router.push('/stores');
                        //setSubmitted(true);
                        handleAddMedicine(false);
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
                    Add Medicine | MediFY
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
                                    // subheader="Add Medicine"
                                    title="Add Medicine"
                                />
                                <Divider />
                                <CardContent>
                                    <Stack spacing={3}
                                        sx={{ maxWidth: 400 }}
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
                                            error={!!(formik.touched.gender && formik.errors.gender)}
                                            fullWidth
                                            helperText={formik.touched.gender && formik.errors.gender}
                                            label="Gender"
                                            name="gender"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.gender}
                                        />


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
                                            helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                                            label="Mobile Number"
                                            name="mobileNumber"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.mobileNumber}
                                            type="number"
                                        />
                                        <TextField
                                            error={!!(formik.touched.nhsNumber && formik.errors.nhsNumber)}
                                            fullWidth
                                            helperText={formik.touched.nhsNumber && formik.errors.nhsNumber}
                                            label="NHS Number"
                                            name="nhsNumber"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.nhsNumber}
                                        />
                
                


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

AddUpdateMedicine.prototype = {
    medicine: PropTypes.array,
    handleAddMedicine: PropTypes.func
}