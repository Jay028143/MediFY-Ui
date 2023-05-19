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

export const StaffsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    deleteStaff,
    EditStaff,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const defaultStoreName = localStorage.getItem('defaultStoreName');
    
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
                 Gender
                </TableCell>
                <TableCell>
                  Store
                </TableCell>
                <TableCell>
                  Job Title
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
            {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((staff)  => {
            
                const isSelected = selected.includes(staff.userId);

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
                      {staff.gender}
                    </TableCell>
                    <TableCell>
                    {defaultStoreName}
                    </TableCell>
                    <TableCell>
                    {staff.roles[0].name}
                    </TableCell>
                    <TableCell>
                    {staff.houseNo} , {staff.streetName} ,{staff.city}
                    </TableCell>
                    <TableCell>
                      {staff.state}
                    </TableCell>
                    <TableCell>
                      {staff.country}
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
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  deleteStaff:PropTypes.func,
  EditStaff:PropTypes.func
  
};
