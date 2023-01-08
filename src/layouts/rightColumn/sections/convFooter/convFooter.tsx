import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Button, Paper, TextField } from '@mui/material';
import styles from './convFooter.module.scss';
import SendIcon from '@mui/icons-material/Send';
import { useStore } from '../../../../store/store';
import shallow from 'zustand/shallow'; 
import { setComment } from '../../../../utils/api-helpers';
import { Message } from '../../utils/interfaces'; 

// --- Component Props Interface ---
type ConversationsProps = Partial<{
  conversation: 'blankConversation',
  onClose: (conversation: any) => any, children?: any
}>;

export default function ConvFooter({ conversation }: ConversationsProps): JSX.Element  {
  const { count, setMessage, activeConversation, activeUser } = useStore(
    (currentStore) => {
      const store = conversation ? currentStore[conversation] : currentStore;
      return {
        messages: store.messages,
        setMessage: currentStore.setMessage,
        count: store.count,
        activeConversation: store.activeConversation,
        activeUser: currentStore.activeUser
      }
    },
    shallow
  );

  const [selectedMessage, setSelectedMessage] = useState<Message>();
  const [mes, setMes] = useState(''); 
  const [title, setTitle] = useState('Untitled'); 
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMessage = (index: number) => {
    const container = containerRef.current;
    if (container) {
      [...container.children][index]?.scrollIntoView();
    }
  }

  const sendMessage = async () => {
    const msg = {
      text: mes,
      answered_to_id: selectedMessage?._id,
      from_email: activeUser.email,
      from_id: activeUser._id,
      email: activeConversation.email,
      title: title,
      date: new Date(),
      to_email: activeConversation.email,
      to_id: activeConversation._id
    };
    if (mes) {
      const message = await setComment(msg);
      setMes('');
      setTitle('');
      if (message) {
        setMessage(message, conversation);
      }
    }
  }
  useEffect(() => {
    lastMessage(count - 1);
  }, [count]);
  return (
    <Paper elevation={1} className={styles['quick-reply']}>
      <div className={styles['text-field']}>
        <TextField
          sx={{ width: '100%' }}
          label="Title:"
          variant="filled"
          size="small"
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
        <TextField
          sx={{ width: '100%' }}
          label="Quick reply to User:"
          variant="filled"
          multiline
          rows={3}
          onChange={e => setMes(e.target.value)}
          value={mes}
        />
        {
          selectedMessage &&
          <>
            <span>{selectedMessage.from_email} {selectedMessage.date.toLocaleString()} wrote:</span>
            <span>{selectedMessage.text}</span> 
          </>
        }
      </div>
      <Button
        sx={{ right: '0', bottom: '0' }}
        variant="contained" 
        onClick={() => sendMessage()}>
        <SendIcon fontSize="small"></SendIcon>Send
      </Button>            
    </Paper> 
  );
}
