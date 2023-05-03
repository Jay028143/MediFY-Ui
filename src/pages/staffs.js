import { useCallback, useMemo, useState ,useEffect} from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { StaffsTable } from 'src/sections/staff/staffs-table';
import { StaffsSearch } from 'src/sections/staff/staffs-search';
import { applyPagination } from 'src/utils/apply-pagination';
import UserService from 'src/services/UserService';
import { AddUpdateStaff } from 'src/components/addUpdateStaff';
import RoleService from 'src/services/RoleService';
import StoreService from 'src/services/Storeservice';
//const now = new Date();
const data = [
  {
    userId: '1',
    address: "stone",
    firstName: 'Jay',
    lastName:'Patel',
    userName:'JayPatel',
    email:'Jp@gmail.com',
    postCode: 'AAAA',
    mobileNumber: '123456789',
    dateOfJoining:'2023-02-15'
  },
  {
    userId: '2',
    address: "stoke",
    firstName: 'Hardik',
    lastName:'Patel',
    userName:'HardikPatel',
    email:'Hp@gmail.com',
    postCode: 'BBBB',
    mobileNumber: '565458',
    dateOfJoining:'2023-02-20'
  }];
  
  // {
  //   id: '5e887ac47eed253091be10cb',
  //   address: {
  //     city: 'Cleveland',
  //     country: 'USA',
  //     state: 'Ohio',
  //     street: '2849 Fulton Street'
  //   },
  //   avatar: '/assets/avatars/avatar-carson-darrin.png',
  //   createdAt: subDays(subHours(now, 7), 1).getTime(),
  //   email: 'carson.darrin@devias.io',
  //   name: 'Carson Darrin',
  //   phone: '304-428-3097'
  // },
  // {
  //   id: '5e887b209c28ac3dd97f6db5',
  //   address: {
  //     city: 'Atlanta',
  //     country: 'USA',
  //     state: 'Georgia',
  //     street: '1865  Pleasant Hill Road'
  //   },
  //   avatar: '/assets/avatars/avatar-fran-perez.png',
  //   createdAt: subDays(subHours(now, 1), 2).getTime(),
  //   email: 'fran.perez@devias.io',
  //   name: 'Fran Perez',
  //   phone: '712-351-5711'
  // },
  // {
  //   id: '5e887b7602bdbc4dbb234b27',
  //   address: {
  //     city: 'North Canton',
  //     country: 'USA',
  //     state: 'Ohio',
  //     street: '4894  Lakeland Park Drive'
  //   },
  //   avatar: '/assets/avatars/avatar-jie-yan-song.png',
  //   createdAt: subDays(subHours(now, 4), 2).getTime(),
  //   email: 'jie.yan.song@devias.io',
  //   name: 'Jie Yan Song',
  //   phone: '770-635-2682'
  // },
  // {
  //   id: '5e86809283e28b96d2d38537',
  //   address: {
  //     city: 'Madrid',
  //     country: 'Spain',
  //     name: 'Anika Visser',
  //     street: '4158  Hedge Street'
  //   },
  //   avatar: '/assets/avatars/avatar-anika-visser.png',
  //   createdAt: subDays(subHours(now, 11), 2).getTime(),
  //   email: 'anika.visser@devias.io',
  //   name: 'Anika Visser',
  //   phone: '908-691-3242'
  // },
  // {
  //   id: '5e86805e2bafd54f66cc95c3',
  //   address: {
  //     city: 'San Diego',
  //     country: 'USA',
  //     state: 'California',
  //     street: '75247'
  //   },
  //   avatar: '/assets/avatars/avatar-miron-vitold.png',
  //   createdAt: subDays(subHours(now, 7), 3).getTime(),
  //   email: 'miron.vitold@devias.io',
  //   name: 'Miron Vitold',
  //   phone: '972-333-4106'
  // },
  // {
  //   id: '5e887a1fbefd7938eea9c981',
  //   address: {
  //     city: 'Berkeley',
  //     country: 'USA',
  //     state: 'California',
  //     street: '317 Angus Road'
  //   },
  //   avatar: '/assets/avatars/avatar-penjani-inyene.png',
  //   createdAt: subDays(subHours(now, 5), 4).getTime(),
  //   email: 'penjani.inyene@devias.io',
  //   name: 'Penjani Inyene',
  //   phone: '858-602-3409'
  // },
  // {
  //   id: '5e887d0b3d090c1b8f162003',
  //   address: {
  //     city: 'Carson City',
  //     country: 'USA',
  //     state: 'Nevada',
  //     street: '2188  Armbrester Drive'
  //   },
  //   avatar: '/assets/avatars/avatar-omar-darboe.png',
  //   createdAt: subDays(subHours(now, 15), 4).getTime(),
  //   email: 'omar.darobe@devias.io',
  //   name: 'Omar Darobe',
  //   phone: '415-907-2647'
  // },
  // {
  //   id: '5e88792be2d4cfb4bf0971d9',
  //   address: {
  //     city: 'Los Angeles',
  //     country: 'USA',
  //     state: 'California',
  //     street: '1798  Hickory Ridge Drive'
  //   },
  //   avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
  //   createdAt: subDays(subHours(now, 2), 5).getTime(),
  //   email: 'siegbert.gottfried@devias.io',
  //   name: 'Siegbert Gottfried',
  //   phone: '702-661-1654'
  // },
  // {
  //   id: '5e8877da9a65442b11551975',
  //   address: {
  //     city: 'Murray',
  //     country: 'USA',
  //     state: 'Utah',
  //     street: '3934  Wildrose Lane'
  //   },
  //   avatar: '/assets/avatars/avatar-iulia-albu.png',
  //   createdAt: subDays(subHours(now, 8), 6).getTime(),
  //   email: 'iulia.albu@devias.io',
  //   name: 'Iulia Albu',
  //   phone: '313-812-8947'
  // },
  // {
  //   id: '5e8680e60cba5019c5ca6fda',
  //   address: {
  //     city: 'Salt Lake City',
  //     country: 'USA',
  //     state: 'Utah',
  //     street: '368 Lamberts Branch Road'
  //   },
  //   avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
  //   createdAt: subDays(subHours(now, 1), 9).getTime(),
  //   email: 'nasimiyu.danai@devias.io',
  //   name: 'Nasimiyu Danai',
  //   phone: '801-301-7894'
  // }
