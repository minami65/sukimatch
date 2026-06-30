import { createContext, useContext, useEffect } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { FullPageLoading } from '@/components/Loading/FullPageLoading';

import { useGetMeUserMeGet, useLogoutLogoutPost } from '@/api/generated/endpoints/api';

interface AuthContextType {
  user: any;
  isLoading: boolean;
  isLoggedIn: boolean;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

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
        navigate('/');
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth は AuthLayout の中でしか使えません！');
  }
  return context;
};
