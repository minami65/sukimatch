import React, { ChangeEvent, useEffect, useRef } from 'react';

import styles from './Textarea.module.css';

type TextareaProps = {
  label?: string;
  name: string;
  value: string | null | undefined;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  minRows?: number;
  maxLength?: number;
  disabled?: boolean;
  error?: string;
  className?: string;
};

export const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  minRows = 3,
  maxLength,
  disabled = false,
  error,
  className = '',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const currentLength = value?.length ?? 0;
  const isOverLength = maxLength ? currentLength > maxLength : false;

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    // 一旦 auto にリセットして正確な scrollHeight を取得
    el.style.height = 'auto';
    // 改行も含めた全体の高さ（scrollHeight）をそのまま高さにセット
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.textareaWrapper}>
        <textarea
          ref={textareaRef}
          id={name}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          rows={minRows}
          maxLength={maxLength}
          disabled={disabled}
          className={`${styles.textarea} ${error || isOverLength ? styles.textareaError : ''}`}
        />
      </div>

      <div className={styles.footer}>
        {error ? <p className={styles.errorMessage}>{error}</p> : <span />}

        {maxLength && (
          <span className={`${styles.charCount} ${isOverLength ? styles.charCountError : ''}`}>
            {currentLength} / {maxLength}
          </span>
        )}
      </div>
    </div>
  );
};
