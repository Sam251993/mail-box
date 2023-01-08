import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CancelIcon from '@mui/icons-material/Cancel';
import { useStore } from '../../store/store';
import shallow from 'zustand/shallow';

type ButtonsProp = Partial<{
  conversation: 'blankConversation',
  onClose: () => any
}>;

export default function Buttons({ conversation, onClose }: ButtonsProp) {
  const { messages, count, setCount } = useStore(
    (currentStore) => {
      const store = conversation ? currentStore[conversation] : currentStore;
      return {
        messages: store.messages,
        count: store.count,
        setCount: currentStore.setCount
      }
    },
    shallow
  );

  useEffect(() => {
    setCount(messages.length)
  }, [messages]);

  const close = () => onClose?.();
  return (
    <Box
      sx={{
        color: 'action.active',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}
    >
      <div>
        <span style={{marginRight: '5px'}}>
          {messages.length ? `${count}/${messages.length}` : ''}
        </span>
        <Button
          variant="outlined"
          aria-label="reduce"
          onClick={() => {
            setCount(Math.max(count - 1, 1));
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </Button>
        <Button
          variant="outlined"
          aria-label="increase"
          onClick={() => {
            if (count < messages.length) {
              setCount(count + 1);
            }
          }}
        >
          <ArrowForwardIcon fontSize="small" />
        </Button>
        <Button variant="outlined" sx={{ margin: '5px' }} onClick={() => close()}>
          <CancelIcon fontSize="small" />
        </Button>
      </div>
    </Box>
  );
}
