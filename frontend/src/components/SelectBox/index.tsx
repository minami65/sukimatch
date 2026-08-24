import { ComponentProps, forwardRef } from 'react';

import styles from './SelectBox.module.css';

export type Option = {
  value: string | number;
  label: string;
};

export type SelectBoxProps = ComponentProps<'select'> & {
  label?: string;
  options: Option[];
  error?: string;
};

export const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(
  ({ label, options, error, className = '', ...rest }, ref) => {
    return (
      <div className={`${styles.container} ${className}`}>
        {label && (
          <label htmlFor={rest.name} className={styles.label}>
            {label}
          </label>
        )}

        <select
          {...rest}
          ref={ref}
          id={rest.id || rest.name}
          className={`${styles.select} ${error ? styles.selectError : ''}`}
        >
          <option value="">選択してください</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    );
  },
);

SelectBox.displayName = 'SelectBox';
