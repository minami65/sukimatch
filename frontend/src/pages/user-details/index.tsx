import { useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import { FullPageLoading } from '@/components/Loading/FullPageLoading/index.js';

import { useUserDetail, useUserImages } from '@/hooks/useUser.ts';

import close from '@/assets/close.png';
import likeIcon from '@/assets/like.png';
import likedIcon from '@/assets/liked.png';
import { API_BASE } from '@/config.js';
import {
  ALCOHOL,
  EDUCATION,
  HOLIDAY,
  INCOME,
  JOB,
  LIVING,
  MARRIAGE,
  MEETING,
  PREFECTURES,
  SMOKING,
} from '@/data/base.jsx';

import styles from './userDetails.module.css';

function UserDetails() {
  const { id } = useParams();
  const userId = Number(id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const { data: user, isLoading: isUserLoading, isError: isUserError } = useUserDetail(userId);
  const {
    data: rawImages,
    isLoading: isImagesLoading,
    isError: isImagesError,
  } = useUserImages(userId);

  if (isUserLoading || isImagesLoading) {
    return <FullPageLoading />;
  }

  if (isUserError || isImagesError || !user) {
    return <div className={styles.error}>ユーザー情報が見つからないか、取得に失敗しました。</div>;
  }

  const images = rawImages
    ? [...rawImages]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((img) => `${API_BASE}${img.image_url}`)
    : [];

  return (
    <>
      <div className={styles.mainImg}>
        <img src={images[currentIndex]} className={styles.user1} alt="main" />
        {/* 左ボタン */}
        <div
          className={`${styles.arrow} ${styles.left}`}
          onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
        >
          ‹
        </div>

        {/* 右ボタン */}
        <div
          className={`${styles.arrow} ${styles.right}`}
          onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        >
          ›
        </div>
        <Link to={'/userList'} className={styles.link}>
          <img src={close} className={styles.close} alt="close" />
        </Link>
      </div>

      <div className={styles.subImg}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className={i === currentIndex ? styles.activeThumb : ''}
            onClick={() => setCurrentIndex(i)}
            alt="thumb"
          />
        ))}
      </div>

      <div className={styles.userInfo}>
        <div className={styles.mainProfile}>
          <h2>
            {user.name} <span className={styles.age}>{user.age}歳</span>{' '}
            <span className={styles.location}>
              {PREFECTURES[(user.current_location_id ?? 0) as keyof typeof PREFECTURES]}
            </span>
          </h2>
          <div className={styles.profile}>
            <p className={styles.bio}>{user.bio ? user.bio : '自己紹介文がありません'}</p>
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <span>出身地</span>
        <span>{PREFECTURES[(user.birth_location_id ?? 0) as keyof typeof PREFECTURES]}</span>
      </div>

      <div className={styles.row}>
        <span>居住地</span>
        <span>{PREFECTURES[(user.current_location_id ?? 0) as keyof typeof PREFECTURES]}</span>
      </div>

      <div className={styles.row}>
        <span>学歴</span>
        <span>{EDUCATION[(user.education_id ?? 0) as keyof typeof EDUCATION]}</span>
      </div>

      <div className={styles.row}>
        <span>職種</span>
        <span>{JOB[(user.job_id ?? 0) as keyof typeof JOB]}</span>
      </div>

      <div className={styles.row}>
        <span>年収</span>
        <span>{INCOME[(user.income_id ?? 0) as keyof typeof INCOME]}</span>
      </div>

      <div className={styles.row}>
        <span>身長</span>
        <span>{user.height}cm</span>
      </div>

      <div className={styles.row}>
        <span>休日</span>
        <span>{HOLIDAY[(user.holiday_id ?? 0) as keyof typeof HOLIDAY]}</span>
      </div>

      <div className={styles.row}>
        <span>お酒</span>
        <span>{ALCOHOL[(user.alcohol_id ?? 0) as keyof typeof ALCOHOL]}</span>
      </div>

      <div className={styles.row}>
        <span>タバコ</span>
        <span>{SMOKING[(user.smoking_id ?? 0) as keyof typeof SMOKING]}</span>
      </div>

      <div className={styles.row}>
        <span>同居人</span>
        <span>{LIVING[(user.living_arrangement_id ?? 0) as keyof typeof LIVING]}</span>
      </div>

      <div className={styles.row}>
        <span>結婚に対する意思</span>
        <span>{MARRIAGE[(user.marriage_intention_id ?? 0) as keyof typeof MARRIAGE]}</span>
      </div>

      <div className={styles.row}>
        <span>出会うまでの希望</span>
        <span>{MEETING[(user.meeting_preference_id ?? 0) as keyof typeof MEETING]}</span>
      </div>

      <img
        src={liked ? likedIcon : likeIcon}
        className={styles.likeButton}
        alt="like"
        onClick={() => {
          if (!liked) {
            // TODO: API call should happen here
            setLiked(true);
          }
        }}
      />
    </>
  );
}

export default UserDetails;
