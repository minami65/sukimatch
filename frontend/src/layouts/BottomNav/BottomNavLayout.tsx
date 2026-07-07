import { Outlet } from 'react-router-dom';

import BottomNav from './BottomNav';
import styles from './BottomNavLayout.module.css';

function BottomNavLayout() {
  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}

export default BottomNavLayout;
