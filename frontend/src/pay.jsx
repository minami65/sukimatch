import "./styles/pay.css";
import Airplane from "./components/airplane";
import { Link } from "react-router-dom";

function Pay() {
  return (
    <div>
      <h1>支払い情報登録</h1>
      <section className="grid">
        <form action="">
          <div className="form">
            <div className="field">
              <label htmlFor="">カード番号</label>
              <input
                type="number"
                id="card_number"
                name="card_number"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="">有効期限</label>
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
              <label htmlFor="">セキュリティーコード</label>
              <input
                type="number"
                id="security_code"
                name="security_code"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="">名義人氏名</label>
              <input
                type="text"
                id="cardholder_name"
                name="cardholder_name"
                required
              />
            </div>
          </div>
          <Link to="/welcome" className="pay_button">
            登録
          </Link>
          <Airplane />
        </form>
      </section>
    </div>
  );
}

export default Pay;
