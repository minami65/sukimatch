import "./styles/create.css";
import { Link } from "react-router-dom";
import Airplane from "./components/airplane";

function Create() {
  return (
    <div>
      <h1>会員登録</h1>
      <section className="grid">
        <form action="">
          <div className="signup">
            <div className="field">
              <label htmlFor="">ニックネーム</label>
              <input type="text" id="nickname" name="nickname" required />
            </div>
            <div className="field">
              <label htmlFor="">生年月日</label>
              <div className="expiry">
                <input
                  type="number"
                  id="expiration_year"
                  name="expiration_date"
                  required
                />
                <span>年</span>
                <input
                  type="number"
                  id="expiration_month"
                  name="expiration_date"
                  required
                />
                <span>月</span>
                <input
                  type="number"
                  id="expiration_day"
                  name="expiration_date"
                  required
                />
                <span>日</span>
              </div>
            </div>
            <div className="field">
              <label htmlFor="">性別</label>
              <select name="gender" id="gender" required>
                <option value="">--選択してください--</option>
                <option value="man">男性</option>
                <option value="woman">女性</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="">年齢</label>
              <input type="number" id="age" name="age" required />
            </div>
            <div className="field">
              <label htmlFor="">メールアドレス</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="field">
              <label htmlFor="">メールアドレス(確認用)</label>
              <input
                type="email"
                id="email_confirmation"
                name="email_confirmation"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="">パスワード</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="field">
              <label htmlFor="">パスワード(確認用)</label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                required
              />
            </div>
          </div>
          <div className="create_button">
            <Link to="/pay" className="register">
              支払い情報登録へ
            </Link>
          </div>
        </form>
        <Airplane />
      </section>
    </div>
  );
}

export default Create;
