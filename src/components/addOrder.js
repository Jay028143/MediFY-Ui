import Head from 'next/head';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Box, Button, Card,
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
import { useRouter } from 'next/navigation';
import CustomerService from 'src/services/Customerservice';
import { OrdersDetailTable } from 'src/sections/order/orders-detail-table';
import MedicineService from 'src/services/Medicineservice';
export const AddOrder = (props) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [agePopup, setagePopup] = useState(false);
    const [availableStorePopup, setAvailableStorePopup] = useState(false);
    const [minAge, setMinAge] = useState(0);
    const [message, setMessage] = useState(0);
    const [titlemessage, setTitleMessage] = useState(0);
    const [isRegisterd, setisRegisterd] = useState(false);
    const [searchBydateOfBirth, setDateOfBirth] = useState('');
    const [customers, setCustomers] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [customerId, setCustomerId] = useState(-1);
    const [isIlligible, setIlligible] = useState(false);
    const [medicinedetail, setMedicineDetail] = useState();
    const [medicinecart, setMedicineCart] = useState([]);
    const [orderDetail,setOrderDetail]=useState([]);
    const [storeDetail,setStoreDetail]=useState([]);
    const [disabled,setDisabled]=useState(true);
    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(0);
    const {
        order,
        handleAddOrder,
        medicinedata
    } = props;
    const handleClickOpen = (medicinedata) => {
        const medicine = JSON.parse(medicinedata);
        if(medicine.availableStock==1000){

      MedicineService.getMedicineAvailabilityAtStore(medicine.storeId,medicine.medicineCode)
      .then(response => {
        if(response.data.length>0)
        {
            setStoreDetail(response.data);
            setAvailableStorePopup(true);
        }

      })
      .catch(e => {
        console.log(e);
      });

        }
        else{

        if (medicine.idCheck == 'Y') {
            setMinAge(medicine.minAge);
            setMedicineDetail(medicine);
            setOpen(true);
        }
        else {
            setMedicineDetail(medicine);
            setIlligible(true);
        }
    }

    };

    const handleOrderSubmit = () => {


        const currentdatetime = format(now, "yyyy-MM-dd HH:mm:ss");
        const defaultStoreId = localStorage.getItem('defaultStoreId');
        const user = JSON.parse(localStorage.getItem('user'));
        
      
        medicinecart.map((cart) => {

            const order= {
                "medicineId":cart.medicineId,
                "medicineName":cart.medicineName,
                "quantity": cart.orderQuantity,
                "unitPrice":cart.medicinePrice
            };
           // total=(order.orderQuantity * order.medicinePrice);
            orderDetail.push(order);

        });

        const total = medicinecart.reduce((total, order)=> total+(order.orderQuantity * order.medicinePrice), 0);
        
        if(customerName=='')
        {
            setError(true);
            setErrorMessage("Error : Cusomer Name is Required")
        }

        else{
        const submit= {
            "customerId":customerId,
            "customerName":customerName,
            "userId":user.id,
            "storeId": defaultStoreId,
            "totalPrice":total,
            "createdAt": currentdatetime,
            "updatedAt": currentdatetime,
            "orderDetail":orderDetail

        }

        try {
            OrderService.create(submit)
                .then(response => {
                    handleAddOrder(false);
                })
                .catch(e => {
                    console.log(e);
                });

        } catch (err) {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.message });
            helpers.setSubmitting(false);
        }}


    }
    const handleRemove = (id) => {
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

    const handleAvailableStoreClose = () => {
        setAvailableStorePopup(false);

    };
    const handleAddQuantity = (e) => {
        setDisabled(true);
        medicinedetail.orderQuantity = e.target.value;
         if(medicinedetail.availableStock<medicinedetail.orderQuantity)
        {
            setMessage("Medicine Is not avialable.");
            setTitleMessage("Check Medicine Availability");
            
        }
        
        else if(medicinedetail.orderQuantity!=0 && medicinedetail.orderQuantity!='')
        {
            setDisabled(false);
        }
        
    };


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
                    setCustomers(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }

    };

    const handleCustomerName = (id, name) => {
        setError(false);
        setCustomerName(name);
        setCustomerId(id);
    };

    const handleAdd = () => {
        medicinecart.push(medicinedetail);
        setDisabled(true);
        setMedicineDetail();
        setIlligible(false);
    };


    const checkillegible = () => {
        const dob = new Date(searchBydateOfBirth);
        const month_diff = Date.now() - dob.getTime();
        const age_dt = new Date(month_diff);
        const year = age_dt.getUTCFullYear();
        const age = Math.abs(year - 1970);
        if (age < minAge) {
            
            const msg="Customer do not meet the age requirement of this medication. \n Minimum age for this medication is" +minAge +"years";
            setMessage(msg);
            setTitleMessage("Check Age Illigibility");
            setIlligible(false);
            setagePopup(true);

        }
        else {
            const msg="Customer meet the age requirement of this medication. \n Minimum age for this medication is" +minAge +"years";
            setMessage(msg);
            setTitleMessage("Check Age Illigibility");
            setIlligible(true);
            setagePopup(true);
        }

    }
   
    const buttonval = order.orderId > 0 ? 'Update' : 'Save';
    const now = new Date();
    const currentdatetime = format(now, "yyyy-MM-dd HH:mm:ss");
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = order.orderId > 0 ? order.userId : user.id;
    const storeId = order.orderId > 0 ? order.storeId : user.storeId;
    const createdAt = order.orderId > 0 ? order.createdAt : currentdatetime;




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
                                                        {isRegisterd ? <>
                                                            <Button

                                                                size="large"
                                                                sx={{ mt: 11 }}
                                                                type="submit"
                                                                variant="contained"
                                                                onClick={searchCustomer}
                                                            >
                                                                Search
                                                            </Button></> : <></>}


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


                                                        {isIlligible ? <Button

                                                            size="large"
                                                            sx={{ mt: 2 }}
                                                            type="submit"
                                                            variant="contained"
                                                            onClick={handleAdd}
                                                            disabled={disabled}
                                                        >
                                                            Add
                                                        </Button> : <></>}



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
                                                                    onChange={(e) => setDate(e.target.value)}
                                                                    fullWidth

                                                                    type={'date'}
                                                                />
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={checkillegible}>OK</Button> 
                                                                <Button onClick={handleClose}>Cancel</Button>
                                                                
                                                            </DialogActions>
                                                        </Dialog>

                                                        <Dialog
                                                            open={agePopup}
                                                            onClose={handleAgeClose}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                        >
                                                            <DialogTitle id="ageilligible">
                                                                {titlemessage}
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

                                                        <Dialog
                                                            open={availableStorePopup}
                                                            onClose={handleAvailableStoreClose}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                        >
                                                            <DialogTitle id="ageilligible">
                                                                {"Check Age Illigibility"}
                                                            </DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                   
                                                                    Medicine Available at below Store<br/>
                                                                    <Divider/>
                                                                   
                                                                    {storeDetail.map((option) => (
                                                                   
                                                                        option.storeName
                                                                  
                                                                ))}

                                                                   

                                                                </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>

                                                                <Button onClick={handleAvailableStoreClose} autoFocus>
                                                                    OK
                                                                </Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </Grid>
                                                    <Grid
                                                        xs={12}
                                                        md={6}
                                                    >

                                                        {isIlligible ? < TextField
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
                                                            : <></>}

                                                    </Grid>
                                                </Grid></Box></CardContent>

                                        
                                    </Card>
                                   

                                </Grid>
                            </Grid>
                        </div>
                    </Stack>
                </Container>
            </Box>
            {medicinecart.length > 0 ?
                                            <OrdersDetailTable
                                                OrderCart={medicinecart}
                                                handleRemove={handleRemove}
                                                handleOrderSubmit={handleOrderSubmit}
                                                isError={isError}
                                                errorMessage={errorMessage}
                                                customerName={[customerName]}
                                            /> : <></>}
        </>
    );
};

AddOrder.prototype = {
    order: PropTypes.array,
    medicinedata: PropTypes.array,
    handleAddOrder: PropTypes.func
}