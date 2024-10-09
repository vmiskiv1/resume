import styles from './Home.module.scss';
import { InputText } from "../../components/InputText/InputText";
import { Typography } from '@mui/material';

export const Home = () => {
  return (
    <div className={styles.home}>
      <InputText />
    </div >
  )
}
