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

export const MedicinesTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    deleteMedicine,
    EditMedicine,
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
                  Medicine Name
                </TableCell>
                <TableCell>
                  Medicine Code
                </TableCell>
                <TableCell>
                  Price
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Id Check
                </TableCell>
                <TableCell>
                  Minimum Age
                </TableCell>
                <TableCell>
                  Available
                </TableCell>
                <TableCell>
                  Total
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
            {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((medicine)  => {
                const isSelected = selected.includes(medicine.medicineId);

                return (
                  <TableRow
                    hover
                    key={medicine.medicineId}
                    selected={isSelected}
                  >
                    
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={medicine.avatar}>
                          {getInitials(medicine.medicineName)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {medicine.medicineName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {medicine.medicineCode}
                    </TableCell>
                    <TableCell>
                      {medicine.medicinePrice}
                    </TableCell>
                    <TableCell>
                      {medicine.description}
                    </TableCell>
                    <TableCell>
                      {medicine.idCheck=='Y'?'Yes':'No'}
                    </TableCell>
                    <TableCell>
                      {medicine.minAge}
                    </TableCell>
                    <TableCell>
                      {medicine.availableStock}
                    </TableCell>
                    <TableCell>
                      {medicine.totalStock}
                    </TableCell>
                    
                    {userRole=="ADMIN" || userRole=="MANAGER" ? <> <TableCell>
                      <Button
                        fullWidth
                        size="small"
                        sx={{ mt: 3 }}
                        type="submit"
                        variant="contained"
                        onClick={() =>EditMedicine(medicine)}
                      >
                        Add Stock
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        fullWidth
                        size="small"
                        sx={{ mt: 3 }}
                        type="submit"
                        variant="contained"
                        onClick={() => deleteMedicine(medicine.medicineId)}
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

MedicinesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  deleteMedicine:PropTypes.func,
  EditMedicine:PropTypes.func
};
