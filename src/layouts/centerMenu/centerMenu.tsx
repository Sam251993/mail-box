import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, IconButton, Typography, Button, CardActions, OutlinedInput, InputAdornment } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import SearchIcon from '@mui/icons-material/Search';
import styles from './centerMenu.module.scss';
import shallow from 'zustand/shallow';
import { useStore } from '../../store/store';
import { getUserById } from '../../utils/api-helpers';
import { useRouter } from 'next/router';
import ConversationCard from './conversationCard/conversationCard';
import { Comment, User } from '@prisma/client';
import { api } from '../../utils/api';
import { useSession } from 'next-auth/react';

export default function LeftColumn() {
  const theme = useTheme();
  const { data: sessionData } = useSession();
  const { users, setMessages, setActiveConversation } = useStore(
    (store) => ({
      users: store.users,
      setMessages: store.setMessages,
      setActiveConversation: store.setActiveConversation
    }),
    shallow
  );

  const handleClick = async (user: User) => {
    const { data } = api.example.getComments.useQuery(
      undefined, // no input
      { enabled: sessionData?.user !== undefined },
    );
    if(data) {
      const messages: Comment[] = data;
      setActiveConversation(user);
      setMessages(messages);
    }

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
