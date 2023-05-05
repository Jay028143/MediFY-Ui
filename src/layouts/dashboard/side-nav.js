import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import UserGroupIcon from '@heroicons/react/24/solid/UserGroupIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import BuildingStorefrontIcon from '@heroicons/react/24/solid/BuildingStorefrontIcon';
import PlusCircleIcon from '@heroicons/react/24/solid/PlusCircleIcon';

import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
//import { items } from './config';
import { SideNavItem } from './side-nav-item';
import { useState, useEffect } from 'react';


export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const [items, setItems] = useState([]);

  const handleSidePanel = () => {

    const userRole = localStorage.getItem('userRole');

    const item = [
      {
        title: 'Overview',
        path: '/',
        icon: (
          <SvgIcon fontSize="small">
            <ChartBarIcon />
          </SvgIcon>
        )
      }];

    if (userRole == 'ADMIN') {
      item.push({
        title: 'Staff',
        path: '/staffs',
        icon: (
          <SvgIcon fontSize="small">
            <UserGroupIcon />
          </SvgIcon>
        )
      },
        {
          title: 'Stores',
          path: '/stores',
          icon: (
            <SvgIcon fontSize="small">
              <BuildingStorefrontIcon />
            </SvgIcon>
          )
        });

    }
    else if (userRole == 'MANAGER') {
      item.push({
        title: 'Staff',
        path: '/staffs',
        icon: (
          <SvgIcon fontSize="small">
            <UserGroupIcon />
          </SvgIcon>
        )
      },
      );
    }

    item.push({
      title: 'Customers',
      path: '/customers',
      icon: (
        <SvgIcon fontSize="small">
          <UsersIcon />
        </SvgIcon>
      )
    },
      {
        title: 'Medicines',
        path: '/medicines',
        icon: (
          <SvgIcon fontSize="small">
            <PlusCircleIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Orders',
        path: '/orders',
        icon: (
          <SvgIcon fontSize="small">
            <ShoppingBagIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Account',
        path: '/account',
        icon: (
          <SvgIcon fontSize="small">
            <UserIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Settings',
        path: '/settings',
        icon: (
          <SvgIcon fontSize="small">
            <CogIcon />
          </SvgIcon>
        )
      })




    setItems(item);

  }


  useEffect(() => {
    handleSidePanel();
  }, []);

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32
            }}
          >
            <Logo />
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 1,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              p: '12px'
            }}
          >
            <div>
              <Typography
                color="inherit"
                variant="subtitle1"
              >
                MediFY
              </Typography>
              <Typography
                color="neutral.400"
                variant="body2"
              >
                CareFinder
              </Typography>
            </div>
            <SvgIcon
              fontSize="small"
              sx={{ color: 'neutral.500' }}
            >
              <ChevronUpDownIcon />
            </SvgIcon>
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item) => {
              const active = item.path ? (pathname === item.path) : false;


              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
