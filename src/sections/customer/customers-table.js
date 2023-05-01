import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {  Button, Link } from '@mui/material';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
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
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    deleteCustomer,
    EditCustomer,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

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
                <TableCell>
                  Edit
                </TableCell>
                <TableCell>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.customerId);
                //const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

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
                      {customer.nhsNumber}
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
                    <TableCell>
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
                    </TableCell>
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
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  deleteCustomer:PropTypes.func,
  EditCustomer:PropTypes.func
};
