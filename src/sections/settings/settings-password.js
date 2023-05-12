import { useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField, Typography
} from '@mui/material';
import UserService from 'src/services/UserService';
import { useAuth } from 'src/hooks/use-auth';
import { useRouter } from 'next/navigation';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export const SettingsPassword = () => {
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });
  const router = useRouter();
  const auth = useAuth();
  const [updatepasswordPopoup, setpasswordPopup] = useState(false);
  const [isError, setError] = useState(false);
  const [message, setMessage] = useState(0);
  const handleChange = useCallback(
    (event) => {
      setError(false);
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleClose = () => {
    (false);
    setpasswordPopup(false)
    auth.signOut();
    router.push('/auth/login');


  };

  const updatePassword = () => {

    if (values.password == values.confirm) {
      const userdetail = JSON.parse(localStorage.getItem('user'));

      const user = {
        username: userdetail.username,
        password: values.password
      }
      try {
        UserService.updatePassword(user)
          .then(response => {
            setMessage(response.data.message)
            setpasswordPopup(true);
          })
          .catch(e => {
            console.log(e);
          });

      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
    else {
      setError(true);
      //event.preventDefault();
    }



  }

  return (
    <form >
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >
            <TextField
              fullWidth
              label="Password"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            <TextField
              fullWidth
              label="Password (Confirm)"
              name="confirm"
              onChange={handleChange}
              type="password"
              value={values.confirm}
            />

            <Dialog
              open={updatepasswordPopoup}
              onClose={handleClose}
                 >

              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {message}
                </DialogContentText>
              </DialogContent>
              <DialogActions>

                <Button onClick={handleClose} autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>



            {isError ? <Typography
              color="error"
              sx={{ mt: 3 }}
              variant="body2"
            >
              Password not matched.
            </Typography> : <></>}
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-start' }}>
          <Button variant="contained"
            onClick={updatePassword}
          >
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
