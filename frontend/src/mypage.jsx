import "./styles/myPage.css";
import PageFooter from "./components/footer";
import footprint from "./assets/footprint.png";
import likes from "./assets/likes.png";
import setting from "./assets/setting.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Mypage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [mainImages, setImages] = useState(null);
  const token = localStorage.getItem("token");

  // ユーザーID取得
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetch("http://127.0.0.1:8000/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setUserId(json.user_id);
      });
  }, [navigate, token]);

  // 画像取得
  useEffect(() => {
    if (!userId) return;

    fetch(`http://127.0.0.1:8000/users/${userId}/images`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then((res) => res.json())
      .then((json) => {
        const mainImages = json.find((image) => image.sort_order === 1);
        console.log(mainImages);
        setImages(mainImages);
      });
  }, [userId, token]);

  return (
    <div>
      <div className="profile">
        {mainImages && (
          <img
            src={`http://127.0.0.1:8000${mainImages.image_url}`}
            alt="プロフィール画像"
            className="mainImage"
          />
        )}
        {/* 遷移先にuser_idを渡す */}
        <Link to={`/profile/${userId}`} className="mypageLink">
          <p>プロフィール確認・編集</p>
        </Link>
      </div>

      <div className="menu">
        <div className="img_footprint">
          <Link to="/footprint" className="mypageLink">
            <img src={footprint} alt="足跡" className="footprint" />
            足あと
          </Link>
        </div>
        <div className="img_likes">
          <Link to="/liked" className="mypageLink">
            <img src={likes} alt="自分から" className="likes" />
            自分から
          </Link>
        </div>
        <div className="img_setting">
          <Link to="/setting" className="mypageLink">
            <img src={setting} alt="設定" className="setting" />
            <p>登録情報確認</p>
          </Link>
        </div>
      </div>

      <PageFooter />
    </div>
  );
}
