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

export const StoresTable = (props) => {
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
    deleteStore,
    EditStore,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;
  
  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  const user=JSON.parse(localStorage.getItem('user'));
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
                  Post Code
                </TableCell>
                <TableCell>
                  Mobile Number
                </TableCell>
                <TableCell>
                  Edit
                </TableCell>
                {user.roles=="ROLE_ADMIN"?<TableCell>
                  Delete
                </TableCell>:<></>}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((store) => {
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
                      {store.address}
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
                    {user.roles=="ROLE_ADMIN"?<TableCell>
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
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  deleteStore:PropTypes.func,
  EditStore:PropTypes.func,
  
};
