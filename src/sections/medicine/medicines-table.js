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

export const MedicinesTable = (props) => {
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
    deleteMedicine,
    EditMedicine,
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
                  Available
                </TableCell>
                <TableCell>
                  Total
                </TableCell>
                <TableCell>
                  Expiry Date
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
              {items.map((medicine) => {
                const isSelected = selected.includes(medicine.medicineId);
                //const createdAt = format(medicine.createdAt, 'dd/MM/yyyy');

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
                      {medicine.availableStock}
                    </TableCell>
                    <TableCell>
                      {medicine.total_stock}
                    </TableCell>
                    <TableCell>
                      {medicine.expiryDate}
                    </TableCell>
                    <TableCell>
                      <Button
                        fullWidth
                        size="small"
                        sx={{ mt: 3 }}
                        type="submit"
                        variant="contained"
                        onClick={() =>EditMedicine(medicine)}
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
                        onClick={() => deleteMedicine(medicine.medicineId)}
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

MedicinesTable.propTypes = {
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
  deleteMedicine:PropTypes.func,
  EditMedicine:PropTypes.func
  
};
