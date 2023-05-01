import PropTypes from 'prop-types';
import { useCallback, useMemo, useState, useEffect } from 'react';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import { getInitials } from 'src/utils/get-initials';
import { useRouter } from 'next/navigation';
import { useAuth } from 'src/hooks/use-auth';
import {
  Avatar,
  Box,
  IconButton,
  Stack, CardContent,
  SvgIcon,
  Tooltip, Card, CardHeader, Container,
  useMediaQuery, TextField, Unstable_Grid2 as Grid, Typography, Divider
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import StoreService from 'src/services/Storeservice';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const router = useRouter();
  const auth = useAuth();
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();
  const user = JSON.parse(localStorage.getItem('user'));
  const [storedata, setStores] = useState([]);

  const handleStore = (e) => {
   // retrieveStores();
    //console.log("default..." + e.target.value);
    localStorage.setItem('defaultStoreId', e.target.value);
    auth.skip();
    router.push('/');

  }
  const retrieveStores = () => {
    const userdetail = JSON.parse(localStorage.getItem('user'));
    const userRole = localStorage.getItem('userRole');
    if (userRole == "ADMIN") {
      StoreService.getStoreByUserId(userdetail.id)
        .then(response => {
          setStores(response.data);
          console.log(response.data);
          // //alert(JSON.stringify(response.data));
        })
        .catch(e => {
          console.log(e);
        });
    }
    else {
      StoreService.get(userdetail.storeId)
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

  useEffect(() => {
    retrieveStores();
  }, []);


  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
          </Stack>
          <Stack
            alignItems="left"
           // direction="row"
            spacing={2}
          >
          <TextField
                  
                
                  name="storeId"
                  placeholder='Select Store'
                  label="Default Store"
                  select
                  SelectProps={{ native: true }}
                  onChange={handleStore}
                  onClick={retrieveStores}
                >
                  <option value='-1'
                    key='-1'
                    selected>
                    Select Store
                  </option>
                  {storedata.map((option) => (

                    <option
                      key={option.storeId}
                      value={option.storeId}
                    >
                      {option.storeName}
                    </option>
                  ))}
                </TextField>
         </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
              
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src={getInitials(user.username)}
            >{getInitials(user.username)}</Avatar>
          </Stack>
        </Stack>
        {/* <Stack>
            <CardContent sx={{ pt: 0 }}>

              <Grid
                xs={12}
                md={6}
                sx={{ justifyContent: 'left' }}
              >

                <TextField
                  
                  sx={{ marginTop: 4 }}
                  name="storeId"
                  placeholder='Select Store'
                  label="Default Store"
                  select
                  SelectProps={{ native: true }}
                  onChange={handleStore}
                  onClick={retrieveStores}
                >
                  <option value='-1'
                    key='-1'
                    selected>
                    Select Store
                  </option>
                  {storedata.map((option) => (

                    <option
                      key={option.storeId}
                      value={option.storeId}
                    >
                      {option.storeName}
                    </option>
                  ))}
                </TextField>


              </Grid>
            </CardContent>
          </Stack> */}
      </Box>
    
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};
