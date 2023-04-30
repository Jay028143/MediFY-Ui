import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Typography, Popover, Button, Card, TextField, InputAdornment, OutlinedInput, SvgIcon, Box, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { alpha } from '@mui/material/styles';
const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;
export const OrdersSearch = (props) => {

  const {
    medicines,

  } = props;
  console.log("daaaaaaaaaaa." + JSON.stringify(medicines));
  const [idcheck, setIdcheck] = useState(false);

  const handleIdCheck = (medicine) => {
    
      if(medicine.idcheck=="Y")
      {
        setIdcheck(true);
      }
  };
  return (<>
    <Card sx={{ p: 2, width: 300 }}>

      <Stack
        alignItems="left"
        direction="row"
        spacing={2}
      >
        <TextField

          name="storeId"
          //placeholder='Medicine'
          label="Medicine"
          select
          SelectProps={{ native: true }}

        //onChange={handleStore}
        //onClick={retrieveStores}
        >
          <option value='-1'
            key='-1'
            selected>
            Select Medicine
          </option>
          {medicines.map((option) => (

            <option
              onChange={() =>  handleIdCheck(option) }
              key={option.medicineId}
              value={option.medicineId}
            >
              {option.medicineName}
            </option>
          ))}
        </TextField>

        <Button
          startIcon={(
            <SvgIcon fontSize="small">
              <PlusIcon />
            </SvgIcon>
          )}
          variant="contained"
          //onClick={() =>handleAddOrder(true)}

          underline="hover"
        >
          Add
        </Button>
      </Stack>
     {idcheck? <Stack>
        <Popover
          anchorEl={anchorEl}
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'bottom'
          }}
          onClose={onClose}
          open={open}
          PaperProps={{ sx: { width: 200 } }}
        >
          <Box
            sx={{
              py: 1.5,
              px: 2
            }}
          >
            <Typography variant="overline">
              Account
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              Id Check Required
            </Typography>
          </Box>

        </Popover>

      </Stack>:<></>}


    </Card></>);
};

OrdersSearch.prototype = {
  medicines: PropTypes.array,
  handleAddStore: PropTypes.func,
}