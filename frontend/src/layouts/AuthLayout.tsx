import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { FullPageLoading } from '@/components/Loading/FullPageLoading';

import { AuthContext } from '@/hooks/useAuth';

import { useGetMeUserMeGet, useLogoutLogoutPost } from '@/api/generated/endpoints/api';

export const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const queryClient = useQueryClient();

  const {
    data: currentUser,
    isLoading,
    isError,
  } = useGetMeUserMeGet({
    query: { enabled: !!token },
  });

  const { mutate: executeApiLogout } = useLogoutLogoutPost();

  useEffect(() => {
    if (!token && location.pathname !== '/login') {
      navigate('/login');
      return;
    }
    if (token && isError && location.pathname !== '/login') {
      localStorage.removeItem('token');
      navigate('/login?reason=expired');
    }
  }, [token, isError, location.pathname, navigate]);

  const logout = () => {
    executeApiLogout(undefined, {
      onSuccess: () => {
        localStorage.removeItem('token');
        queryClient.clear();
        window.location.href = '/login';
      },
    });
  };

  if (token && isLoading) return <FullPageLoading />;

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        isLoading: token ? isLoading : false,
        isLoggedIn: !!currentUser,
        logout,
      }}
    >
      <Outlet />
    </AuthContext.Provider>
  );
};
