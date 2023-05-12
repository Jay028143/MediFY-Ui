import PropTypes from 'prop-types';
import {  Button, Link } from '@mui/material';
import {
  Avatar,
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    deleteCustomer,
    EditCustomer,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const userRole=localStorage.getItem('userRole');
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Customer Name
                </TableCell>
                
                <TableCell>
                  Store
                </TableCell>
                <TableCell>
                  Date Of Birth
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  State
                </TableCell>
                <TableCell>
                  Country
                </TableCell>
                <TableCell>
                  Post Code
                </TableCell>
                <TableCell>
                 Mobile Number
                </TableCell>
                
                {userRole=="ADMIN" || userRole=="MANAGER" ?<>
                <TableCell>
                  Edit
                </TableCell>
                <TableCell>
                  Delete
                </TableCell></>:<></>}
              </TableRow>
            </TableHead>
            <TableBody>
            {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer)  => {
                const isSelected = selected.includes(customer.customerId);
               
                return (
                  <TableRow
                    hover
                    key={customer.customerId}
                    selected={isSelected}
                  >
                    
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={customer.avatar}>
                          {getInitials(customer.firstName)}
                        </Avatar>
                        <Typography variant="subtitle2">
                        {customer.firstName} {customer.lastName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.storeName}
                    </TableCell>
                    <TableCell>
                      {customer.dateOfBirth}
                    </TableCell>
                    <TableCell>
                    {customer.houseNo} , {customer.streetName} ,{customer.city}
                    </TableCell>
                    <TableCell>
                      {customer.state}
                    </TableCell>
                    <TableCell>
                      {customer.country}
                    </TableCell>
                    <TableCell>
                       {customer.postCode}
                    </TableCell>
                    <TableCell>
                      {customer.mobileNumber}
                    </TableCell>
                    {userRole=="ADMIN" || userRole=="MANAGER" ? <> <TableCell>
                      <Button
                        fullWidth
                        size="small"
                        sx={{ mt: 3 }}
                        type="submit"
                        variant="contained"
                        onClick={() =>EditCustomer(customer)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        fullWidth
                        size="small"
                        sx={{ mt: 3 }}
                        type="submit"
                        variant="contained"
                        onClick={() => deleteCustomer(customer.customerId)}
                      >
                        Delete
                      </Button>
                    </TableCell></>:<></>}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  deleteCustomer:PropTypes.func,
  EditCustomer:PropTypes.func
};
