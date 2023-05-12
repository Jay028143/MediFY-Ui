import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Button, Link,CardHeader } from '@mui/material';
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
  Typography, CardActions,Divider
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
//import { json } from 'stream/consumers';

export const OrdersDetailTable = (props) => {
  //let navigate = useNavigate();
  const {
    count = 0,
    OrderCart = [],

    onPageChange = () => { },
    onRowsPerPageChange,
    handleRemove,
    handleOrderSubmit,
    customerName,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < OrderCart.length);
  const selectedAll = (OrderCart.length > 0) && (selected.length === OrderCart.length);
  const now = new Date();
  const currentdatetime = format(now, "dd-MM-yyyy HH:mm:ss");
  const customer="Customer Name : ".concat(customerName[0]) ;
  return (
    <>

      <Card>
        <CardHeader
         
          title="Order Detail"
        />
        <Divider />
  
        <CardHeader
               title={customer}
               subheader={"Date :".concat(currentdatetime)}
       />
        
        <Scrollbar>
          <Box sx={{ minWidth: 600 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    MedicineName
                  </TableCell>
                  <TableCell>
                    Unit Price
                  </TableCell>
                  <TableCell>
                    Quantity
                  </TableCell>
                  <TableCell>
                    Total
                  </TableCell>
                  <TableCell>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {OrderCart.map((ordersDetail) => {
                  // const isSelected = selected.includes(ordersDetail.orderId);
                  //const createdAt = format(ordersDetail.createdAt, 'dd/MM/yyyy');

                  return (
                    <TableRow
                      hover
                      key={ordersDetail.medicineId}
                    //selected={isSelected}
                    >

                      <TableCell>
                        <Stack
                          alignItems="center"
                          direction="row"
                          spacing={2}
                        >
                          <Avatar src={ordersDetail.avatar}>
                            {getInitials(ordersDetail.medicineName)}
                          </Avatar>
                          <Typography variant="subtitle2">
                            {ordersDetail.medicineName}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        {ordersDetail.medicinePrice}
                      </TableCell>

                      <TableCell>
                        {ordersDetail.orderQuantity}
                      </TableCell>

                      <TableCell>
                        {(ordersDetail.orderQuantity * ordersDetail.medicinePrice)}
                      </TableCell>

                      <TableCell>
                        <Button
                          fullWidth
                          size="large"
                          sx={{ mt: 3 }}
                          type="submit"
                          variant="contained"
                          onClick={() => handleRemove(ordersDetail.medicineId)}
                        >
                          Remove
                        </Button>
                      </TableCell>

                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button

                size="large"

                sx={{ mt: 3, justifyContent: 'center' }}
                type="submit"
                variant="contained"
                onClick={() => handleOrderSubmit()}
              >
                Submit
              </Button>
            </CardActions>
          </Box>
        </Scrollbar>

      </Card></>
  );
};

OrdersDetailTable.propTypes = {
  count: PropTypes.number,
  OrderCart: PropTypes.array,
  handleOrderSubmit: PropTypes.func,
  handleRemove: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  deleteOrder: PropTypes.func,
  EditOrder: PropTypes.func,
  customerName:PropTypes.array
};
