import React, { ReactNode } from 'react';

import { BackButton } from '../BackButton';
import styles from './PageHeader.module.css';

type PageHeaderProps = {
  /** 画面のメインタイトル（任意に変更） */
  title?: string;
  /** サブタイトル（任意） */
  subtitle?: string;
  /** 戻るボタンを押した時の処理 */
  onBack?: () => void;
  /** 左側に配置するカスタム要素 */
  leftAction?: ReactNode;
  /** 右側に配置するカスタム要素 */
  rightAction?: ReactNode;
  /** 外部からスタイル調整用のクラス名 */
  className?: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  onBack,
  leftAction,
  rightAction,
  className = '',
}) => {
  return (
    <header className={`${styles.header} ${className}`}>
      {/* 左エリア */}
      <div className={styles.leftGroup}>
        {leftAction ? leftAction : onBack ? <BackButton onClick={onBack} /> : null}
      </div>

      {/* ★ 中央エリア：title か subtitle がある場合のみレンダリング */}
      {(title || subtitle) && (
        <div className={styles.titleContainer}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}

      {/* 右エリア */}
      <div className={styles.right}>{rightAction ?? null}</div>
    </header>
  );
};
