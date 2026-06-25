import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import ToMyPageButton from '@/components/shared/buttons/ToMyPageButton';

import styles from './liked.module.css';

export default function Liked() {
  const [profile, setProfile] = useState(null);
  const [images, setImages] = useState([]);
  const [locations, setLocations] = useState([]);

  // いいね履歴取得
  useEffect(() => {
    const fetchLikedProfiles = async () => {
      try {
        const likedResponse = await fetch('http://127.0.0.1:8000/users/me/likes');
        const likedData = await likedResponse.json();
        console.log(likedData);
        setProfile(likedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLikedProfiles();
  }, []);

  // 画像取得
  useEffect(() => {
    if (!profile || profile.length === 0) return;

    const fetchUserImages = async () => {
      try {
        const imageData = await Promise.all(
          profile.map(async (p) => {
            const userId = p.user_id;
            const imageResponse = await fetch(`http://127.0.0.1:8000/users/${userId}/images`);
            const imageData = await imageResponse.json();
            console.log(imageData);
            return { userId, imageData };
          }),
        );
        setImages(imageData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserImages();
  }, [profile]);

  // 都道府県取得
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationResponse = await fetch('http://127.0.0.1:8000/locations');
        const locationData = await locationResponse.json();
        setLocations(locationData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocations();
  }, []);
  return (
    <>
      <p className={styles.likedTitle}>あなたが送ったいいね！</p>
      <div className={styles.container}>
        {/* 写真 */}
        {profile && profile.length > 0 ? (
          <div className={styles.likedUserCard}>
            {profile &&
              profile.map((p) => {
                const location = locations.find((l) => l.id === p.current_location_id);
                return (
                  <div className={styles.likedUser}>
                    {images &&
                      images.map((i) => {
                        if (i.userId === p.user_id) {
                          return (
                            <img
                              src={`http://127.0.0.1:8000${i.imageData[0].image_url}`}
                              alt="Profile"
                              className={styles.LikedUserImg}
                            />
                          );
                        }
                      })}
                    <div className={styles.likedUserInfo}>
                      <p>{p.age}歳</p>
                      <p>{location ? location.name : '未選択'}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className={styles.noLikes}>送ったいいね！がありません。</div>
        )}
        <ToMyPageButton />
      </div>
    </>
  );
}
