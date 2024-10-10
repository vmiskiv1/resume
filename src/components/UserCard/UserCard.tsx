import { useWindowSize } from "@hooks/useWindowSize";
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
import { formattedDate } from "@utils/formattedDate";
import { getChartProps } from "@utils/getPieChartProps";
import { useEffect, useMemo } from "react";
import styles from "./UserCard.module.scss";

export const UserCard = () => {
  const { user, repos, reposByPercentage, loading } =
    useAppSelector(userDataSelector);

  const dispatch = useAppDispatch();

  const [width] = useWindowSize();

  const { legendProps, chartDimensions } = useMemo(
    () => getChartProps(width),
    [width]
  );

  useEffect(() => {
    if (repos) {
      dispatch(getUserLanguagePercentage(repos));
    }
  }, [repos, dispatch]);

  return (
    <div className={styles.userCard}>
      <Typography
        variant="h3"
        sx={{
          textTransform: "uppercase",
        }}
      >
        {user.name || "Github user"}
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
              slotProps={{
                legend: legendProps,
              }}
              width={chartDimensions.width}
              height={chartDimensions.height}
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
            <Table aria-label="simple table">
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
                {repos.map((repo: RepoData) => (
                  <TableRow
                    key={repo.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Link href={repo.html_url}>{repo.name}</Link>
                    </TableCell>
                    <TableCell align="right">
                      {formattedDate(repo.updated_at)}
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
