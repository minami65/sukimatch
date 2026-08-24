import { ComponentProps, forwardRef } from 'react';

import styles from './Input.module.css';

export type InputProps = ComponentProps<'input'> & {
  label?: string;
  unit?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, unit, error, className = '', ...rest }, ref) => {
    return (
      <div className={`${styles.container} ${className}`}>
        {label && (
          <label htmlFor={rest.name} className={styles.label}>
            {label}
          </label>
        )}

        <div className={styles.inputGroup}>
          <input
            {...rest}
            ref={ref}
            id={rest.id || rest.name}
            className={`${styles.input} ${error ? styles.inputError : ''}`}
          />
          {unit && <span className={styles.unit}>{unit}</span>}
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
