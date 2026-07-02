import { useNavigate } from 'react-router-dom';

import { useRegisterUserPost } from '@/api/generated/endpoints/api';
import { UserResponse } from '@/api/generated/models';
import type { UserCreate } from '@/api/generated/models/userCreate';

export const useRegister = () => {
  const { mutate, isPending, error } = useRegisterUserPost();

  const registerUser = (
    userData: UserCreate,
    options?: {
      onSuccess?: (data: UserResponse) => void;
      onError?: (message: string) => void;
    },
  ) => {
    mutate(
      { data: userData },
      {
        onSuccess: (response) => {
          if (response?.user_id) {
            localStorage.setItem('loginUserId', String(response.user_id));
          }

          if (options?.onSuccess) options.onSuccess(response);
        },
        onError: (err: any) => {
          const errorMessage = err.response?.data?.detail ?? '登録に失敗しました。';
          if (options?.onError) options.onError(errorMessage);
        },
      },
    );
  };

  return {
    registerUser,
    isRegistering: isPending,
    registerError: error,
  };
};
