import styles from './footprint.module.css';
import '@/assets/default-profile.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Likes from '@/components/likes';
import PageFooter from '@/components/footer';
import ToMyPageButton from '@/components/shared/buttons/ToMyPageButton';

export default function FootPrint() {
  const navigate = useNavigate();
  const [footprints, setFootprints] = useState([]);
  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);
  const [likesUser, setLikesUser] = useState([]);
  const token = localStorage.getItem('token');

  // 足あと取得
  useEffect(() => {
    const fetchFootprints = async () => {
      try {
        if (!token) {
          navigate('/');
          return;
        }
        const response = await fetch('http://127.0.0.1:8000/users/me/footprint', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setFootprints(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFootprints();
  }, [navigate, token]);

  // 画像取得
  useEffect(() => {
    if (footprints.length === 0) return;

    const fetchUserImages = async () => {
      try {
        if (!token) {
          navigate('/');
          return;
        }

        const imageDataList = await Promise.all(
          footprints.map(async (f) => {
            // 足あとで取得したユーザーのid
            const userId = f.user_id;
            const response = await fetch(`http://127.0.0.1:8000/users/${userId}/images`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

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
  }, [footprints, navigate, token]);

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
      if (!token) {
        navigate('/');
        return;
      }
      try {
        const likesUserRes = await fetch('http://127.0.0.1:8000/users/me/likes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const likesUserData = await likesUserRes.json();
        setLikesUser(likesUserData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLikesUser();
  }, [navigate, token]);

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
      <PageFooter />
    </div>
  );
}
