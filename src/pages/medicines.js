import { useCallback, useMemo, useState ,useEffect} from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { MedicinesTable } from 'src/sections/medicine/medicines-table';
import MedicineService from 'src/services/MedicineService';

import { AddUpdateMedicine } from 'src/components/addUpdateMedicine';


const Page = () => {
  const [medicinedata, setMedicines] = useState([]);
  useEffect(() => {
    retrieveMedicines();
  }, []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [addmedicine, setAddmedicine] = useState(false);

  const deleteMedicine = (medicineId) => {
    MedicineService.remove(medicineId)
      .then(response => {
        retrieveMedicines();
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  

  const updateMedicine = (medicine)=> {
      setMedicines(medicine);
      setAddmedicine(true);
  };

  const retrieveMedicines = () => {
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

  const handleAddMedicine=(isMedicine)=>{
    setMedicines([]);
    setAddmedicine(isMedicine);
    if(!isMedicine)
    {
      retrieveMedicines();
    }
  }

  return (
    <>{!addmedicine?<>
      <Head>
        <title>
          Medicines | MediFY
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
                  Medicines
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
                  onClick={() =>handleAddMedicine(true)}
                  
                  underline="hover"
                >
                  Add
                </Button>
              </div>
            </Stack>
            {/* <MedicinesSearch /> */}
            <MedicinesTable
              count={medicinedata.length}
              items={medicinedata}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              deleteMedicine={deleteMedicine}
              EditMedicine={updateMedicine}
            />
          </Stack>
        </Container>
      </Box>
    </>:<><AddUpdateMedicine medicine={medicinedata}
     handleAddMedicine={handleAddMedicine}/></>}</>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
