import Grid2 from '@mui/material/Unstable_Grid2';
import shallow from 'zustand/shallow';
import { useStore } from '../../store/store';
import LeftColumn from '../centerMenu/centerMenu';
import CenterMenu from '../leftMenu/leftMenu';
import RightColumn from '../rightColumn/rightColumn';
import styles from './grid.module.scss';



export default function MainGrid() {
  const resetConversation = useStore(
    (store) => (store.resetConversation),
    shallow
  )

  const close = () => {
    resetConversation();
  }
  return (
      <Grid2 className={styles['msg-columns']} container rowSpacing={0}>
        <Grid2 xs={2}>
          <CenterMenu />
        </Grid2>
        <Grid2 className={styles.conversations} xs={4}>
            <LeftColumn/>
        </Grid2>
        <Grid2 xs={6}>
          <RightColumn onClose={close} />
        </Grid2>
      </Grid2>
  );
}
