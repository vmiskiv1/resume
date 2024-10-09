import styles from './Home.module.scss';
import { InputText } from "../../components/InputText/InputText";
import { Typography } from '@mui/material';

export const Home = () => {
  return (
    <div className={styles.home}>
      <Typography variant="h2" component="h2" gutterBottom sx={{ color: 'white' }}>
        Github profile finder
      </Typography>
      <InputText />
    </div >
  )
}
