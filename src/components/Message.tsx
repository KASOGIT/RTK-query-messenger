import { Box, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useGetUserQuery } from 'redux/services/users';
import { Message as MessageType } from 'types/message';

interface MessageProps {
  message: MessageType;
  isSender: boolean;
}

function Message(props: MessageProps, ref) {
  const { message, isSender } = props;

  const { data: userData } = useGetUserQuery(message.authorId);

  return (
    <Box ref={ref} marginTop={2} alignSelf={isSender ? 'flex-end' : 'flex-start'} maxWidth="70%">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="caption" color={isSender ? 'primary.main' : 'secondary.main'}>
          {isSender ? 'You' : userData?.nickname ?? 'fetching name..'}
        </Typography>
        <Typography variant="caption" color={isSender ? 'primary.main' : 'secondary.main'}>
          {new Date(message.timestamp).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
        </Typography>
      </Box>
      <Box
        component={Paper}
        variant="outlined"
        padding={1}
        borderRadius={3}
        sx={{
          border: 1.5,
          borderColor: isSender ? 'primary.main' : 'secondary.main',
        }}
      >
        <Typography>{message.body}</Typography>
      </Box>
    </Box>
  );
}

export default React.forwardRef(Message);
