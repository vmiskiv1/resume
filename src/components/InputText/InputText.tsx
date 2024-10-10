/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { clearError, userDataSelector } from "@redux/slices/user";
import { getUserData } from "@redux/thunks/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./InputText.module.scss";

export const InputText = () => {
  const [value, setValue] = useState("");
  const [inputTextError, setInputTextError] = useState("");

  const [isSearchInitiated, setIsSearchInitiated] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useAppSelector(userDataSelector);

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }

    if (isSearchInitiated && user) {
      navigate(`/${user.login}`);
      setIsSearchInitiated(false);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    setIsSearchInitiated(true);

    if (value.length < 2) {
      setInputTextError("Username must be at least 2 characters long.");
      setIsSearchInitiated(false);

      return;
    }

    dispatch(getUserData(value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={styles.inputTextWrapper}>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        Github profile finder
      </Typography>
      <TextField
        id="outlined-search"
        label="Enter a github username"
        type="search"
        value={value}
        error={!!inputTextError}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        sx={{ width: "100%" }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        {!loading ? (
          `Search`
        ) : (
          <CircularProgress size={24} sx={{ color: "#fff" }} />
        )}
      </Button>
      <div className={styles.inputTextError}>
        {inputTextError && (
          <Typography variant="subtitle1" color="warning">
            {inputTextError}
          </Typography>
        )}

        <Typography variant="subtitle1" color="warning">
          {error}
        </Typography>
      </div>
    </div>
  );
};
