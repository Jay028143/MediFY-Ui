import { useCallback, useMemo, useState ,useEffect} from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import CustomerService from 'src/services/CustomerService';
//import { Customer } from './component/customer';
import { AddUpdateCustomer } from 'src/components/addUpdateCustomer';
const now = new Date();
//const data=[];
const data = [
  {
    customerId: '1',
    address: "stone",
    customerName: 'MedifyA',
    postCode: 'AAAA',
    mobileNumber: '123456789'
  },
  {
    customerId: '2',
    address: "barmingham",
    customerName: 'MedifyB',
    postCode: 'BBBBBB',
    mobileNumber: '7895612'
  }
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [customerdata, setCustomers] = useState([]);
  const [addcustomer, setAddcustomer] = useState(false);
  const userRole=localStorage.getItem('userRole');
  const user=JSON.parse(localStorage.getItem('user'));

console.log("date.."+now);
  useEffect(() => {
    retrieveCustomers();
  }, []);

  const deleteCustomer = (customerId) => {

    ////alert("customerId"+customerId);
  
    CustomerService.remove(customerId)
      .then(response => {
        console.log(response.data);
        retrieveCustomers();
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  

  const updateCustomer = (customer)=> {
    console.log("data..."+JSON.stringify(customer));
      setCustomers(customer);
      setAddcustomer(true);
    console.log("setCustomers..."+JSON.stringify(customerdata));
  };

  const retrieveCustomers = () => {
    const defaultStoreId = localStorage.getItem('defaultStoreId');
      CustomerService.getByStoreId(defaultStoreId)
      .then(response => {
       // //alert("response.data"+JSON.stringify(response.data));
        setCustomers(response.data);
        console.log(response.data);
       // //alert(JSON.stringify(response.data));
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
      setRowsPerPage(event.target.value);
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
                {/* <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack> */}
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
            {/* <CustomersSearch /> */}
            <CustomersTable
              count={data.length}
              items={customerdata}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
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
