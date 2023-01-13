import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { TextField, Box, Typography } from '@mui/material'; 
import { useStore } from '../../../../store/store';
import shallow from 'zustand/shallow';
import Buttons from '../../buttons';

// --- Component Props Interface ---
type ConversationsProps = Partial<{
  conversation: 'blankConversation',
  onClose: (conversation: any) => any, children?: any
}>;

export default function ConvHeader({ conversation, onClose }: ConversationsProps): JSX.Element {
  const { messages, count, activeConversation } = useStore(
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

  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('Untitled');

  const currentMessage = messages.at(-1);
  const latestDate = currentMessage && currentMessage.date.toLocaleString();
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMessage = (index: number) => {
    const container = containerRef.current;
    if (container) {
      [...container.children][index]?.scrollIntoView();
    }
  }
  useEffect(() => {
    lastMessage(count - 1);
  }, [count]);
  return (
    <Box>
      <div className=' justify-between gap-1 flex items-center border-b-2 h-[86px]'>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={'https://cdn.create.vista.com/api/media/small/375805598/stock-vector-user-avatar-icon-vector-illustration'} alt="Logo" className=' w-12 h-12 ml-3  rounded-full' />
          <header>
            <div className=' justify-between gap-1 flex items-center'>
              <Typography variant="overline" color="text.secondary" sx={{ margin: '10px 0' }}>
                {title || currentMessage?.text}
              </Typography>

              <Typography variant="overline" color="text.secondary" sx={{ position: 'relative', margin: '10px' }}>
                {
                  conversation ?
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      size="small"
                      onChange={e => setEmail(e.target.value)}
                      placeholder='UNKNOWN@EMAIL.COM'
                    /> :
                    activeConversation.email
                }
              </Typography>
            </div>
            {
              latestDate ?
                <Typography variant="body2" color="text.secondary">
                  {latestDate}| To me
                </Typography> :
                ''
            }
          </header>
        </div>
        <div style={{ minWidth: '260px' }}>
          <Buttons conversation={conversation} onClose={() => onClose?.(conversation)} />
        </div>
      </div>
    </Box>
  );
}
