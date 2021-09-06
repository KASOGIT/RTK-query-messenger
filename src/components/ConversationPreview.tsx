import { Avatar, Box, Paper, Typography } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import React from 'react';
import { useGetMessagesForConversationQuery } from 'redux/services/messages';
import { useGetUserQuery } from 'redux/services/users';
import { Conversation } from 'types/conversation';

interface ConversationPreviewProps {
  conversation: Conversation;
}

function ConversationPreview(props: ConversationPreviewProps, ref) {
  const { conversation } = props;

  const { data: recipientUserData } = useGetUserQuery(conversation.recipientId);
  const { data: messages } = useGetMessagesForConversationQuery(conversation.id);

  const lastMessage = messages?.[messages.length - 1];

  const router = useRouter();

  if (!recipientUserData) {
    return null;
  }

  return (
    <Box
      ref={ref}
      padding={1}
      component={Paper}
      borderRadius="20px"
      elevation={2}
      marginTop={1}
      display="flex"
      maxWidth="600px"
      width="100%"
      sx={{ cursor: 'pointer' }}
      onClick={() => router.push(`/conversation/${conversation.id}`)}
    >
      <Avatar src={recipientUserData.avatarUrl} sx={{ width: '60px', height: '60px' }} />
      <Box marginLeft={1} flex={1}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            variant="body1"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.2em',
            }}
          >
            {conversation.recipientNickname}
          </Typography>
          {lastMessage && (
            <Typography variant="caption">
              {new Date(lastMessage.timestamp).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
          )}
        </Box>
        <Box>
          {lastMessage && (
            <Typography
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '200px',
                fontStyle: 'italic',
              }}
            >
              {lastMessage.body}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default React.forwardRef(ConversationPreview);
