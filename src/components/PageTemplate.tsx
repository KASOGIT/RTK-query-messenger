import React from 'react';

import { Box } from '@material-ui/system';

import PageHeader from './PageHeader';
import useAuthProtector from 'hooks/useAuthProtector';
import { Backdrop, CircularProgress } from '@material-ui/core';

interface Props {
  children: React.ReactNode;
  pageTitle: string;
  protectedPage?: boolean;
}

function PageTemplate(props: Props) {
  const { pageTitle, protectedPage = false, children } = props;

  const { isLogged } = useAuthProtector();

  if (!isLogged && protectedPage) {
    return (
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    );
  }

  return (
    <Box height="100%" width="100%" display="flex" flexDirection="column">
      <PageHeader pageTitle={pageTitle} />
      <Box display="flex" flexDirection="column" flex={1} padding={1} minHeight={0}>
        {children}
      </Box>
    </Box>
  );
}

export default PageTemplate;
