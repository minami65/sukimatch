import styles from './LoadingSpinner.module.css';

export const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  return (
    <div className={`${styles.spinner} ${styles[size]}`}>
      <span className={styles.srOnly}>読み込み中...</span>
    </div>
  );
};
