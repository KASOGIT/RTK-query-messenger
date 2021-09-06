import React from 'react';
import { useRouter } from 'next/dist/client/router';

import PageTemplate from 'components/PageTemplate';
import { useGetConversationQuery } from 'redux/services/conversations';
import { useSelector } from 'react-redux';
import { isUserLoggedIn } from 'redux/features/authSlice';

import Conversation from 'components/Conversation';

function ConversationPage() {
  const router = useRouter();
  const id = Number.parseInt(router.query.id as string);

  const userLoggedIn = useSelector(isUserLoggedIn);

  const { data: conversation } = useGetConversationQuery(id, { skip: !userLoggedIn || undefined === router.query.id });

  const pageTitle = React.useMemo(() => {
    const sender = conversation?.senderNickname ?? 'Fetching name...';
    const recipient = conversation?.recipientNickname ?? 'Fetching name...';

    return `${sender} <> ${recipient}`;
  }, [conversation]);

  return (
    <PageTemplate protectedPage pageTitle={pageTitle}>
      {conversation && <Conversation conversation={conversation} />}
    </PageTemplate>
  );
}

export default ConversationPage;
