import React from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const buttonClass = [
    styles['custom-btn'],
    styles[`custom-btn-${variant}`],
    styles[`custom-btn-${size}`],
    fullWidth ? styles['custom-btn-full'] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClass} 
      disabled={disabled} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;