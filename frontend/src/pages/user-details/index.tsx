import { useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import { FullPageLoading } from '@/components/Loading/FullPageLoading/index.js';
import LikeButton from '@/components/shared/buttons/LikeButton.tsx';
import MatchNotificationModal from '@/components/shared/modals/MatchNotificationModal/index.tsx';

import { useUserDetail, useUserImages } from '@/hooks/useUser.ts';

import backButtonIcon from '@/assets/back.png';

import Gallery from './Gallery/index.tsx';
import UserInfo from './UserInfo/UserInfo';
import styles from './userDetails.module.css';

function UserDetails() {
  const { id } = useParams();
  const userId = Number(id);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

  const { data: user, isLoading: isUserLoading, isError: isUserError } = useUserDetail(userId);
  const {
    data: rawImages,
    isLoading: isImagesLoading,
    isError: isImagesError,
  } = useUserImages(userId);

  const handleLikeSuccess = (isMatch: boolean) => {
    if (isMatch) {
      setIsMatchModalOpen(true);
    }
  };

  if (isUserLoading || isImagesLoading) {
    return <FullPageLoading />;
  }

  if (isUserError || isImagesError || !user) {
    return <div className={styles.error}>ユーザー情報が見つからないか、取得に失敗しました。</div>;
  }

  const images = rawImages
    ? [...rawImages].sort((a, b) => a.sort_order - b.sort_order).map((img) => img.image_url)
    : [];

  const matchedUsers = user
    ? [
        {
          id: user.user_id,
          name: user.name,
          imageUrl: images[0],
        },
      ]
    : [];

  return (
    <>
      <Link to={'/userList'} className={styles.link}>
        <img src={backButtonIcon} className={styles.back} alt="back" />
      </Link>

      <Gallery images={images} />

      <UserInfo user={user} />

      <LikeButton
        initialIsLiked={user.is_liked}
        userId={userId}
        className={styles.likeButton}
        onLikeSuccess={handleLikeSuccess}
      />

      <MatchNotificationModal
        isOpen={isMatchModalOpen}
        onClose={() => setIsMatchModalOpen(false)}
        matchedUsers={matchedUsers}
      />
    </>
  );
}

export default UserDetails;
