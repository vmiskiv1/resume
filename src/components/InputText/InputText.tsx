import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styles from './InputText.module.scss';
import { useAppDispatch } from "@redux/hooks";
import { getUserData } from "@redux/thunks/user";

export const InputText = () => {
  const [value, setValue] = useState('');

  const dispatch = useAppDispatch();

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
      <Button variant="contained" onClick={handleSumbit}>Search</Button>
    </div>
  )
}
