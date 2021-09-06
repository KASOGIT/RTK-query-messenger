import React from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';

function useIsMobile(): boolean {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('mobile'));

  return isMobile;
}

export default useIsMobile;