//];

const useStaffs = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useStaffIds = (staffs) => {
  return useMemo(
    () => {
      return staffs.map((staff) => staff.id);
    },
    [staffs]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const staffs = useStaffs(page, rowsPerPage);
  const staffsIds = useStaffIds(staffs);
  const staffsSelection = useSelection(staffsIds);
  const [staffdata, setStaffs] = useState([]);
  //const[roledata,setRoles]=useState([]);

  const [addstaff, setAddstaff] = useState(false);
  const userRole=localStorage.getItem('userRole');
  const user=JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    retrieveStaffs();
  }, []);


  // useEffect(() => {
  //   retrieveRoles();
  // }, []);


 

  // const retrieveRoles = () => {
  //   RoleService.getAll()
  //     .then(response => {
  //       setRoles(response.data);
  //       console.log(response.data);
  //      // //alert(JSON.stringify(response.data));
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
    
  // };  

  const deleteStaff = (staffId) => {

    ////alert("staffId"+staffId);
  
    UserService.remove(staffId)
      .then(response => {
        console.log(response.data);
        retrieveStaffs();
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  

  const updateStaff = (staff)=> {
    console.log("data..."+JSON.stringify(staff));
      setStaffs(staff);
      setAddstaff(true);
    console.log("setStaffs..."+JSON.stringify(staffdata));
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
        console.log(JSON.stringify(temp));
        console.log(JSON.stringify(response.data));
        ////alert(JSON.stringify(response.data));
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
                  onClick={() =>handleAddStaff(true)}
                  
                  underline="hover"
                >
                  Add
                </Button>
              </div>
            </Stack>
            {/* <StaffsSearch /> */}
            <StaffsTable
              count={data.length}
              items={staffdata}
              onDeselectAll={staffsSelection.handleDeselectAll}
              onDeselectOne={staffsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={staffsSelection.handleSelectAll}
              onSelectOne={staffsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={staffsSelection.selected}
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
