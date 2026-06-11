import "./styles/welcome.css";
import Airplane from "./components/airplane";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="container welcome-container">
      <div className="welcome-card">
        <p className="welcome-icon" aria-hidden="true">
          ✓
        </p>
        <h1 className="welcome-title">
          <span className="highlight">登録が完了しました！</span>
        </h1>
        <p className="welcome-message">
          これから素敵な出会いを見つけましょう✨
          <br />
          まずは「さがす」から気になるお相手をチェックしてみてください。
        </p>
      </div>

      <Link to="/userList" className="start_button">
        はじめる
      </Link>
      <Airplane />
    </div>
  );
}

export default Welcome;
