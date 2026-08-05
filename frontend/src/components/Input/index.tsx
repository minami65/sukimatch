import React from 'react';

import styles from './Input.module.css';

type InputProps = {
  label?: string;
  name: string;
  type?: 'text' | 'number' | 'email' | 'password';
  value: string | number | null | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  unit?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
};

export const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  unit,
  disabled = false,
  error,
  className = '',
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.inputGroup}>
        <input
          id={name}
          name={name}
          type={type}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
        />
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};
