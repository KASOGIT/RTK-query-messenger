import React from 'react';

import PageTemplate from 'components/PageTemplate';
import { useGetUsersQuery } from 'redux/services/users';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'redux/features/authSlice';
import { Autocomplete, Box, Button, TextField } from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';
import { useRouter } from 'next/dist/client/router';
import { useCreateConversationMutation } from 'redux/services/conversations';
import { User } from 'types/user';

function CreateConversationPage() {
  const { data: users } = useGetUsersQuery();
  const currentUser = useSelector(selectCurrentUser);

  const otherUsers = React.useMemo(() => {
    if (!currentUser || !users) {
      return [];
    }

    return users.filter((user) => user.id !== currentUser.id);
  }, [users, currentUser]);

  const router = useRouter();

  const [create, { data: createdConversation, isLoading }] = useCreateConversationMutation();

  React.useEffect(() => {
    if (createdConversation) {
      router.push(`/conversation/${createdConversation.id}`);
    }
  }, [createdConversation, router]);

  return (
    <PageTemplate protectedPage pageTitle="New conversation">
      <Box width="100%" display="flex" flexDirection="column" alignItems="center">
        <Box width="100%" display="flex" flexDirection="column" maxWidth="500px">
          {otherUsers && otherUsers.length > 0 && (
            <Autocomplete
              fullWidth
              loading={isLoading}
              onChange={(_, value: User) => {
                create({
                  recipientId: value.id,
                  recipientNickname: value.nickname,
                  senderId: currentUser.id,
                  senderNickname: currentUser.nickname,
                });
              }}
              getOptionLabel={(option) => option.nickname}
              options={otherUsers}
              renderInput={(params) => <TextField {...params} label="Search user.." variant="standard" />}
            />
          )}
          <Button
            fullWidth
            sx={{ marginTop: 2 }}
            size="small"
            variant="contained"
            color="primary"
            onClick={router.back}
            startIcon={<KeyboardArrowLeft />}
          >
            Back
          </Button>
        </Box>
      </Box>
    </PageTemplate>
  );
}

export default CreateConversationPage;
