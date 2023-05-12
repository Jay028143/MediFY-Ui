import { useCallback, useMemo, useState ,useEffect} from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { StoresTable } from 'src/sections/store/stores-table';
import StoreService from 'src/services/Storeservice';
import { AddUpdateStore } from 'src/components/addUpdateStore';

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [storedata, setStores] = useState([]);
  const [addstore, setAddstore] = useState(false);

  useEffect(() => {
    retrieveStores();
  }, []);

  const deleteStore = (storeId) => {
  
    StoreService.remove(storeId)
      .then(response => {
        retrieveStores();
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  

  const updateStore = (store)=> {
      setStores(store);
      setAddstore(true);
  };

  const retrieveStores = () => {
    const userRole=localStorage.getItem('userRole');
    const user=JSON.parse(localStorage.getItem('user'));
    if(userRole=="ADMIN"){
      StoreService.getStoreByUserId(user.id)
      .then(response => {
        setStores(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
    else
    {
      StoreService.get(user.storeId)
      .then(response => {
        setStores([response.data]);
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
      setRowsPerPage(event.target.value,10);
      setPage(0);
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
          
            <StoresTable
              count={storedata.length}
              items={storedata}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
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
