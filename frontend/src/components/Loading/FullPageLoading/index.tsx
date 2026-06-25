import { LoadingSpinner } from '../LoadingSpinner';
import styles from './FullPageLoading.module.css';

export const FullPageLoading = () => (
  <div className={styles.overlay}>
    <LoadingSpinner size="lg" />
  </div>
);
