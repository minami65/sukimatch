import { useEffect, useState } from 'react';

import { useLikeUser, useUnLikeUser } from '@/hooks/useLike';

import likeImage from '@/assets/likes-button.png';

import styles from './LikeButton.module.css';

interface LikeButtonProps {
  userId: number;
  initialIsLiked?: boolean;
  className?: string;
}

const LikeButton = ({ userId, initialIsLiked, className }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked || false);
  useEffect(() => {
    if (initialIsLiked !== undefined) {
      setIsLiked(initialIsLiked);
    }
  }, [initialIsLiked]);

  const likeMutation = useLikeUser();
  const unlikeMutation = useUnLikeUser();

  const isPending = likeMutation.isPending || unlikeMutation.isPending;

  const handleToggleLike = () => {
    if (isPending) return;

    const previousState = isLiked;

    if (isLiked) {
      setIsLiked(false);

      unlikeMutation.mutate(
        { userId: userId },
        {
          onSuccess: () => {
            console.log(`userId${userId}のいいねを取り消しました`);
          },
          onError: (error) => {
            console.error('いいねの取り消しに失敗しました:', error);
            setIsLiked(previousState);
          },
        },
      );
    } else {
      setIsLiked(true);

      likeMutation.mutate(
        { userId },
        {
          onSuccess: () => {
            console.log(`userId${userId}にいいねしました`);
          },
          onError: (error: unknown) => {
            console.error('いいねの送信に失敗しました:', error);
            setIsLiked(previousState);
          },
        },
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggleLike}
      className={`${styles.like} ${isLiked ? styles.isLikedButton : styles.isUnlikedButton} ${className}`}
    >
      <img src={likeImage} alt="いいね" className={styles.likeImage} />
      <span>{isLiked ? 'いいね済み' : 'いいね'}</span>
    </button>
  );
};

export default LikeButton;
