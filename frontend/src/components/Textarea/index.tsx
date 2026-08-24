import React, { ComponentProps, forwardRef, useEffect, useRef, useState } from 'react';

import styles from './Textarea.module.css';

export type TextareaProps = ComponentProps<'textarea'> & {
  label?: string;
  error?: string;
  minRows?: number;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', maxLength, onChange, minRows = 3, ...rest }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);
    const [textLength, setTextLength] = useState(0);
    const isOverLength = maxLength ? textLength > maxLength : false;

    // 高さ自動調整
    const adjustHeight = () => {
      const el = internalRef.current;
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    };

    // 初期マウント時に一度だけ文字数と高さを同期
    useEffect(() => {
      const timer = setTimeout(() => {
        if (internalRef.current) {
          setTextLength(internalRef.current.value.length);
          adjustHeight();
        }
      }, 0);
      return () => clearTimeout(timer);
    }, []);

    // タイピング時の処理
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextLength(e.target.value.length);
      adjustHeight();
      if (onChange) onChange(e);
    };

    return (
      <div className={`${styles.container} ${className}`}>
        {label && (
          <label htmlFor={rest.name} className={styles.label}>
            {label}
          </label>
        )}

        <div className={styles.textareaWrapper}>
          <textarea
            {...rest}
            rows={minRows}
            maxLength={maxLength}
            onChange={handleChange}
            ref={(node) => {
              internalRef.current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) ref.current = node;
            }}
            id={rest.id || rest.name}
            className={`${styles.textarea} ${error || isOverLength ? styles.textareaError : ''}`}
          />
        </div>

        <div className={styles.footer}>
          {error ? <p className={styles.errorMessage}>{error}</p> : <span />}

          {maxLength && (
            <span className={`${styles.charCount} ${isOverLength ? styles.charCountError : ''}`}>
              {textLength} / {maxLength}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
