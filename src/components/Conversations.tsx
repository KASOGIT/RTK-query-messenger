import React from 'react';
import { Box, Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector } from 'react-redux';

import { selectCurrentUser } from 'redux/features/authSlice';
import { useGetUserConversationsQuery } from 'redux/services/conversations';
import ConversationPreview from './ConversationPreview';
import { useRouter } from 'next/dist/client/router';

function Conversations() {
  const user = useSelector(selectCurrentUser);

  const { data: conversations } = useGetUserConversationsQuery(user?.id, { skip: !user?.id });

  const router = useRouter();

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      overflow="auto"
      flex={1}
      paddingBottom={1}
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {conversations &&
        conversations.length > 0 &&
        conversations.map((conversation, id) => (
          <ConversationPreview key={conversation.id} conversation={conversation} />
        ))}
      <Fab
        color="secondary"
        aria-label="edit"
        sx={{ position: 'absolute', right: 15, bottom: 15 }}
        onClick={() => router.push('/conversation/create')}
      >
        <EditIcon />
      </Fab>
    </Box>
  );
}

export default Conversations;
