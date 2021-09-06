import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'redux/features/authSlice';
import { useGetUserQuery } from 'redux/services/users';

function useAuthProtector() {
  const currentUser = useSelector(selectCurrentUser);
  const router = useRouter();

  const { data: userData, isLoading } = useGetUserQuery(currentUser?.id, { skip: !currentUser?.id });

  React.useEffect(() => {
    if (isLoading) {
      return;
    }

    if (userData && currentUser) {
      if (router.asPath === '/login') {
        router.push('/');
      }
    }

    if ((!userData || !currentUser) && router.asPath !== '/login') {
      router.push('/login');
    }
  }, [isLoading, userData, currentUser, router]);

  return { isLogged: !!userData && !!currentUser, isLoading };
}

export default useAuthProtector;
