import { Link } from 'react-router-dom';

import mypage from '@/assets/mypage.png';
import receive from '@/assets/receive.png';
import search from '@/assets/search.png';
import talk from '@/assets/talk.png';

import styles from './BottomNav.module.css';

const BottomNav = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.img_search}>
        <Link to="/userList" className={styles.link}>
          <img src={search} className={styles.search} alt="logo" />
          さがす
        </Link>
      </div>
      <div className={styles.imgReceive}>
        <Link to="/receive" className={styles.link}>
          <img src={receive} className={styles.receive} alt="logo" />
          受けとったいいね!
        </Link>
      </div>
      <div className={styles.imgTalk}>
        <Link to="/talkList" className={styles.link}>
          <img src={talk} className={styles.talk} alt="logo" />
          トーク
        </Link>
      </div>
      <div className={styles.imgMypage}>
        <Link to="/mypage" className={styles.link}>
          <img src={mypage} className={styles.mypage} alt="logo" />
          マイページ
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
