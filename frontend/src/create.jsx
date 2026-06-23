import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Airplane from './components/airplane';
import './styles/create.css';

function Create() {
  const navigate = useNavigate();

  // state
  const [nickname, setNickname] = useState('');

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const [gender, setGender] = useState('');

  const [age, setAge] = useState('');

  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  // 登録処理
  const handleRegister = async () => {
    setEmailError('');

    // メール確認
    if (email !== emailConfirmation) {
      setEmailError('メールアドレスが一致しません');
      return;
    }

    // パスワード確認
    if (password !== passwordConfirmation) {
      alert('パスワードが一致しません');
      return;
    }

    // APIへ送るデータ
    const newUser = {
      name: nickname,

      age: Number(age),

      birthday: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,

      mail_address: email,

      password: password,

      bio: '',

      gender_id: Number(gender),
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/user', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(newUser),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message = data?.detail ?? '登録失敗';
        setEmailError(message);
        return;
      }

      console.log(data);
      if (data?.user_id) {
        localStorage.setItem('loginUserId', String(data.user_id));
      }

      // 支払い画面へ
      navigate('/pay');
    } catch (error) {
      console.error(error);

      alert('登録失敗');
    }
  };

  return (
    <div>
      <h1>会員登録</h1>

      <section className="grid">
        <form>
          <div className="signup">
            {/* ニックネーム */}
            <div className="field">
              <label>ニックネーム</label>

              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </div>
            {/* 生年月日 */}
            <div className="field">
              <label>生年月日</label>

              <div className="expiry">
                <input
                  type="number"
                  // placeholder="2026"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />

                <span>年</span>

                <input
                  type="number"
                  // placeholder="5"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                />

                <span>月</span>

                <input
                  type="number"
                  // placeholder="21"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  required
                />

                <span>日</span>
              </div>
            </div>
            {/* 性別 */}
            <div className="field">
              <label>性別</label>

              <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">--選択してください--</option>

                <option value={1}>男性</option>

                <option value={2}>女性</option>
              </select>
            </div>
            {/* 年齢 */}
            <div className="field">
              <label>年齢</label>

              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>
            {/* メール */}
            <div className="field">
              <label>メールアドレス</label>

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                required
              />
            </div>
            {/* メール確認 */}
            <div className="field">
              <label>メールアドレス(確認用)</label>

              <input
                type="email"
                value={emailConfirmation}
                onChange={(e) => {
                  setEmailConfirmation(e.target.value);
                  setEmailError('');
                }}
                required
              />
              {emailError && <p className="email_error">{emailError}</p>}
            </div>
            {/* パスワード */}
            <div className="field">
              <label>パスワード</label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* パスワード確認 */}
            <div className="field">
              <label>パスワード(確認用)</label>

              <input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </div>
          </div>

          {/* 登録ボタン */}
          <div className="create_button">
            <button type="button" className="register" onClick={handleRegister}>
              支払い情報登録へ
            </button>
          </div>
        </form>

        <Airplane />
      </section>
    </div>
  );
}

export default Create;
