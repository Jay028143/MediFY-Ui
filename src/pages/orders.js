import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
//import { OrdersTable } from 'src/sections/order/orders-table';
import { OrdersSearch } from 'src/sections/order/orders-search';
import { applyPagination } from 'src/utils/apply-pagination';
import UserService from 'src/services/UserService';
import { AddOrder } from 'src/components/addOrder';
import MedicineService from 'src/services/Medicineservice';
import OrderService from 'src/services/Orderservice';
import { OrdersTable } from 'src/sections/order/orders-table';

//const now = new Date();
const data = [
  {
    userId: '1',
    address: "stone",
    firstName: 'Jay',
    lastName: 'Patel',
    userName: 'JayPatel',
    email: 'Jp@gmail.com',
    niNumber: '78456122',
    postCode: 'AAAA',
    mobileNumber: '123456789',
    dateOfJoining: '2023-02-15'
  },
  {
    userId: '2',
    address: "stoke",
    firstName: 'Hardik',
    lastName: 'Patel',
    userName: 'HardikPatel',
    email: 'Hp@gmail.com',
    niNumber: '57241545',
    postCode: 'BBBB',
    mobileNumber: '565458',
    dateOfJoining: '2023-02-20'
  }];



const useOrders = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useOrderIds = (orders) => {
  return useMemo(
    () => {
      return orders.map((order) => order.id);
    },
    [orders]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const orders = useOrders(page, rowsPerPage);
  const ordersIds = useOrderIds(orders);
  const ordersSelection = useSelection(ordersIds);
  const [orderdata, setOrders] = useState([]);
  const [medicinedata, setMedicines] = useState([]);
  //const[roledata,setRoles]=useState([]);

  const [addorder, setAddorder] = useState(false);

  // useEffect(() => {
  //   retrieveMedicine();
  // }, []);

  useEffect(() => {
    retrieveOrders();
  }, []);


  const deleteOrder = (orderId) => {

    // UserService.remove(orderId)
    //   .then(response => {
    //     console.log(response.data);
    //     retrieveOrders();
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  };



  const updateOrder = (order) => {
    console.log("data..." + JSON.stringify(order));
    setOrders(order);
    setAddorder(true);
    console.log("setOrders..." + JSON.stringify(orderdata));
  };

  const retrieveOrders = () => {
    //alert("called..");
    const defaultStoreId = localStorage.getItem('defaultStoreId');
    OrderService.getByStoreId(defaultStoreId)
      .then(response => {
        //alert(JSON.stringify(response.data));
        setOrders(response.data);
        console.log(JSON.stringify(response.data));
        ////alert(JSON.stringify(response.data));
      })
      .catch(e => {
        console.log(e);
      });


  };

  const retrieveMedicine = () => {

    const defaultStoreId = localStorage.getItem('defaultStoreId');
    MedicineService.getByStoreId(defaultStoreId)
      .then(response => {
        console.log("data.." + JSON.stringify(response.data));
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
      setRowsPerPage(event.target.value);
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
            {/* <OrdersSearch medicines={medicinedata}/> */}
            <OrdersTable
              count={data.length}
              items={orderdata}
              onDeselectAll={ordersSelection.handleDeselectAll}
              onDeselectOne={ordersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={ordersSelection.handleSelectAll}
              onSelectOne={ordersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={ordersSelection.selected}
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
