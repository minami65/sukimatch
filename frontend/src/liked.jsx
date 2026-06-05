import PageFooter from "./components/footer";
import "./styles/liked.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToMypageButton from "./components/toMypageButton";

export default function Liked() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [images, setImages] = useState([]);
  const [locations, setLocations] = useState([]);
  const token = localStorage.getItem("token");

  // いいね履歴取得
  useEffect(() => {
    const fetchLikedProfiles = async () => {
      try {
        if (!token) {
          navigate("/");
          return;
        }
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
  }, [navigate, token]);

  // 画像取得
  useEffect(() => {
    if (!profile || profile.length === 0) return;

    const fetchUserImages = async () => {
      try {
        if (!token) {
          navigate("/");
          return;
        }
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
  }, [profile, navigate, token]);

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
      <ToMypageButton />
      <PageFooter />
    </div>
  );
}
