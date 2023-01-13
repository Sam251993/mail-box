import Grid2 from '@mui/material/Unstable_Grid2';
import shallow from 'zustand/shallow';
import { useStore } from '../../store/store';
import LeftColumn from '../centerMenu/centerMenu';
import CenterMenu from '../leftMenu/leftMenu';
import RightColumn from '../rightColumn/rightColumn'; 



export default function MainGrid() {
  const resetConversation = useStore(
    (store) => (store.resetConversation),
    shallow
  )

  const close = () => {
    resetConversation();
  }
  return (
      <Grid2 container rowSpacing={0}>
        <Grid2 xs={2}  className='border'>
          <CenterMenu />
        </Grid2 >
        <Grid2 className=' bg-slate-100 border-1' xs={4} >
            <LeftColumn/>
        </Grid2>
        <Grid2 className='border-l' xs={6}>
          <RightColumn onClose={close} />
        </Grid2>
      </Grid2>
  );
}
