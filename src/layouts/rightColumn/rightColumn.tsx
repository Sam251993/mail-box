import React, { useEffect, useState } from 'react';
import { useRef } from 'react'; 
import styles from './rightColumn.module.scss'; 
import { useStore } from '../../store/store';
import shallow from 'zustand/shallow'; 
import { Message } from '../../utils/interfaces';
import ConvHeader from './sections/convHeader/convHeader';
import ConvFooter from './sections/convFooter/convFooter';
import ConvBody from './sections/convBody/convBody';

// --- Component Props Interface ---
type ConversationsProps = Partial<{
  conversation: 'blankConversation',
  onClose: (conversation: any) => any, children?: any
}>;

export default function RightColumn({ conversation, onClose }: ConversationsProps): JSX.Element {
  const { messages, count, setMessage, activeConversation, activeUser } = useStore(
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
  const selectMessage = (msg: Message) => {
    if (msg._id === selectedMessage?._id) {
      setSelectedMessage(undefined);
    } else {
      setSelectedMessage(msg);
    }
  }

  const sendMessage = async () => {
    const msg = {
      text: mes,
      answered_to_id: selectedMessage?._id,
      from_email: activeConversation.email,
      from_id: activeConversation.id,
      title: title,
      date: new Date(),
      to_email: activeUser.email,
      to_id: activeUser.id
    };
    if (mes) {
      // const message = await setComment(msg);
      // if (message) {
      //   setMessage(message, conversation);
      // }
    }
  }
  useEffect(() => {
    lastMessage(count - 1);
  }, [count]);
  return (
    <div className={styles['message-details']}>
      <ConvHeader
        conversation={conversation}
        onClose={onClose}
      ></ConvHeader>

      <ConvBody></ConvBody>
      <ConvFooter></ConvFooter>
    </div>
  );
}
