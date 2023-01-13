import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Typography } from '@mui/material';
import { useStore } from '../../../../store/store';
import shallow from 'zustand/shallow';
import { Comment } from '@prisma/client';

// --- Component Props Interface ---
type ConversationsProps = Partial<{
  conversation: 'blankConversation'
}>;

export default function ConvBody({ conversation }: ConversationsProps): JSX.Element {
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

  const [selectedMessage, setSelectedMessage] = useState<Comment>();
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMessage = (index: number) => {
    const container = containerRef.current;
    if (container) {
      [...container.children][index]?.scrollIntoView();
    }
  }
  const selectMessage = (msg: Comment) => {
    if (msg.id === selectedMessage?.id) {
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
          <div
            key={msg.id}
            className={`
              border-b
              ${msg.id === selectedMessage?.id ? 'bg-yellow-100' : ''}
            `}
            onClick={() => selectMessage(msg)}
          >
            <div className={'p-1.5 text-gray-600'} >
              <b>
                <div>
                  <div>{msg.from_email}</div>
                </div>
              </b>
            </div>
            <Typography className={'px-7 m-0 text-base text-gray-600'} gutterBottom variant="h3" component="div" >
              <div className="text-[20px] ">{msg.text}</div>
            </Typography>
            <Typography className={'px-7 m-0 text-base text-gray-600'} gutterBottom variant="overline" component="div" sx={{ textAlign: 'right' }} >
              {msg.date.toLocaleString()}
            </Typography>
          </div>)
        )}
    </div>
  );
}
