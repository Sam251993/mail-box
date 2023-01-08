import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Typography } from '@mui/material';
import styles from './convBody.module.scss';
import { useStore } from '../../../../store/store';
import shallow from 'zustand/shallow';
import { Message } from '../../utils/interfaces';

// --- Component Props Interface ---
type ConversationsProps = Partial<{
  conversation: 'blankConversation'
}>;

export default function ConvBody({ conversation }: ConversationsProps): JSX.Element  {
  const { messages, count } = useStore(
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
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMessage = (index: number) => {
    const container = containerRef.current;
    if (container) {
      [...container.children][index]?.scrollIntoView();
    }
  }
  const selectMessage = (msg: Message) => {
    if(msg._id === selectedMessage?._id) {
      setSelectedMessage(undefined);
    } else {
      setSelectedMessage(msg);
    }
  }
 
  useEffect(() => {
    lastMessage(count - 1);
  }, [count]);
  return (
    <div ref={containerRef} style={{ overflowY: 'auto', margin: '15px' }}>
      {
        messages.map((msg, i) => (
          <div key={msg._id} className={`
              ${styles['message-border']}
              ${msg._id === selectedMessage?._id ? styles['message-active'] : ''}
            `}
          onClick={() => selectMessage(msg)}
          >
            <div className={styles['userame-style']} >
              <b>
                <div>
                  <div>{msg.from_email}</div>
                </div>
              </b>
            </div>
            <Typography className={styles['message']} gutterBottom variant="h3" component="div" >
              <div>{msg.text}</div>
            </Typography>
            <Typography className={styles['message']} gutterBottom variant="overline" component="div" sx={{ textAlign: 'right' }} >
              {msg.date.toLocaleString()}
            </Typography>
          </div>)
        )}
    </div>
  );
}
