import "./styles/MatchComplete.css";
import maleIcon from "./assets/male.png";
import femaleIcon from "./assets/female.png";
import balloon from "./assets/balloon.png";
import PageFooter from "./components/footer";
import { Link } from "react-router-dom";

function MatchComplete() {
  return (
    <div className="match_container">
      <img src={balloon} className="balloon" alt="balloon" />
      {/* todo: ユーザー画像は後ほどjsonから持ってくるものに変更 */}
      <div className="users">
        <div className="user_circle">
          <img src={maleIcon} alt="male" />
        </div>
        <span className="heart">❤</span>
        <div className="user_circle">
          <img src={femaleIcon} alt="female" />
        </div>
      </div>
      <div className="message">
        <p>おめでとうございます！</p>
        <p>マッチングが成立しました！</p>
      </div>
      {/* ボタン */}
      <div className="buttons">
        <Link to="/talkList" className="talk_button">
          さっそくトークをはじめる！
        </Link>
        <Link to="/userList" className="close_button">
          とじる
        </Link>
      </div>
      <PageFooter />
    </div>
  );
}

export default MatchComplete;
