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
          {/* <div className={styles.userCard}>
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
                  <Typography color="warning">
                    No public repositories
                  </Typography>
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
          </div> */}
        </div>
      )}
    </div>
  );
};
