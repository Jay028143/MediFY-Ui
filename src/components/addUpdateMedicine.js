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
    const defaultStoreId = localStorage.getItem('defaultStoreId');
    const storeId = medicine.medicineId > 0 ? medicine.storeId : defaultStoreId;
    const createdAt = medicine.medicineId > 0 ? medicine.createdAt : currentdatetime;
    const disabled= medicine.medicineId > 0?true:false;
    const formik = useFormik({
        initialValues: {
            medicineId: medicine.medicineId || '',
            medicineCode: medicine.medicineCode || '',
            medicineName: medicine.medicineName || '',
            medicinePrice: medicine.medicinePrice || '0',
            minAge:medicine.minAge || 0,
            description: medicine.description || '',
            idCheck: medicine.idCheck || 'N',
            availableStock: medicine.availableStock || '',
            totalStock: medicine.totalStock || '',
             userId: userId || '0',
            storeId: storeId || '0',
            createdAt: createdAt,
            updatedAt: currentdatetime,
            stock: [{
                quantity: '0',
                expiryDate: '',
            }],
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
            medicinePrice: Yup.number()
                .required('Medicine Price is required')
                .moreThan(0, 'Medicine Price not be zero or less than zero')
               ,
            description: Yup
                .string()
                .max(255)
                .required('Description is required'),
            // expiryDate: Yup
            //     .string()
            //     .max(255)
            //     .required('Expiry Date is required'),
            // quantity: Yup
            //     .string()
            //     .max(255)
            //     .required('Quantity is required'),
        }),
        onSubmit: async (values, helpers) => {
            try {
                MedicineService.create(values)
                    .then(response => {
                        
                        handleAddMedicine(false);
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
                                                subheader="Add Medicine"
                                                title="Medicines"
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
                                                                // error={!!(formik.touched.quantity && formik.errors.quantity)}
                                                                fullWidth
                                                                type="number"
                                                                // helperText={formik.touched.quantity && formik.errors.quantity}
                                                                label="Quantity"
                                                                name="quantity"
                                                                onBlur={formik.handleBlur}
                                                                //  onChange={formik.handleChange}
                                                                //onChange={(value) => formik.setFieldValue(JSON.stringify('stock', ["{"+{'quantity':value}+"}"]))}
                                                                // value={formik.values.stock}
                                                                onChange={(e) => formik.setFieldValue(`stock.${0}.quantity`, e.target.value)}
                                                            />

                                                            <TextField
                                                                sx={{ marginTop: 2 }}
                                                                // error={!!(formik.touched.expiryDate && formik.errors.expiryDate)}
                                                                fullWidth
                                                                // helperText={formik.touched.expiryDate && formik.errors.expiryDate}
                                                                label="Expiry Date"
                                                                name="expiryDate"
                                                                onBlur={formik.handleBlur}
                                                                type={'date'}
                                                                //onChange={formik.handleChange}
                                                                // value={formik.values.stock}
                                                                InputLabelProps={{ shrink: true }}
                                                                // onChange={(e) => formik.setFieldValue(JSON.stringify('stock', ["{"+{'expiryDate':e.target.value}+"}"]))}
                                                                onChange={(e) => formik.setFieldValue(`stock.${0}.expiryDate`, e.target.value)}
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
                                                                disabled={disabled}
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

                                                            <TextField
                                                                sx={{ marginTop: 2 }}
                                                                error={!!(formik.touched.minAge && formik.errors.minAge)}
                                                                fullWidth
                                                                helperText={formik.touched.minAge && formik.errors.minAge}
                                                                label="Minimum Age"
                                                                name="minAge"
                                                                onBlur={formik.handleBlur}
                                                                onChange={formik.handleChange}
                                                                type="number"
                                                                disabled={formik.values.idCheck=='Y'?false:true}
                                                                value={formik.values.minAge}
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

AddUpdateMedicine.prototype = {
    medicine: PropTypes.array,
    handleAddMedicine: PropTypes.func
}