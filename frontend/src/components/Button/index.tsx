import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export type ButtonProps = BaseButtonProps &
  (
    | ({
        to?: typeof undefined;
      } & React.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ to: string } & Omit<LinkProps, 'to'>)
  );

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) => {
  const buttonClass = [
    styles['custom-btn'],
    styles[`custom-btn-${variant}`],
    styles[`custom-btn-${size}`],
    fullWidth ? styles['custom-btn-full'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if ('to' in props && props.to) {
    const { to, ...linkProps } = props;
    return (
      <Link to={to} className={buttonClass} {...(linkProps as any)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClass} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
};

export default Button;
