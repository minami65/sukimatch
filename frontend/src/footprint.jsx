import PageFooter from "./components/footer";
import "./styles/footprint.css";
import "./assets/default-profile.png";
import { useState, useEffect } from "react";
import Likes from "./components/likes";
import { useNavigate } from "react-router-dom";

export default function FootPrint() {
  const navigate = useNavigate();
  const [footprints, setFootprints] = useState([]);
  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);
  const token = localStorage.getItem("token");

  // 足あと取得
  useEffect(() => {
    const fetchFootprints = async () => {
      try {
        if (!token) {
          navigate("/");
          return;
        }
        const response = await fetch(
          "http://127.0.0.1:8000/users/me/footprint",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
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
          navigate("/");
          return;
        }

        const imageDataList = await Promise.all(
          footprints.map(async (f) => {
            // 足あとで取得したユーザーのid
            const userId = f.user_id;
            const response = await fetch(
              `http://127.0.0.1:8000/users/${userId}/images`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

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
        const locationsRes = await fetch("http://127.0.0.1:8000/locations");
        const locationsData = await locationsRes.json();
        setLocations(locationsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div>
      <p className="title">あしあと</p>
      {/* 名前 */}
      {footprints.length > 0 ? (
        footprints.map((f) => {
          console.log(f.id);
          const location = locations.find(
            (l) => l.id === f.current_location_id,
          );
          return (
            <div className="footprint-card">
              {images.map((i) => {
                if (i.user_id === f.user_id) {
                  return (
                    <img
                      src={`http://127.0.0.1:8000${i.images[0].image_url}`}
                      alt="Profile"
                      className="profileImg"
                    />
                  );
                }
              })}
              <div key={f.user_id}>
                <p>{f.name}</p>
                <div className="footprint-info">
                  <p>{f.age}歳</p>
                  <p>{location ? location.name : f.current_location_id}</p>
                </div>
              </div>
              {/* いいねボタン */}
              <Likes footprintId={f.user_id} />
            </div>
          );
        })
      ) : (
        <p className="no-footprints">足あとがありません</p>
      )}

      <PageFooter />
    </div>
  );
}
