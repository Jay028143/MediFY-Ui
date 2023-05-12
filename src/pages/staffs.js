import { useCallback, useMemo, useState ,useEffect} from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { StaffsTable } from 'src/sections/staff/staffs-table';
import { applyPagination } from 'src/utils/apply-pagination';
import UserService from 'src/services/UserService';
import { AddUpdateStaff } from 'src/components/addUpdateStaff';


const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [staffdata, setStaffs] = useState([]);
  const [addstaff, setAddstaff] = useState(false);
   useEffect(() => {
    retrieveStaffs();
  }, []);
 

  const deleteStaff = (staffId) => {
  
    UserService.remove(staffId)
      .then(response => {
        retrieveStaffs();
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  

  const updateStaff = (staff)=> {
      setStaffs(staff);
      setAddstaff(true);
  };

  const retrieveStaffs = () => {
   
    const defaultStoreId = localStorage.getItem('defaultStoreId');
    const user = JSON.parse(localStorage.getItem('user'));
      UserService.getByStoreId(defaultStoreId)
      .then(response => {
        const temp=[];
        const staff=response.data;
        staff.forEach((res, index) => {
          if (res.userId !== user.id) {
              temp.push(res)
          }
      })
        setStaffs(temp);
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

  const handleAddStaff=(isStaff)=>{
    setStaffs([]);
    setAddstaff(isStaff);
    if(!isStaff)
    {
      retrieveStaffs();
    }
  }

  return (
    <>{!addstaff?<>
      <Head>
        <title>
          Staffs | MediFY
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
                  Staffs
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
                  onClick={() =>handleAddStaff(true)}
                  
                  underline="hover"
                >
                  Add
                </Button>
              </div>
            </Stack>
           
            <StaffsTable
              count={staffdata.length}
              items={staffdata}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              deleteStaff={deleteStaff}
              EditStaff={updateStaff}
            />
          </Stack>
        </Container>
      </Box>
    </>:<><AddUpdateStaff staff={staffdata}
     handleAddStaff={handleAddStaff}
    
     /></>}</>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
