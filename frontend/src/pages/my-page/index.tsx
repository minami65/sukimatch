import { Link } from 'react-router-dom';

import { FullPageLoading } from '@/components/Loading/FullPageLoading';

import { useAuth } from '@/hooks/useAuth';
import { useMainUserImage } from '@/hooks/useUser';

import footprint from '@/assets/footprint.png';
import likes from '@/assets/likes.png';
import setting from '@/assets/setting.png';

import LogOutButton from '../../components/shared/buttons/LogOutButton';
import styles from './myPage.module.css';

export default function Mypage() {
  const { user, isLoading: isUserLoading } = useAuth();
  const { mainImage, isLoading: isImageLoading } = useMainUserImage(user?.user_id);

  if (isUserLoading || isImageLoading) return <FullPageLoading />;

  return (
    <>
      <div className={styles.profile}>
        {mainImage && (
          <img src={mainImage.image_url} alt="プロフィール画像" className={styles.mainImage} />
        )}
        {/* 遷移先にuser_idを渡す */}
        <Link to={`/profile/${user?.user_id}`} className={styles.mypageLink}>
          <p>プロフィール確認・編集</p>
        </Link>
      </div>

      <div className={styles.menu}>
        <div className={styles.img_footprint}>
          <Link to="/footprint" className={styles.mypageLink}>
            <img src={footprint} alt="足跡" className={styles.footprint} />
            足あと
          </Link>
        </div>
        <div className={styles.img_likes}>
          <Link to="/liked" className={styles.mypageLink}>
            <img src={likes} alt="自分から" className={styles.likes} />
            自分から
          </Link>
        </div>
        <div className={styles.img_setting}>
          <Link to="/setting" className={styles.mypageLink}>
            <img src={setting} alt="設定" className={styles.setting} />
            <p>登録情報確認</p>
          </Link>
        </div>
      </div>

      <div className={styles.logoutWrapper}>
        <LogOutButton size="lg" className={styles.logoutBtn} />
      </div>
    </>
  );
}
