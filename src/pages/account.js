import Head from 'next/head';
import { useState,useEffect } from 'react';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { AddUpdateStaff } from 'src/components/addUpdateStaff';
import UserService from 'src/services/UserService';
const Page = () => {
  const [userdata, setUser] = useState([]);
  const [addstaff, setAddstaff] = useState(false);
  const handleAddStaff=(isStaff)=>{
  }
  useEffect(() => {
    retrieveUser();
  }, []);

  const retrieveUser = () => {
   
     const user = JSON.parse(localStorage.getItem('user'));
     UserService.getByStoreId(user.storeId)
     .then(response => {
      
       const staff=response.data;
       staff.forEach((res, index) => {
         if (res.userId == user.id) {
          setUser(res);
          setAddstaff(true);
         }
     })
   
     })
      .catch(e => {
        console.log(e);
      });
    
   
  };    

  return (

    <>{!addstaff?<>
      
    </>:<>
    
    <AddUpdateStaff 
     staff={userdata}
     /></>}</>

//   <>
//     <Head>
//       <title>
//         Account | MediFY
//       </title>
//     </Head>
//     <Box
//       component="main"
//       sx={{
//         flexGrow: 1,
//         py: 8
//       }}
//     >
//       <Container maxWidth="xl">
//         <Stack spacing={3}>
//         <Stack
//               direction="row"
//               justifyContent="space-between"
//               spacing={4}
//             >
//            <Stack spacing={1}>
//             <Typography variant="h4">
//               Account
//             </Typography>
//             </Stack>
         
           
             
              
             

        
//         </Stack>
//         {addstaff?<>
//                 <AccountProfile
//                    staff={userdata} />
//                 <AddUpdateStaff
//                  staff={userdata} 
//                  //handleAddStaff={handleAddStaff}
//                  /></>:<></>}
//         </Stack>
//       </Container>
//     </Box>
//   </>
// )
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
