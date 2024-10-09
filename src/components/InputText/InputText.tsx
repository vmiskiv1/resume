import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styles from './InputText.module.scss';
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { getUserData } from "@redux/thunks/user";
import { useNavigate } from "react-router-dom";
import { userDataSelector } from "@redux/slices/user";

export const InputText = () => {
  const [value, setValue] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useAppSelector(userDataSelector);

  useEffect(() => {
    if (user) {
      navigate(`/${user.login}`)
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const handleSumbit = async () => {
    dispatch(getUserData(value));
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSumbit();
    }
  }

  return (
    <div className={styles.inputTextWrapper}>
      <TextField
        id="filled-basic"
        label="Enter a github username"
        variant="filled"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        sx={{ width: '100%' }}
      />
      <Button
        variant="contained"
        onClick={handleSumbit}
      >
        {!loading ? `Search` : <CircularProgress />}
      </Button>
      <Typography variant="h5" color="error">
        {error}
      </Typography>
    </div>
  )
}
