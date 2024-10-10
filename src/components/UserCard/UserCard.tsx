import {
  Box,
  Button,
  CircularProgress,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { userDataSelector } from "@redux/slices/user";
import { getUserLanguagePercentage } from "@redux/thunks/user";
import { RepoData } from "@redux/thunks/user/types";
import { addDataRows } from "@utils/addDataRows";
import { formattedDate } from "@utils/formattedDate";
import { useEffect, useMemo } from "react";
import styles from "./UserCard.module.scss";

export const UserCard = () => {
  const { user, repos, reposByPercentage, loading } =
    useAppSelector(userDataSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (repos) {
      dispatch(getUserLanguagePercentage(repos));
    }
  }, [repos, dispatch]);

  const rows = useMemo(() => repos.map(addDataRows), [repos]);

  return (
    <div className={styles.userCard}>
      <Typography
        variant="h3"
        sx={{
          textTransform: "uppercase",
        }}
      >
        {user.name}
      </Typography>
      <Typography variant="subtitle1">{user.bio}</Typography>
      <div className={styles.description}>
        <Link href={user.html_url}>
          <Button>Profile</Button>
        </Link>
        <Typography variant="subtitle2">
          Account created: {formattedDate(user.created_at)}
        </Typography>
      </div>
      {loading ? (
        <div className={styles.pieChartLoader}>
          <CircularProgress />
        </div>
      ) : (
        <div className={styles.chart}>
          {!reposByPercentage.length ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Typography color="warning">
                No data about used languages
              </Typography>
            </Box>
          ) : (
            <PieChart
              series={[
                {
                  highlightScope: { fade: "global", highlight: "item" },
                  data: reposByPercentage,
                },
              ]}
              width={500}
              height={200}
            />
          )}
        </div>
      )}
      <div className={styles.reposAmount}>
        Amount of repos: {user.public_repos}
      </div>
      <div>
        {!repos.length ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography color="warning">No public repositories</Typography>
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography>Repository</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography>Last update</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: RepoData) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Link href={row.html_url}>{row.name}</Link>
                    </TableCell>
                    <TableCell align="right">
                      {formattedDate(row.updated_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};
