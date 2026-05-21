import "./styles/myPage.css";
import PageFooter from "./components/footer";
import footprint from "./assets/footprint.png";
import likes from "./assets/likes.png";
import setting from "./assets/setting.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Mypage() {
  const [userId, setUserId] = useState(null);
  const [mainImages, setImages] = useState(null);
  // TODO：ログイン実装したら変える
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzc5MzQ0NzM2fQ.LP4UOmTYuJl8wrmL9vfdXLVa06imeEayoxyMha6I12Y";

  // ユーザーID取得
  useEffect(() => {
    fetch("http://127.0.0.1:8000/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setUserId(json.user_id);
      });
  }, []);

  console.log("userId:", userId);

  // 画像取得
  useEffect(() => {
    console.log("userId", userId);

    if (!userId) return;

    fetch(`http://127.0.0.1:8000/users/${userId}/images`)
      .then((res) => res.json())
      .then((json) => {
        const mainImages = json.find((image) => image.sort_order === 1);
        console.log(mainImages);
        setImages(mainImages);
      });
  }, [userId]);

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
        <Link to="/profile" className="mypageLink">
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
          <Link to="/likes" className="mypageLink">
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
