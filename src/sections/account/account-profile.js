import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { getInitials } from 'src/utils/get-initials';
import PropTypes from 'prop-types';
const user = {
  avatar: '/assets/avatars/avatar-anika-visser.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Anika Visser',
  timezone: 'GTM-7'
};

export const AccountProfile = (props) => {
  const {
    staff,
} = props;
console.log("staff..."+staff);
return (<Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar>
         {getInitials(staff.firstName)} </Avatar>
        <Typography
          gutterBottom
          variant="h5"
        >
          {staff.firstName}  {staff.lastName}
        </Typography>
        
        <Typography
          color="text.secondary"
          variant="body2"
        >
        </Typography>
      </Box>
    </CardContent>
  </Card>)
};

AccountProfile.prototype = {
  staff: PropTypes.array,
}