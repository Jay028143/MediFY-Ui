import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AddOrder } from 'src/components/addOrder';
import MedicineService from 'src/services/Medicineservice';
import OrderService from 'src/services/Orderservice';
import { OrdersTable } from 'src/sections/order/orders-table';


const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderdata, setOrders] = useState([]);
  const [medicinedata, setMedicines] = useState([]);
  
  const [addorder, setAddorder] = useState(false);


  useEffect(() => {
    retrieveOrders();
  }, []);


  const deleteOrder = (orderId) => {

    OrderService.remove(orderId)
      .then(response => {
        retrieveOrders();
      })
      .catch(e => {
        console.log(e);
      });
  };



  const updateOrder = (order) => {
    setOrders(order);
    setAddorder(true);
  };

  const retrieveOrders = () => {
    const defaultStoreId = localStorage.getItem('defaultStoreId');
    OrderService.getByStoreId(defaultStoreId)
      .then(response => {
         setOrders(response.data);
      })
      .catch(e => {
        console.log(e);
      });


  };

  const retrieveMedicine = () => {

    const defaultStoreId = localStorage.getItem('defaultStoreId');
    MedicineService.getByStoreId(defaultStoreId)
      .then(response => {
         setMedicines(response.data);

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

  const handleAddOrder = (isOrder) => {
    setOrders([]);
    setAddorder(isOrder);
    retrieveMedicine();
  }

  return (
    <>{!addorder ? <>
      <Head>
        <title>
          Orders | MediFY
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
                  Orders
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
                  onClick={() => handleAddOrder(true)}

                  underline="hover"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <OrdersTable
              count={orderdata.length}
              items={orderdata}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              deleteOrder={deleteOrder}
              EditOrder={updateOrder}
            />
          </Stack>
        </Container>
      </Box>
    </> : <><AddOrder order={orderdata}
      handleAddOrder={handleAddOrder}
      medicinedata={medicinedata}

    /></>}</>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
