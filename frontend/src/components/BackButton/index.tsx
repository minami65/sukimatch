// components/BackButton.tsx
import React from 'react';

import styles from './BackButton.module.css';

type BackButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
};

export const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  size = 'md',
  disabled = false,
  ariaLabel = '前のページに戻る',
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${styles.backButton} ${styles[size]} ${className}`}
      aria-label={ariaLabel}
    >
      <svg className={styles.backIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  );
};
