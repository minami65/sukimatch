import { Link } from "react-router-dom";
import "./styles/toMypageButton.css";

export default function ToMypageButton() {
  return (
    <button className="toMyPageButton">
      <Link to="/mypage" className="toMypage">
        マイページへ戻る
      </Link>
    </button>
  );
}
