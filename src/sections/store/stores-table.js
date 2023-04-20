import PropTypes from 'prop-types';
import { format } from 'date-fns';
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

export const StoresTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
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
                 Update
                </TableCell>
                <TableCell>
                 Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((store) => {
                const isSelected = selected.includes(store.id);
                const createdAt = format(store.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={store.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(store.id);
                          } else {
                            onDeselectOne?.(store.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={store.avatar}>
                          {getInitials(store.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {store.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {store.email}
                    </TableCell>
                    <TableCell>
                      {store.address.city}, {store.address.state}, {store.address.country}
                    </TableCell>
                    <TableCell>
                      {store.phone}
                    </TableCell>
                    <TableCell>
                      {createdAt}
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
  selected: PropTypes.array
};
