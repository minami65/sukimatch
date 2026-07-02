import { useEffect, useState } from 'react';

import Likes from '@/components/likes';
import ToMyPageButton from '@/components/shared/buttons/ToMyPageButton';

import '@/assets/default-profile.png';

import styles from './footprint.module.css';

interface Footprint {
  user_id: number;
  name: string;
  age: number;
  current_location_id: number;
}

interface UserImage {
  user_id: number;
  images: any[];
}

export default function FootPrint() {
  const [footprints, setFootprints] = useState<Footprint[]>([]);
  const [locations, setLocations] = useState<any[]>([]); //TODO: anyをやめる
  const [images, setImages] = useState<UserImage[]>([]);
  const [likesUser, setLikesUser] = useState<any[]>([]); //TODO: anyをやめる

  // 足あと取得
  useEffect(() => {
    const fetchFootprints = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/users/me/footprint');
        const data = await response.json();
        console.log(data);
        setFootprints(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFootprints();
  }, []);

  // 画像取得
  useEffect(() => {
    if (footprints.length === 0) return;

    const fetchUserImages = async () => {
      try {
        const imageDataList = await Promise.all(
          footprints.map(async (f) => {
            // 足あとで取得したユーザーのid
            const userId = f.user_id;
            const response = await fetch(`http://127.0.0.1:8000/users/${userId}/images`);

            const data = await response.json();

            return {
              user_id: userId,
              images: data,
            };
          }),
        );

        setImages(imageDataList);
        console.log(imageDataList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserImages();
  }, [footprints]);

  // 都道府県取得
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsRes = await fetch('http://127.0.0.1:8000/locations');
        const locationsData = await locationsRes.json();
        setLocations(locationsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocations();
  }, []);

  // 自分からいいねした人を取得
  useEffect(() => {
    const fetchLikesUser = async () => {
      try {
        const likesUserRes = await fetch('http://127.0.0.1:8000/users/me/likes');
        const likesUserData = await likesUserRes.json();
        setLikesUser(likesUserData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLikesUser();
  }, []);

  return (
    <div>
      <p className={styles.title}>あしあと</p>

      <div className={styles.container}>
        {/* 名前 */}
        {footprints.length > 0 ? (
          footprints.map((f) => {
            const location = locations.find((l) => l.id === f.current_location_id);

            // いいね済み判定
            const isLiked = likesUser.some((user) => user.user_id === f.user_id);
            return (
              <div className={styles.footprintCard} key={f.user_id}>
                {images.map((i) => {
                  if (i.user_id === f.user_id) {
                    return (
                      <img
                        key={i.user_id}
                        src={`http://127.0.0.1:8000${i.images[0].image_url}`}
                        alt="Profile"
                        className={styles.profileImg}
                      />
                    );
                  }
                })}

                <div>
                  <p>{f.name}</p>
                  <div className={styles.footprintInfo}>
                    <p>{f.age}歳</p>
                    <p>{location ? location.name : f.current_location_id}</p>
                  </div>
                </div>

                {/* いいねボタン */}
                <Likes footprintId={f.user_id} disabled={isLiked} />
              </div>
            );
          })
        ) : (
          <div>
            <p className={styles.noFootprints}>足あとがありません。</p>
          </div>
        )}
        <ToMyPageButton className={styles.toMyPage} />
      </div>
    </div>
  );
}
