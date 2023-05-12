import PropTypes from 'prop-types';
import {  Button } from '@mui/material';
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

export const StoresTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    deleteStore,
    EditStore,
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
                  Store Name
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
                {userRole=="ADMIN"?<TableCell>
                  Delete
                </TableCell>:<></>}
              </TableRow>
            </TableHead>
            <TableBody>
            {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((store)  => {
            
                const isSelected = selected.includes(store.storeId);
              
                return (
                  <TableRow
                    hover
                    key={store.storeId}
                    selected={isSelected}
                  >
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={store.avatar}>
                          {getInitials(store.storeName)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {store.storeName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {store.houseNo} , {store.streetName} ,{store.city}
                    </TableCell>
                    <TableCell>
                      {store.state}
                    </TableCell>
                    <TableCell>
                      {store.country}
                    </TableCell>
                    <TableCell>
                      {store.postCode}
                    </TableCell>
                    <TableCell>
                      {store.mobileNumber}
                    </TableCell>
                    <TableCell>
                      <Button
                        fullWidth
                        size="small"
                        sx={{ mt: 3 }}
                        type="submit"
                        variant="contained"
                        onClick={() =>EditStore(store)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    {userRole=="ADMIN"?<TableCell>
                      <Button
                        fullWidth
                        size="small"
                        sx={{ mt: 3 }}
                        type="submit"
                        variant="contained"
                        onClick={() => deleteStore(store.storeId)}
                      >
                        Delete
                      </Button>
                    </TableCell>:<></>}


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

StoresTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  deleteStore:PropTypes.func,
  EditStore:PropTypes.func,
  
};
