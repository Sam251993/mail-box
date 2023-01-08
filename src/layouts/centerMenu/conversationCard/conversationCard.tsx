import React from 'react';
import { Box, CardContent, IconButton, Typography, CardActions, Button } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { useTheme } from '@mui/material/styles';
import styles from './conversationCard.module.scss';
import Card from '@mui/material/Card';
import { User } from '@prisma/client';

interface Props {
    user: User;
    handleClick: (user: User) => void;
}

export default function ConversationCard({ user, handleClick }: Props) {
    const theme = useTheme();

    return (
        <Card className={styles['card-message']}>
            <CardContent sx={{ padding: 0 }}>
                <Box>
                    <IconButton aria-label="previous" sx={{ color: 'hsl(354deg 100% 75%)' }}>
                        {theme.direction === 'rtl' ? <CircleIcon /> : <CircleIcon sx={{ fontSize: '15px' }} />}
                    </IconButton>
                </Box>
                <div className={styles['username-style']} >
                    <h3>
                        <div key={user.id} className="resp-table-row">
                            <div className="table-body-cell">{user.name}</div>
                        </div>
                    </h3>
                    <img src={'https://cdn.create.vista.com/api/media/small/375805598/stock-vector-user-avatar-icon-vector-illustration'} alt="Logo" />
                </div>
                <Typography className={styles['message']} gutterBottom variant="h3" component="div" >
                    <h3>
                        <div key={user.id} className="resp-table-row">
                            <div className="table-body-cell">{user.email}</div>
                        </div>
                    </h3>
                    <p>A very warm welcome to you! It is lovely to have you among us! It is our great pleasure to have you on board!</p>
                </Typography>
            </CardContent>
            <CardActions sx={{ padding: '0 100px' }}>
                <Button size="small" onClick={() => handleClick(user)} >Answer</Button>
                <Button size="small">Ignore</Button>
            </CardActions>
        </Card>
    );
}