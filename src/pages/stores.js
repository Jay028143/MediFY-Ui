import { useCallback, useMemo, useState ,useEffect} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { subDays, subHours ,getTime} from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { StoresTable } from 'src/sections/store/stores-table';
import { StoresSearch } from 'src/sections/store/stores-search';
import { applyPagination } from 'src/utils/apply-pagination';
import StoreService from 'src/services/Storeservice';
//import { Store } from './component/store';
import { AddUpdateStore } from 'src/components/addUpdateStore';
const now = new Date();
//const data=[];
const data = [
  {
    storeId: '1',
    address: "stone",
    storeName: 'MedifyA',
    postCode: 'AAAA',
    mobileNumber: '123456789'
  },
  {
    storeId: '2',
    address: "barmingham",
    storeName: 'MedifyB',
    postCode: 'BBBBBB',
    mobileNumber: '7895612'
  }
];

const useStores = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useStoreIds = (stores) => {
  return useMemo(
    () => {
      return stores.map((store) => store.id);
    },
    [stores]
  );
};









const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const stores = useStores(page, rowsPerPage);
  const storesIds = useStoreIds(stores);
  const storesSelection = useSelection(storesIds);
  const [storedata, setStores] = useState([]);
  const [addstore, setAddstore] = useState(false);
  const userRole=localStorage.getItem('userRole');
  const user=JSON.parse(localStorage.getItem('user'));

console.log("date.."+now);
  useEffect(() => {
    retrieveStores();
  }, []);

  const deleteStore = (storeId) => {

    ////alert("storeId"+storeId);
  
    StoreService.remove(storeId)
      .then(response => {
        console.log(response.data);
        retrieveStores();
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  

  const updateStore = (store)=> {
    console.log("data..."+JSON.stringify(store));
      setStores(store);
      setAddstore(true);
    console.log("setStores..."+JSON.stringify(storedata));
  };

  const retrieveStores = () => {
    const userRole=localStorage.getItem('userRole');
    const user=JSON.parse(localStorage.getItem('user'));
    if(userRole=="ADMIN"){
      StoreService.getStoreByUserId(user.id)
      .then(response => {
        setStores(response.data);
        console.log(response.data);
       // //alert(JSON.stringify(response.data));
      })
      .catch(e => {
        console.log(e);
      });
    }
    else
    {
      StoreService.get(user.storeId)
      .then(response => {
       // //alert("response.data"+JSON.stringify(response.data));
        setStores([response.data]);
        console.log(response.data);
       // //alert(JSON.stringify(response.data));
      })
      .catch(e => {
        console.log(e);
      });
    }
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

  const handleAddStore=(isStore)=>{
    setStores([]);
    setAddstore(isStore);
    if(!isStore)
    {
      retrieveStores();
    }
  }

  return (
    <>{!addstore?<>
      <Head>
        <title>
          Stores | MediFY
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
                  Stores
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
                  onClick={() =>handleAddStore(true)}
                  
                  underline="hover"
                >
                  Add
                </Button>
              </div>
            </Stack>
            {/* <StoresSearch /> */}
            <StoresTable
              count={data.length}
              items={storedata}
              onDeselectAll={storesSelection.handleDeselectAll}
              onDeselectOne={storesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={storesSelection.handleSelectAll}
              onSelectOne={storesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={storesSelection.selected}
              deleteStore={deleteStore}
              EditStore={updateStore}
            />
          </Stack>
        </Container>
      </Box>
    </>:<><AddUpdateStore store={storedata}
     handleAddStore={handleAddStore}/></>}</>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
