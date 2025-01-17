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
export const OrdersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
   
    deleteOrder,
    EditOrder,
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
                  Sr.No
                </TableCell>
                <TableCell>
                  CustomerName
                </TableCell>
                <TableCell>
                  OrderDate
                </TableCell>
                <TableCell>
                 Total Price
                </TableCell>
                
                {userRole=="ADMIN" || userRole=="MANAGER" ?<>
                <TableCell>
                  Edit
                </TableCell>
                </>:<></>}

              </TableRow>
            </TableHead>
            <TableBody>
            {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order,index)  => {
            
                return (
                  <TableRow
                    hover
                    key={order.orderId}
                    
                  >
                    <TableCell>
                      {index}
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={order.avatar}>
                          {getInitials(order.customerName)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {order.customerName} 
                        </Typography>
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      {order.createdAt}
                    </TableCell>
                    
                    <TableCell>
                     £{order.totalPrice}
                    </TableCell>
                    
                    {userRole=="ADMIN" || userRole=="MANAGER" ? <> <TableCell>
                      <Button
                        fullWidth
                        size="small"
                        sx={{ mt: 3 }}
                        type="submit"
                        variant="contained"
                        onClick={() =>EditOrder(customer)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    </>:<></>}
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

OrdersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  deleteOrder:PropTypes.func,
  EditOrder:PropTypes.func
};
