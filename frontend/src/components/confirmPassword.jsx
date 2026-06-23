import '../styles/confirmPassword.css';
import airplane from '../assets/image1.png';

function ConfirmPassword() {
  return (
    <div>
      <h1>パスワード再登録</h1>
      <section className="grid">
        <form action="">
          <div className="form">
            <div className="field">
              <label htmlFor="">メールアドレス</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="field">
              <label htmlFor="">新しいパスワード</label>
              <input type="password" id="new_password" name="new_password" required />
            </div>
            <div className="field">
              <label htmlFor="">新しいパスワード(確認用)</label>
              <input
                type="password"
                id="new_password_confirmation"
                name="new_password_confirmation"
                required
              />
            </div>
          </div>
          <div className="button">
            <input type="submit" className="register" value="登録" />
          </div>
          <img src={airplane} className="airplane" alt="Airplane" />
        </form>
      </section>
    </div>
  );
}

export default ConfirmPassword;
