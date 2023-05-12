import Head from 'next/head';
import { useState,useEffect } from 'react';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { AddUpdateStaff } from 'src/components/addUpdateStaff';
import UserService from 'src/services/UserService';
const Page = () => {
  const [userdata, setUser] = useState({});
  const [addstaff, setAddstaff] = useState(true);
  const handleAddStaff=(isStaff)=>{
  }
  useEffect(() => {
    retrieveUser();
  }, []);

  const retrieveUser = () => {
   
     const user = JSON.parse(localStorage.getItem('user'));
      UserService.get(user.id)
      .then(response => {
        alert(JSON.stringify(response.data))
        setUser(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    
   
  };    

  return (<>
    <Head>
      <title>
        Account | MediFY
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
            <Typography variant="h4">
              Account
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
               
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                {/* <AccountProfileDetails /> */}
                <AddUpdateStaff
                 staff={userdata} 
                 //handleAddStaff={handleAddStaff}
                 />

              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
