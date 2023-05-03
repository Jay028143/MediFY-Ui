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
import OrderService from 'src/services/Orderservice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
export const AddOrder = (props) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (idCheck) => {
        //alert("id check..."+idCheck)
        if(idCheck=='Y')
        {

        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const {
        order,
        handleAddOrder,
        medicinedata
    } = props;
    const buttonval = order.orderId > 0 ? 'Update' : 'Save';
    const now = new Date();
    const currentdatetime = format(now, "yyyy-MM-dd HH:mm:ss");
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = order.orderId > 0 ? order.userId : user.id;
    const storeId = order.orderId > 0 ? order.storeId : user.storeId;
    const createdAt = order.orderId > 0 ? order.createdAt : currentdatetime;
    console.log("data.eee.." + JSON.stringify(order));

    const formik = useFormik({
        initialValues: {
            orderId: order.orderId || '',
            orderCode: order.orderCode || '',
            orderName: order.orderName || '',
            orderPrice: order.orderPrice || '',
            description: order.description || '',
            idCheck: order.idCheck || 'N',
            availableStock: order.availableStock || '',
            totalStock: order.totalStock || '',
            expiryDate: order.expiryDate || '',
            userId: userId || '0',
            storeId: storeId || '0',
            createdAt: createdAt,
            updatedAt: currentdatetime,
            medicineId: '',
            stocks: [{
                quantity: '0',
                expiryDate: '2023-05-20',
            }],
            submit: null
        },
        response: {
            message: '',
        },
        validationSchema: Yup.object({

            orderName: Yup
                .string()
                .max(255)
                .required('Order Name is required'),
            orderCode: Yup
                .string()
                .max(255)
                .required('Order Code is required'),
            orderPrice: Yup
                .string()
                .max(255)
                .required('Order Price is required'),
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
                OrderService.create(values)
                    .then(response => {
                        // //alert(JSON.stringify(response));
                        //auth.skip();
                        //router.push('/orders');
                        //setSubmitted(true);
                        handleAddOrder(false);
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
                    Add Order | MediFY
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
                                                subheader="Add Order"
                                                title="Orders"
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
                                                                sx={{ marginTop: 2 }}
                                                                fullWidth
                                                                label="Medicine"
                                                                name="medicineId"
                                                                onChange={(e)=>{handleClickOpen(e.target.validationMessage)}}
                                                                required
                                                                select
                                                                SelectProps={{ native: true }}
                                                                value={formik.values.medicineId}
                                                                InputLabelProps={{ shrink: true }}
                                                            >
                                                                {medicinedata.map((medicine) => (
                                                                    <option
                                                                        key={medicine.medicineId}
                                                                        value={medicine.idCheck}
                                                                        //onChange={handleClickOpen(medicine.idCheck)}
                                                                    >
                                                                        {medicine.medicineName}
                                                                    </option>
                                                                ))}

                                                            </TextField>

                                                            <Dialog open={true} onClose={handleClose}>
                                                                <DialogTitle>Subscribe</DialogTitle>
                                                                <DialogContent>
                                                                    <DialogContentText>
                                                                        To subscribe to this website, please enter your email address here. We
                                                                        will send updates occasionally.
                                                                    </DialogContentText>
                                                                    <TextField
                                                                        autoFocus
                                                                        margin="dense"
                                                                        id="name"
                                                                        label="Email Address"
                                                                        type="email"
                                                                        fullWidth
                                                                        variant="standard"
                                                                    />
                                                                </DialogContent>
                                                                <DialogActions>
                                                                    <Button onClick={handleClose}>Cancel</Button>
                                                                    <Button onClick={handleClose}>Subscribe</Button>
                                                                </DialogActions>
                                                            </Dialog>


                                                        </Grid>
                                                        <Grid
                                                            xs={12}
                                                            md={6}
                                                        >
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

AddOrder.prototype = {
    order: PropTypes.array,
    medicinedata: PropTypes.array,
    handleAddOrder: PropTypes.func
}