import Button, { ButtonProps } from '../../Button';

type LinkButtonProps = Extract<ButtonProps, { to: string }>;
type ToMyPageButtonProps = Omit<LinkButtonProps, 'to' | 'children'>;

const ToMyPageButton = ({
  size = 'lg',
  variant = 'secondary',
  fullWidth = true,
  ...props
}: ToMyPageButtonProps) => {
  return (
    <Button to="/mypage" size={size} variant={variant} fullWidth={fullWidth} {...props}>
      マイページへ戻る
    </Button>
  );
};

export default ToMyPageButton;
