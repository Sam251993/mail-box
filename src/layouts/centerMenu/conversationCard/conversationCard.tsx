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
        <Card className='mx-4 mb-4'>
            <CardContent sx={{ padding: 0 }}>
                <Box>
                    <IconButton aria-label="previous" sx={{ color: 'hsl(354deg 100% 75%)' }}>
                        {theme.direction === 'rtl' ? <CircleIcon /> : <CircleIcon sx={{ fontSize: '15px' }} />}
                    </IconButton>
                </Box>
                <div>
                    <h3 className='text-gray-600  px-24 text-[16px]  font-medium'>
                        <div key={user.id} className="resp-table-row">
                            <div className="table-body-cell">{user.name}</div>
                        </div>
                    </h3>
                    <img src={'https://cdn.create.vista.com/api/media/small/375805598/stock-vector-user-avatar-icon-vector-illustration'} alt="Logo" className=' w-12 h-12 ml-8  rounded-full' />
                </div>
                <Typography gutterBottom variant="h3" component="div" className='text-gray-600  px-24' >
                    <h3 className=' py-2'>
                        <div key={user.id} className="resp-table-row">
                            <div>{user.email}</div>
                        </div>
                    </h3>
                    <p className=' text-[16px] '>A very warm welcome to you! It is lovely to have you among us! It is our great pleasure to have you on board!</p>
                </Typography>
            </CardContent>
            <CardActions sx={{ padding: '0 100px' }}>
                <Button size="small" onClick={() => handleClick(user)} >Answer</Button>
                <Button size="small">Ignore</Button>
            </CardActions>
        </Card>
    );
}