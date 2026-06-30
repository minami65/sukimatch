import { useAuth } from '@/layouts/AuthLayout';

import Button, { ButtonProps } from '../../Button';

type LogOutButtonProps = ButtonProps;

const LogOutButton = ({
  size = 'md',
  variant = 'outline',
  fullWidth = false,
  ...props
}: LogOutButtonProps) => {
  const { logout } = useAuth();
  return (
    <Button size={size} variant={variant} fullWidth={fullWidth} {...props} onClick={logout}>
      ログアウト
    </Button>
  );
};

export default LogOutButton;
