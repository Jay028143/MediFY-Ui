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
import { useState } from 'react';
import CustomerService from 'src/services/Customerservice';
import { OrdersDetailTable } from 'src/sections/order/orders-detail-table';
export const AddOrder = (props) => {

    const [open, setOpen] = useState(false);
    const [agePopup, setagePopup] = useState(false);
    const [minAge, setMinAge] = useState(0);
    const [message, setMessage] = useState(0);
    const [isRegisterd, setisRegisterd] = useState(false);
    const [searchBydateOfBirth, setDateOfBirth] = useState('');
    const [customers, setCustomers] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [customerId, setCustomerId] = useState(-1);
    const [isIlligible, setIlligible] = useState(false);
    const [medicinedetail, setMedicineDetail] = useState();
    const [medicinecart, setMedicineCart] = useState([]);
    const handleClickOpen = (medicinedata) => {
       // alert("medicine d.."+(medicinedata));
        const medicine=JSON.parse(medicinedata);
         //   alert("medicine.."+medicine.idCheck);
        if (medicine.idCheck == 'Y') {
            setMinAge(medicine.minAge);
            setMedicineDetail(medicine);
            setOpen(true);
        }
        else{
            setMedicineDetail(medicine);
            setIlligible(true);
        }

    };

    

    const handleRemove = (id) => {
        //alert("id.."+id)
        console.log("medicinecart.."+JSON.stringify(medicinecart))
        const filteredArray = medicinecart.filter((res) => res.medicineId !== id);
        setMedicineCart(filteredArray);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleAgeClose = () => {
        setagePopup(false);
        setOpen(false);

    };
    const handleAddQuantity = (e) => {
        medicinedetail.orderQuantity=e.target.value;
    };

    handleAddQuantity

    const handleClickRegister = (isRegister) => {
        setCustomerName('');
        setCustomerId(-1);
        if (isRegister == 'Y') {
            setisRegisterd(true);
        }
        else {
            setisRegisterd(false);
        }

    };

    const setDate = (date) => {
        setDateOfBirth(date);

    };

    const searchCustomer = () => {
        if (searchBydateOfBirth != '') {
            CustomerService.getCustomerByDateOfBirth(searchBydateOfBirth)
                .then(response => {
                   // alert("response.data" + JSON.stringify(response.data));
                    setCustomers(response.data);
                    console.log(response.data);
                    // //alert(JSON.stringify(response.data));
                })
                .catch(e => {
                    console.log(e);
                });
        }

    };

    const handleCustomerName = (id, name) => {
        setCustomerName(name);
        setCustomerId(id);
    };

      const handleAdd = () => {
            medicinecart.push(medicinedetail);
            //alert("Medicine data..."+JSON.stringify(medicinecart));
            setMedicineDetail();
            setIlligible(false);
    };


    const checkillegible = (dateOfBirth) => {
        const dob = new Date(dateOfBirth);
        const month_diff = Date.now() - dob.getTime();
        const age_dt = new Date(month_diff);
        const year = age_dt.getUTCFullYear();
        const age = Math.abs(year - 1970);
       // alert("date Of birth.." + dateOfBirth);
        if (age < minAge) {
            
            setMessage(" You are not Illigible for this Medication.");
            setIlligible(false);
            setagePopup(true);
     
        }
        else {
           
            setMessage(" You are Illigible for this Medication.");
            setIlligible(true);
            setagePopup(true);
        }

    }
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



    // const formik = useFormik({
    //     initialValues: {
    //         orderId: order.orderId || '',
    //         orderCode: order.orderCode || '',
    //         orderName: order.orderName || '',
    //         orderPrice: order.orderPrice || '',
    //         description: order.description || '',
    //         idCheck: order.idCheck || 'N',
    //         availableStock: order.availableStock || '',
    //         totalStock: order.totalStock || '',
    //         expiryDate: order.expiryDate || '',
    //         userId: userId || '0',
    //         storeId: storeId || '0',
    //         createdAt: createdAt,
    //         updatedAt: currentdatetime,
    //         medicineId: '',
    //         stocks: [{
    //             quantity: '0',
    //             expiryDate: '2023-05-20',
    //         }],
    //         submit: null
    //     },
    //     response: {
    //         message: '',
    //     },
    //     validationSchema: Yup.object({

    //         orderName: Yup
    //             .string()
    //             .max(255)
    //             .required('Order Name is required'),
    //         orderCode: Yup
    //             .string()
    //             .max(255)
    //             .required('Order Code is required'),
    //         orderPrice: Yup
    //             .string()
    //             .max(255)
    //             .required('Order Price is required'),
    //         description: Yup
    //             .string()
    //             .max(255)
    //             .required('Description is required'),
    //         expiryDate: Yup
    //             .string()
    //             .max(255)
    //             .required('Expiry Date is required'),
    //         quantity: Yup
    //             .string()
    //             .max(255)
    //             .required('Quantity is required'),
    //     }),
    //     onSubmit: async (values, helpers) => {
    //         try {
    //             OrderService.create(values)
    //                 .then(response => {
    //                     // //alert(JSON.stringify(response));
    //                     //auth.skip();
    //                     //router.push('/orders');
    //                     //setSubmitted(true);
    //                     handleAddOrder(false);
    //                     console.log(response.data);
    //                 })
    //                 .catch(e => {
    //                     console.log(e);
    //                 });

    //         } catch (err) {
    //             helpers.setStatus({ success: false });
    //             helpers.setErrors({ submit: err.message });
    //             helpers.setSubmitting(false);
    //         }
    //     }
    // });

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
                                                            label="Is Customer Registered? "
                                                            name="iscustomerRegisterd"
                                                            onChange={(e) => { handleClickRegister(e.target.value) }}
                                                            required
                                                            select
                                                            SelectProps={{ native: true }}
                                                            // value={}
                                                            InputLabelProps={{ shrink: true }}
                                                        >
                                                            <option value='N'
                                                                key='N'
                                                                selected>
                                                                No
                                                            </option>
                                                            <option value='Y'
                                                                key='Y'
                                                            >
                                                                Yes
                                                            </option>

                                                        </TextField> 

                                                       {isRegisterd ? <><TextField
                                                            autoFocus
                                                            sx={{ marginTop: 2 }}
                                                            id="serachcustomer"
                                                            label="Search Customer"
                                                            onChange={(e) => setDate(e.target.value)}
                                                            fullWidth

                                                            type={'date'}
                                                            InputLabelProps={{ shrink: true }}
                                                        />

                                                            <TextField
                                                                sx={{ marginTop: 2 }}
                                                                fullWidth
                                                                label="Customer"
                                                                name="customer"
                                                                onChange={(e) => { handleCustomerName(e.target.key, e.target.value) }}
                                                                required
                                                                select
                                                                SelectProps={{ native: true }}
                                                                // value={}
                                                                InputLabelProps={{ shrink: true }}
                                                            >
                                                                <option value='-1'
                                                                    key='-1'
                                                                    selected>
                                                                    Select Customer
                                                                </option>
                                                                {customers.map((customer) => (
                                                                    <option
                                                                        key={customer.customerId}
                                                                        value={customer.customerName}


                                                                    >
                                                                        {customer.firstName} {customer.lastName}
                                                                    </option>
                                                                ))}</TextField>

                                                            


                                                        </> : <><TextField
                                                            autoFocus
                                                            sx={{ marginTop: 2 }}
                                                            id="customerName"
                                                            label="Customer Name"
                                                            onChange={(e) => handleCustomerName(-1, e.target.value)}
                                                            fullWidth
                                                            value={customerName}

                                                        />

                                                            
                                                        </>}



                                                    </Grid>
                                                    <Grid
                                                        xs={12}
                                                        md={6}
                                                    >
                                                         { isRegisterd ?<>
                                                            <Button
                                                            
                                                                size="large"
                                                                sx={{ mt: 11 }}
                                                                type="submit"
                                                                variant="contained"
                                                                onClick={searchCustomer}
                                                            >
                                                                Search
                                                            </Button></>:<></>}


                                                    </Grid>
                                                </Grid>



                                            </Box>
                                        </CardContent>
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
                                                            onChange={(e) => { handleClickOpen(e.target.value) }}
                                                            required
                                                            select
                                                            SelectProps={{ native: true }}
                                                            // value={}
                                                            InputLabelProps={{ shrink: true }}
                                                        >
                                                            <option value='-1'
                                                                key='-1'
                                                                selected>
                                                                Select Medicine
                                                            </option>
                                                            {medicinedata.map((medicine) => (
                                                                <option
                                                                    key={medicine.idCheck + "," + medicine.minAge}
                                                                    value={JSON.stringify(medicine)}
                                                                // onClick={handleClickOpen(medicine)}
                                                                >
                                                                    {medicine.medicineName}
                                                                </option>
                                                            ))}

                                                        </TextField>

                                                      
                                                        {isIlligible?<Button
                                                            
                                                            size="large"
                                                            sx={{ mt: 2 }}
                                                            type="submit"
                                                            variant="contained"
                                                            onClick={handleAdd}
                                                        >
                                                            Add
                                                        </Button>:<></> }
                                                        


                                                        <Dialog open={open} onClose={handleClose}>
                                                            <DialogTitle>Verification</DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText>
                                                                    Id Check Required for this medition

                                                                </DialogContentText>
                                                                <TextField
                                                                    autoFocus
                                                                    margin="dense"
                                                                    id="dateOfBirth"
                                                                    label="Date Of Birth"
                                                                    onChange={(e) => checkillegible(e.target.value)}
                                                                    fullWidth

                                                                    type={'date'}
                                                                />
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={handleClose}>Cancel</Button>
                                                                {/* <Button onClick={handleClose}>Subscribe</Button> */}
                                                            </DialogActions>
                                                        </Dialog>

                                                        <Dialog
                                                            open={agePopup}
                                                            onClose={handleAgeClose}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                        >
                                                            <DialogTitle id="ageilligible">
                                                                {"Check Age Illigibility"}
                                                            </DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                    {message}
                                                                </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>

                                                                <Button onClick={handleAgeClose} autoFocus>
                                                                    OK
                                                                </Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </Grid>
                                                    <Grid
                                                        xs={12}
                                                        md={6}
                                                    >
                                                        
                                                      {isIlligible?  < TextField
                                                                sx={{ marginTop: 2 }}
                                                                // error={!!(formik.touched.quantity && formik.errors.quantity)}
                                                                fullWidth
                                                                type="number"
                                                                //  helperText={formik.touched.quantity && formik.errors.quantity}
                                                                label="Quantity"
                                                                name="quantity"
                                                            //onBlur={formik.handleBlur}
                                                             onChange={handleAddQuantity}
                                                            // value={formik.values.quantity}
                                                            />
                                                      :<></>}
                                                       
                                                    </Grid>
                                                   </Grid></Box></CardContent>

                                                   {medicinecart.length>0?
                                                   <OrdersDetailTable
                                                   OrderCart={medicinecart}
                                                   handleRemove={handleRemove}
                                
                                                   />:<></>}
                                    </Card>

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