import './styles/userDetails.css';
import PageFooter from './components/footer';
import close from './assets/close.png';
import likeIcon from './assets/like.png';
import likedIcon from './assets/liked.png';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import {
  PREFECTURES,
  JOB,
  EDUCATION,
  BODY_TYPE,
  INCOME,
  HOLIDAY,
  ALCOHOL,
  SMOKING,
  LIVING,
  MARRIAGE,
  MEETING,
} from './data/base.jsx';

const API_URL = 'http://localhost:8000';

const API_URL = "http://localhost:8000";

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userRes = await fetch(`${API_URL}/users/${id}`);
        if (!userRes.ok) {
          throw new Error('User not found');
        }
        const userData = await userRes.json();
        setUser(userData);

        const imagesRes = await fetch(`${API_URL}/users/${id}/images`);
        if (imagesRes.ok) {
          const imagesData = await imagesRes.json();
          const sortedImages = imagesData
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((img) => `${API_URL}${img.image_url}`);
          setImages(sortedImages);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return <div className="loading">読み込み中...</div>;
  }

  if (error) {
    return <div className="error">エラー: {error}</div>;
  }

  if (!user) {
    return <div className="error">ユーザーが見つかりません</div>;
  }
  return (
    <>
      <div className="main_img">
        <img src={images[currentIndex]} className="user1" alt="main" />
        {/* 左ボタン */}
        <div
          className="arrow left"
          onClick={() =>
            setCurrentIndex(
              (prev) => (prev - 1 + images.length) % images.length,
            )
          }
        >
          ‹
        </div>

        {/* 右ボタン */}
        <div
          className="arrow right"
          onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        >
          ›
        </div>
        <Link to={'/userList'} className="link">
          <img src={close} className="close" alt="close" />
        </Link>
      </div>

      <div className="sub_img">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className={i === currentIndex ? 'active_thumb' : ''}
            onClick={() => setCurrentIndex(i)}
            alt="thumb"
          />
        ))}
      </div>

      <div className="user_info">
        <div className="main_profile">
          <h2>
            {user.name} <span className="age">{user.age}歳</span>{' '}
            <span className="location">
              {PREFECTURES[user.current_location_id]}
            </span>
          </h2>
          <div className="profile">
            <p className="bio">
              {user.bio ? user.bio : '自己紹介文がありません'}
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <span>出身地</span>
        <span>{PREFECTURES[user.birth_location_id]}</span>
      </div>

      <div className="row">
        <span>居住地</span>
        <span>{PREFECTURES[user.current_location_id]}</span>
      </div>

      <div className="row">
        <span>学歴</span>
        <span>{EDUCATION[user.education_id]}</span>
      </div>

      <div className="row">
        <span>職種</span>
        <span>{JOB[user.job_id]}</span>
      </div>

      <div className="row">
        <span>年収</span>
        <span>{INCOME[user.income_id]}</span>
      </div>

      <div className="row">
        <span>身長</span>
        <span>{user.height}cm</span>
      </div>

      <div className="row">
        <span>休日</span>
        <span>{HOLIDAY[user.holiday_id]}</span>
      </div>

      <div className="row">
        <span>お酒</span>
        <span>{ALCOHOL[user.alcohol_id]}</span>
      </div>

      <div className="row">
        <span>タバコ</span>
        <span>{SMOKING[user.smoking_id]}</span>
      </div>

      <div className="row">
        <span>同居人</span>
        <span>{LIVING[user.living_arrangement_id]}</span>
      </div>

      <div className="row">
        <span>結婚に対する意思</span>
        <span>{MARRIAGE[user.marriage_intention_id]}</span>
      </div>

      <div className="row">
        <span>出会うまでの希望</span>
        <span>{MEETING[user.meeting_preference_id]}</span>
      </div>

      <img
        src={liked ? likedIcon : likeIcon}
        className="like_button"
        alt="like"
        onClick={() => {
          if (!liked) {
            setLiked(true);
          }
        }}
      />

      <PageFooter />
    </>
  );
}

export default UserDetails;
