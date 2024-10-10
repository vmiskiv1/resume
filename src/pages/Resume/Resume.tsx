import { UserCard } from "@components/UserCard/UserCard";
import { Button, Typography } from "@mui/material";
import { useAppSelector } from "@redux/hooks";
import { userDataSelector } from "@redux/slices/user";
import { useParams } from "react-router-dom";
import styles from "./Resume.module.scss";

export const Resume = () => {
  const { user } = useAppSelector(userDataSelector);

  const { username } = useParams();

  return (
    <div className={styles.resume}>
      {user.login !== username ? (
        <div className={styles.userNotFound}>
          <Typography variant="h4">User not found</Typography>
          <Button href="/">Go home</Button>
        </div>
      ) : (
        <div className={styles.userCardWrapper}>
          <UserCard />
        </div>
      )}
    </div>
  );
};
