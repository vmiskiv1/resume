import {
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
import { PieChart } from "@mui/x-charts/PieChart";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { userDataSelector } from "@redux/slices/user";
import { getUserLanguagePercentage, RepoData } from "@redux/thunks/user";
import { formattedDate } from "@utils/formattedDate";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Resume.module.scss";

export const Resume = () => {
  const { user, repos, reposByPercentage, loading } =
    useAppSelector(userDataSelector);

  const dispatch = useAppDispatch();

  const { username } = useParams();

  useEffect(() => {
    if (repos) {
      dispatch(getUserLanguagePercentage(repos));
    }
  }, [repos, dispatch]);

  function createData(
    name: string,
    languages_url: string,
    updated_at: string,
    html_url: string
  ) {
    return { name, languages_url, updated_at, html_url };
  }

  const rows = repos.map((repo: RepoData) =>
    createData(repo.name, repo.languages_url, repo.updated_at, repo.html_url)
  );

  return (
    <div className={styles.resume}>
      {user.login !== username ? (
        <div className={styles.userNotFound}>
          <Typography variant="h4">User not found</Typography>
          <Button href="/">Go home</Button>
        </div>
      ) : (
        <div className={styles.userCardWrapper}>
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
              </div>
            )}
            <div className={styles.reposAmount}>
              Amount of repos: {user.public_repos}
            </div>
            <div>
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
                        key={row.name}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
