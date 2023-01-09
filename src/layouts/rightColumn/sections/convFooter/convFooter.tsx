import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Button, Paper, TextField } from '@mui/material';
import styles from './convFooter.module.scss';
import SendIcon from '@mui/icons-material/Send';
import { useStore } from '../../../../store/store';
import shallow from 'zustand/shallow';
import type { Comment } from '@prisma/client';
import { api } from '../../../../utils/api';

// --- Component Props Interface ---
type ConversationsProps = Partial<{
  conversation: 'blankConversation',
  onClose: (conversation: string) => void,
  children?: JSX.Element
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

  const [selectedMessage] = useState<Comment>();
  const [mes, setMes] = useState(''); 
  const [title, setTitle] = useState('Untitled'); 
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMessage = (index: number) => {
    const container = containerRef.current;
    if (container) {
      [...container.children][index]?.scrollIntoView();
    }
  }

  const postMessage = api.comment.postMessage.useMutation({
    onSuccess: (data) => {
      setMes('');
      setTitle('');
      data && setMessage(data, conversation);
    }
  });

  const sendMessage = async () => {
    const msg = {
      text: mes,
      answered_to_id: selectedMessage?.id,
      from_email: activeUser.email,
      from_id: activeUser.id,
      email: activeConversation.email,
      title: title,
      date: new Date(),
      to_email: activeConversation.email,
      to_id: activeConversation.id
    };
    if (mes) {
      postMessage.mutate(msg);
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
