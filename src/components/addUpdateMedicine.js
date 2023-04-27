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
import MedicineService from 'src/services/Medicineservice';

export const AddUpdateMedicine = (props) => {

    const idchecks = [
        {
            value: 'Y',
            label: 'Yes'
        },
        {
            value: 'N',
            label: 'No'
        }

    ];


    const {
        medicine,
        handleAddMedicine
    } = props;
    const buttonval = medicine.medicineId > 0 ? 'Update' : 'Save';
    const now = new Date();
    const currentdatetime = format(now, "yyyy-MM-dd HH:mm:ss");
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = medicine.medicineId > 0 ? medicine.userId : user.id;
    const storeId = medicine.medicineId > 0 ? medicine.storeId : user.storeId;
    const createdAt = medicine.medicineId > 0 ? medicine.createdAt : currentdatetime;
    console.log("data.eee.." + JSON.stringify(medicine));
    
    const formik = useFormik({
        initialValues: {
            medicineId: medicine.medicineId || '',
            medicineCode: medicine.medicineCode || '',
            medicineName: medicine.medicineName || '',
            medicinePrice: medicine.medicinePrice || '',
            description: medicine.description || '',
            idCheck: medicine.idCheck || 'N',
            availableStock: medicine.availableStock || '',
            totalStock: medicine.totalStock || '',
            expiryDate: medicine.expiryDate || '',
            userId: userId || '0',
            storeId: storeId || '0',
            createdAt: createdAt,
            updatedAt: currentdatetime,
            quantity: medicine.quantity || '',
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
                .required('Quantity is required'),
        }),
        onSubmit: async (values, helpers) => {
            try {
                MedicineService.create(values)
                    .then(response => {
                        alert(JSON.stringify(response));
                        //auth.skip();
                        //router.push('/medicines');
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
            <Head  >
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
                        <div>
                            <Typography variant="h4" >
                                Medicines
                            </Typography>
                        </div>
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
                                                // subheader="Add Medicine"
                                                title="Add Medicine"
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
                                                                error={!!(formik.touched.medicineName && formik.errors.medicineName)}
                                                                fullWidth
                                                                helperText={formik.touched.medicineName && formik.errors.medicineName}
                                                                label="Medicine Name"
                                                                name="medicineName"
                                                                onBlur={formik.handleBlur}
                                                                onChange={formik.handleChange}
                                                                value={formik.values.medicineName}
                                                            />
                                                            <TextField
                                                                sx={{ marginTop: 2 }}
                                                                error={!!(formik.touched.description && formik.errors.description)}
                                                                fullWidth
                                                                helperText={formik.touched.description && formik.errors.description}
                                                                label="Description"
                                                                name="description"
                                                                onBlur={formik.handleBlur}
                                                                onChange={formik.handleChange}
                                                                value={formik.values.description}
                                                            />

                                                            <TextField
                                                                sx={{ marginTop: 2 }}
                                                                error={!!(formik.touched.quantity && formik.errors.quantity)}
                                                                fullWidth
                                                                type="number"
                                                                helperText={formik.touched.quantity && formik.errors.quantity}
                                                                label="Quantity"
                                                                name="quantity"
                                                                onBlur={formik.handleBlur}
                                                                onChange={formik.handleChange}
                                                                value={formik.values.quantity}
                                                            />

                                                            <TextField
                                                                sx={{ marginTop: 2 }}
                                                                error={!!(formik.touched.expiryDate && formik.errors.expiryDate)}
                                                                fullWidth
                                                                helperText={formik.touched.expiryDate && formik.errors.expiryDate}
                                                                label="Expiry Date"
                                                                name="expiryDate"
                                                                onBlur={formik.handleBlur}
                                                                onChange={formik.handleChange}
                                                                value={formik.values.expiryDate}
                                                            />

                                                        </Grid>
                                                        <Grid
                                                            xs={12}
                                                            md={6}
                                                        >
                                                            <TextField

                                                                error={!!(formik.touched.medicineCode && formik.errors.medicineCode)}
                                                                fullWidth
                                                                helperText={formik.touched.medicineCode && formik.errors.medicineCode}
                                                                label="Medicine Code"
                                                                name="medicineCode"
                                                                onBlur={formik.handleBlur}
                                                                onChange={formik.handleChange}
                                                                value={formik.values.medicineCode}
                                                            />
                                                            <TextField
                                                                sx={{ marginTop: 2 }}
                                                                error={!!(formik.touched.medicinePrice && formik.errors.medicinePrice)}
                                                                fullWidth
                                                                helperText={formik.touched.medicinePrice && formik.errors.medicinePrice}
                                                                label="Medicine Price"
                                                                name="medicinePrice"
                                                                onBlur={formik.handleBlur}
                                                                onChange={formik.handleChange}
                                                                type="number"
                                                                value={formik.values.medicinePrice}
                                                            />
                                                            {/* <TextField
                                                                sx={{ marginTop: 2 }}
                                                                error={!!(formik.touched.idCheck && formik.errors.idCheck)}
                                                                fullWidth
                                                                helperText={formik.touched.idCheck && formik.errors.idCheck}
                                                                label="Id Check"
                                                                name="idCheck"
                                                                onChange={handleIdChange}
                                                                value={formik.values.idCheck}
                                                            > */}
                                                            <TextField
                                                             sx={{ marginTop: 2 }}
                                                                fullWidth
                                                                label="Id Check"
                                                                name="idCheck"
                                                                onChange={formik.handleChange}
                                                                required
                                                                select
                                                                SelectProps={{ native: true }}
                                                                value={formik.values.idCheck}
                                                            >
                                                                {idchecks.map((option) => (
                                                                    <option
                                                                        key={option.value}
                                                                        value={option.value}
                                                                    >
                                                                        {option.label}
                                                                    </option>
                                                                ))}

                                                            </TextField>
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

AddUpdateMedicine.prototype = {
    medicine: PropTypes.array,
    handleAddMedicine: PropTypes.func
}