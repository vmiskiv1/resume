import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { userDataSelector } from "@redux/slices/user"
import { useNavigate } from "react-router-dom"
import { formattedDate } from "@utils/formattedDate"
import styles from './Resume.module.scss';
import { useEffect } from "react"
import { getUserLanguagePercentage, RepoData } from "@redux/thunks/user"
import { PieChart } from '@mui/x-charts/PieChart';
import { Link } from '@mui/material';

export const Resume = () => {
  const { user, repos, reposByPercentage, loading } = useAppSelector(userDataSelector)
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (repos) {
      dispatch(getUserLanguagePercentage(repos));
    }
  }, [repos, dispatch]);

  function createData(
    name: string,
    languages_url: string,
    updated_at: string,
    html_url: string,
  ) {
    return { name, languages_url, updated_at, html_url };
  }

  const rows = repos.map(repo =>
    createData(repo.name, repo.languages_url, repo.updated_at, repo.html_url)
  );

  console.log(rows)

  return (
    <div className={styles.resume}>

      <div className={styles.userCardWrapper}>
        <div>
          <Button variant="text" onClick={() => navigate('/')}>Back</Button>
        </div>

        {user ? <div className={styles.userCard}>
          <Typography variant="h3" sx={{ textTransform: 'uppercase' }}>{user.name}</Typography>
          <div className={styles.description}>
            <Link href={user.html_url}><Button>Profile</Button></Link>
            <Typography variant="subtitle2">Account created: {formattedDate(user.created_at)}</Typography>
          </div>
          <div className={styles.userCardUnderline} />
          {loading ?
            <div className={styles.pieChartLoader}>
              <CircularProgress />
            </div> : <div className={styles.chart}>
              <PieChart
                series={[
                  {
                    data: reposByPercentage
                  },
                ]}
                width={500}
                height={200}
              />
            </div>}
          <div className={styles.reposAmount}>Amount of repos: {user.public_repos}</div>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><Typography>Repository</Typography></TableCell>
                    <TableCell align="right"><Typography>Last update</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row: RepoData) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Link href={row.html_url}>{row.name}</Link>
                      </TableCell>
                      <TableCell align="right">{formattedDate(row.updated_at)}</TableCell>
                      {/* <TableCell align="right"><Link href={row.html_url}><Button variant="text">Link</Button></Link></TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div> : <Typography>User not found</Typography>}
      </div >
    </div>
  )
}
