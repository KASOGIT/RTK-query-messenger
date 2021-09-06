import React from 'react';
import { Box, Button, IconButton, InputAdornment, TextField } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import SendIcon from '@material-ui/icons/Send';

import { useGetMessagesForConversationQuery, usePostMessageMutation } from 'redux/services/messages';
import { Conversation as ConversationType } from 'types/conversation';

import Message from 'components/Message';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'redux/features/authSlice';
import { useRouter } from 'next/dist/client/router';
import { useFormik } from 'formik';

interface ConversationProps {
  conversation: ConversationType;
}

function Conversation({ conversation }: ConversationProps) {
  const { data: messages } = useGetMessagesForConversationQuery(conversation.id);
  const currentUser = useSelector(selectCurrentUser);

  const [postMessage] = usePostMessageMutation();

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values, { resetForm }) => {
      postMessage({
        timestamp: Date.now(),
        body: values.body,
        conversationId: conversation.id,
        authorId: currentUser.id,
      });
      resetForm();
    },
  });

  const router = useRouter();

  const lastMessageRef = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    if (lastMessageRef?.current !== undefined && messages) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  return (
    <Box display="flex" flexDirection="column" flex={1} component="form" onSubmit={formik.handleSubmit} minHeight={0}>
      <Box width="64px">
        <Button variant="contained" startIcon={<KeyboardArrowLeftIcon />} onClick={() => router.push('/')}>
          Back
        </Button>
      </Box>
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        alignItems="center"
        maxWidth="800px"
        width="100%"
        alignSelf="center"
        overflow="auto"
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {messages &&
          messages.map((message, i) => (
            <Message
              key={message.id}
              message={message}
              isSender={message.authorId === currentUser.id}
              ref={i === messages.length - 1 ? lastMessageRef : undefined}
            />
          ))}
      </Box>
      <Box
        alignSelf="center"
        width="100%"
        maxWidth="600px"
        marginY={2}
        sx={{
          '& .MuiInputBase-root': {
            borderRadius: '20px',
          },
        }}
      >
        <TextField
          autoFocus
          id="body"
          name="body"
          value={formik.values.body}
          onChange={formik.handleChange}
          fullWidth
          size="small"
          placeholder="Type a message..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={formik.submitForm}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}

export default Conversation;
