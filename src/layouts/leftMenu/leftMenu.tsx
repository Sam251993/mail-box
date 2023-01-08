import React, { useEffect, useState } from 'react';
import { AccordionSummary, Accordion, AccordionDetails, Typography, Divider, MenuList, MenuItem, ListItemText, ListItemIcon, Button } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import GroupIcon from '@mui/icons-material/Group';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
// import Link from '@mui/material/Link';
import Link from 'next/link';
import Cloud from '@mui/icons-material/Cloud';
import MailIcon from '@mui/icons-material/Mail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import styles from './leftMenu.module.scss';
import { useStore } from '../../store/store';
import shallow from "zustand/shallow";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Drawer  from '@mui/material/Drawer';
import RightColumn from '../rightColumn/rightColumn';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

export default function LeftMenu(props: any) {
  const [selectedMenu, setSelectedMenu] = React.useState<number>();
  const [open, setOpen] = useState<boolean>(false);
  const resetConversation = useStore(
    (store) => (store.resetConversation),
    shallow
  )

  const close = (convesation = 'blankConvesation') => {
    setOpen(false);
    resetConversation(convesation);
  }

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedMenu(index);
  };

  const refreshPage = () => {
    window.location.reload();
  } 

  return (
    <div className="leftMenu" >
      {/* <Link href={`/inbox`}>test</Link> */}
      <div>
        <div>
          <MenuList>
            <div className={styles['logo-container']}>
              <div onClick={refreshPage}><MailOutlineIcon sx={{verticalAlign: 'top', height: '20px'}}/> QQ Mailbox</div>
              <div>
                <Button variant="contained" onClick={ () => setOpen(true)}>Send</Button>
              </div>
            </div>
              <MenuItem
                component={Link}
                href="/inbox"
                selected={0 === selectedMenu}
              >
                <ListItemIcon>
                  <MailIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText> Inbox
                </ListItemText>
                <Typography variant="body2" color="text.secondary">
                  226
                </Typography>
              </MenuItem>
              <MenuItem
                selected={1 === selectedMenu}
                onClick={(event) => handleChange(event, 1)}
              >
                <ListItemIcon>
                  <StarOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Star</ListItemText>
                <Typography variant="body2" color="text.secondary">
                  22
                </Typography>
              </MenuItem>
              <MenuItem
                selected={2 === selectedMenu}
                onClick={(event) => handleChange(event, 2)}
              >
                <ListItemIcon>
                  <GroupIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Group</ListItemText>
                <Typography variant="body2" color="text.secondary">
                  1
                </Typography>
              </MenuItem>
              <MenuItem
                selected={3 === selectedMenu}
                onClick={(event) => handleChange(event, 3 )}>
                <ListItemIcon>
                  <AlternateEmailIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Address</ListItemText>
                <Typography variant="body2" color="text.secondary">
                  
                </Typography>
              </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Cloud fontSize="small" />
              </ListItemIcon>
              <ListItemText>Web Clipboard</ListItemText>
            </MenuItem>
          </MenuList>
        </div>

        <Accordion disableGutters sx={{ margin: '0!important', boxShadow: 'none' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Mailbox folder</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MenuItem>
                <ListItemIcon>
                  <DescriptionIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Draft box</ListItemText>
                <Typography variant="body2" color="text.secondary">
                  
                </Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <SendIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Send</ListItemText>
                <Typography variant="body2" color="text.secondary">
                  
                </Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
                <Typography variant="body2" color="text.secondary">
                  
                </Typography>
              </MenuItem>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters sx={{ margin: 0, boxShadow: 'none' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Other tools</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MenuItem>
                  <ListItemIcon>
                    <AttachFileIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Annex</ListItemText>
                  <Typography variant="body2" color="text.secondary">
                    
                  </Typography>
                </MenuItem>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters sx={{ margin: 0, boxShadow: 'none' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Disabled Accordion</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Link href="/posts/hook">Hook</Link>
              <Link href="/posts/table">Table</Link>
              <Link href="/posts/color">Color</Link>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
        <Drawer
          sx={{ position: 'absolute', width: '100%' }}
          anchor="right"
          open={open}
          // onOpen={()=> {}}
          onClose={()=>close()}
          // @ts-ignores
          PaperProps={{ component: Grid2, xs: 6, container: true }}
        >
          <RightColumn conversation='blankConversation' onClose={close} />
        </Drawer >
   </div>
  );
}