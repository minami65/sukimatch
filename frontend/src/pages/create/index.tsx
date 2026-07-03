import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';

import Airplane from '../../components/airplane';
import { useRegister } from '../../hooks/useRegister';
import styles from './create.module.css';

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

  const { registerUser, isRegistering } = useRegister();

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

    registerUser(newUser, {
      onSuccess: (user) => {
        console.log('登録に成功したユーザー:', user);
        navigate('/login');
      },
      onError: (message) => {
        setEmailError(message);
      },
    });
  };

  return (
    <div>
      <h1>会員登録</h1>

      <section className={styles.grid}>
        <form>
          <div className={styles.signup}>
            {/* ニックネーム */}
            <div className={styles.field}>
              <label>ニックネーム</label>

              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </div>
            {/* 生年月日 */}
            <div className={styles.field}>
              <label>生年月日</label>

              <div className={styles.expiry}>
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
            <div className={styles.field}>
              <label>性別</label>

              <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">--選択してください--</option>

                <option value={1}>男性</option>

                <option value={2}>女性</option>
              </select>
            </div>
            {/* 年齢 */}
            <div className={styles.field}>
              <label>年齢</label>

              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>
            {/* メール */}
            <div className={styles.field}>
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
            <div className={styles.field}>
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
              {emailError && <p className={styles.email_error}>{emailError}</p>}
            </div>
            {/* パスワード */}
            <div className={styles.field}>
              <label>パスワード</label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* パスワード確認 */}
            <div className={styles.field}>
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
          <div className={styles.create_button}>
            <Button
              type="submit"
              disabled={isRegistering}
              className={styles.register}
              onClick={handleRegister}
            >
              登録
            </Button>
          </div>
        </form>

        <Airplane />
      </section>
    </div>
  );
}

export default Create;
