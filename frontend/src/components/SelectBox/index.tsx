import React from 'react';

import styles from './SelectBox.module.css';

export type Option = {
  value: string | number;
  label: string;
};

type SelectBoxProps = {
  label?: string;
  name: string;
  value: string | number | null | undefined;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
};

export const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  placeholder = '選択してください',
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

      <select
        id={name}
        name={name}
        value={value ?? ''}
        onChange={onChange}
        disabled={disabled}
        className={`${styles.select} ${error ? styles.selectError : ''}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};
