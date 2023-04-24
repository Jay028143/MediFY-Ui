import { useCallback, useMemo, useState ,useEffect} from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';

const now = new Date();

const data = [
  {
    customerId: '1',
    address: "stone",
    firstName: 'Vijin',
    lastName:'wales',
    email:'vw@gmail.com',
    nhsNumber:'003',
    postCode: 'cccc',
    mobileNumber: '5645459895',
    dateOfBirth:'1995-02-15'
  },
  {
    customerId: '2',
    address: "stoke",
    firstName: 'Rohan',
    lastName:'Patel',
    email:'Hp@gmail.com',
    nhsNumber:'004',
    postCode: 'dddd',
    mobileNumber: '4548448',
    dateOfBirth:'1993-02-20'
  },
  {
    customerId: '1',
    address: "stone",
    firstName: 'Vijin',
    lastName:'wales',
    email:'vw@gmail.com',
    nhsNumber:'003',
    postCode: 'cccc',
    mobileNumber: '5645459895',
    dateOfBirth:'1995-02-15'
  },
  {
    customerId: '2',
    address: "stoke",
    firstName: 'Rohan',
    lastName:'Patel',
    email:'Hp@gmail.com',
    nhsNumber:'004',
    postCode: 'dddd',
    mobileNumber: '4548448',
    dateOfBirth:'1993-02-20'
  },
  {
    customerId: '1',
    address: "stone",
    firstName: 'Vijin',
    lastName:'wales',
    email:'vw@gmail.com',
    nhsNumber:'003',
    postCode: 'cccc',
    mobileNumber: '5645459895',
    dateOfBirth:'1995-02-15'
  },
  {
    customerId: '2',
    address: "stoke",
    firstName: 'Rohan',
    lastName:'Patel',
    email:'Hp@gmail.com',
    nhsNumber:'004',
    postCode: 'dddd',
    mobileNumber: '4548448',
    dateOfBirth:'1993-02-20'
  },
  {
    customerId: '1',
    address: "stone",
    firstName: 'Vijin',
    lastName:'wales',
    email:'vw@gmail.com',
    nhsNumber:'003',
    postCode: 'cccc',
    mobileNumber: '5645459895',
    dateOfBirth:'1995-02-15'
  },
  {
    customerId: '2',
    address: "stoke",
    firstName: 'Rohan',
    lastName:'Patel',
    email:'Hp@gmail.com',
    nhsNumber:'004',
    postCode: 'dddd',
    mobileNumber: '4548448',
    dateOfBirth:'1993-02-20'
  }
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const [data1, setData] = useState(null);

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

  return (
    <>
      <Head>
        <title>
          Customers | MediFY
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
                  Customers
                </Typography>
                <Stack
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
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CustomersSearch />
            <CustomersTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
