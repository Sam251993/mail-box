import React from 'react';
import { IconButton, OutlinedInput, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './centerMenu.module.scss';
import shallow from 'zustand/shallow';
import { useStore } from '../../store/store';
import ConversationCard from './conversationCard/conversationCard';
import type { User } from '@prisma/client';
import { api } from '../../utils/api';

export default function LeftColumn() {
  const { users, setMessages, setActiveConversation } = useStore(
    (store) => ({
      users: store.users,
      setMessages: store.setMessages,
      setActiveConversation: store.setActiveConversation
    }),
    shallow
  );

  const getMessage = api.comment.getComments.useMutation({
    onSuccess: (data,) => {
      data && setMessages(data);
    }
  });

  const handleClick = (user: User) => {
    getMessage.mutate( { email: user.email} );
    setActiveConversation(user);

  };

  return (

    <div className={styles['column']}>
      <div className={styles['search']}>
        <div>
          <OutlinedInput
            sx={{ width: '100%', background: '#f3f4f8' }}
            id="outlined-adornment-password"
            type="text"
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
      </div>
      <div className={styles['column']} style={{ overflowY: 'auto', height: 'calc(100vh - 86px)' }}> <h2>Today</h2>
        {
          users.map((user) => (
            <div key={user.id}>
              <ConversationCard key={user.id} user={user} handleClick={handleClick} />
            </div>
          ))
        }
      </div>
    </div>
  );
}
