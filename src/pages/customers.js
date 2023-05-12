import { useCallback, useState ,useEffect} from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';

import CustomerService from 'src/services/CustomerService';
//import { Customer } from './component/customer';
import { AddUpdateCustomer } from 'src/components/addUpdateCustomer';


const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customerdata, setCustomers] = useState([]);
  const [addcustomer, setAddcustomer] = useState(false);

  useEffect(() => {
    retrieveCustomers();
  }, []);

  const deleteCustomer = (customerId) => {
    CustomerService.remove(customerId)
      .then(response => {
        retrieveCustomers();
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  

  const updateCustomer = (customer)=> {
      setCustomers(customer);
      setAddcustomer(true);
  };

  const retrieveCustomers = () => {
    const defaultStoreId = localStorage.getItem('defaultStoreId');
      CustomerService.getByStoreId(defaultStoreId)
      .then(response => {
        setCustomers(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    
  };    

 

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value,10);
      setPage(0);
    },
    []
  );

  const handleAddCustomer=(isCustomer)=>{
    setCustomers([]);
    setAddcustomer(isCustomer);
    if(!isCustomer)
    {
      retrieveCustomers();
    }
  }

  return (
    <>{!addcustomer?<>
      <Head>
        <title>
          Customers | MediFY
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
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Customers
                </Typography>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={() =>handleAddCustomer(true)}
                  
                  underline="hover"
                >
                  Add
                </Button>
              </div>
            </Stack>
          
            <CustomersTable
              count={customerdata.length}
              items={customerdata}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              deleteCustomer={deleteCustomer}
              EditCustomer={updateCustomer}
            />
          </Stack>
        </Container>
      </Box>
    </>:<><AddUpdateCustomer customer={customerdata}
     handleAddCustomer={handleAddCustomer}/></>}</>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
