import PageFooter from "./components/footer";
import "./styles/liked.css";
import { useState, useEffect } from "react";

export default function Liked() {
  const [profile, setProfile] = useState(null);
  const [images, setImages] = useState([]);
  const [locations, setLocations] = useState([]);

  // いいね履歴取得
  useEffect(() => {
    const fetchLikedProfiles = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzgwMDQ1NTgwfQ.V_wGSt6i5MglKdK9Q2bV7CjoWPLXOaWi0HT0djyQVjg";
        const likedResponse = await fetch(
          "http://127.0.0.1:8000/users/me/likes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
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
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzgwMDQ1NTgwfQ.V_wGSt6i5MglKdK9Q2bV7CjoWPLXOaWi0HT0djyQVjg";
        const imageData = await Promise.all(
          profile.map(async (p) => {
            const userId = p.user_id;
            const imageResponse = await fetch(
              `http://127.0.0.1:8000/users/${userId}/images`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
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
        const locationResponse = await fetch("http://127.0.0.1:8000/locations");
        const locationData = await locationResponse.json();
        setLocations(locationData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocations();
  }, []);
  return (
    <div>
      <p className="liked-title">あなたが送ったいいね！</p>
      {/* 写真 */}
      <div className="likedUserCard">
        {profile &&
          profile.map((p) => {
            const location = locations.find(
              (l) => l.id === p.current_location_id,
            );
            return (
              <div className="likedUser">
                {images.map((i) => {
                  if (i.userId === p.user_id) {
                    return (
                      <img
                        src={`http://127.0.0.1:8000${i.imageData[0].image_url}`}
                        alt="Profile"
                        className="LikedUserImg"
                      />
                    );
                  }
                })}
                <div className="likedUserInfo">
                  <p>{p.age}歳</p>
                  <p>{location ? location.name : "未選択"}</p>
                </div>
              </div>
            );
          })}
      </div>
      {/* 年齢 */}

      {/* 移住地 */}
      <PageFooter />
    </div>
  );
}
