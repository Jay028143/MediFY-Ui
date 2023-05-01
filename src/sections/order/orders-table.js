import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {  Button, Link } from '@mui/material';
//import { useParams, useNavigate } from 'react-router-dom';
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
//import { json } from 'stream/consumers';

export const OrdersTable = (props) => {
  //let navigate = useNavigate();
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    deleteOrder,
    EditOrder,
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
                  OrderNo
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
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((order) => {
               // const isSelected = selected.includes(order.orderId);
               //const createdAt = format(order.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={order.orderId}
                    //selected={isSelected}
                  >
                    <TableCell>
                      {order.orderId}
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={order.avatar}>
                          {getInitials("P")}
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
                      {order.totalPrice}
                    </TableCell>
                    <TableCell>
                      <Button
                        fullWidth
                        size="small"
                        sx={{ mt: 3 }}
                        type="submit"
                        variant="contained"
                        onClick={() =>EditOrder(order)}
                      >
                        Show Detail
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

OrdersTable.propTypes = {
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
  deleteOrder:PropTypes.func,
  EditOrder:PropTypes.func
  
};
