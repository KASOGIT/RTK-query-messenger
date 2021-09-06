import React from 'react';

import PageTemplate from 'components/PageTemplate';
import Conversations from 'components/Conversations';

function Home() {
  return (
    <PageTemplate pageTitle="Conversations" protectedPage>
      <Conversations />
    </PageTemplate>
  );
}

export default Home;
