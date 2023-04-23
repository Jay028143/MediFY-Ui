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

export const StaffsTable = (props) => {
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
    deleteStaff,
    EditStaff,
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
                  Staff Name
                </TableCell>
                <TableCell>
                  User Name
                </TableCell>
                <TableCell>
                 Email Id
                </TableCell>
                <TableCell>
                 NI Number
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
                  Date Of Joining
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
              {items.map((staff) => {
                const isSelected = selected.includes(staff.userId);
               //const createdAt = format(staff.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={staff.userId}
                    selected={isSelected}
                  >
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={staff.avatar}>
                          {getInitials(staff.firstName)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {staff.firstName} {staff.lastName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {staff.userName}
                    </TableCell>
                    <TableCell>
                      {staff.email}
                    </TableCell>
                    <TableCell>
                      {staff.niNumber}
                    </TableCell>
                    <TableCell>
                      {staff.address}
                    </TableCell>
                    <TableCell>
                      {staff.postCode}
                    </TableCell>
                    <TableCell>
                      {staff.mobileNumber}
                    </TableCell>
                    <TableCell>
                      {staff.dateOfJoining}
                    </TableCell>
                    <TableCell>
                      <Button
                        fullWidth
                        size="small"
                        sx={{ mt: 3 }}
                        type="submit"
                        variant="contained"
                        onClick={() =>EditStaff(staff)}
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
                        onClick={() => deleteStaff(staff.userId)}
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

StaffsTable.propTypes = {
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
  deleteStaff:PropTypes.func,
  EditStaff:PropTypes.func
  
};
