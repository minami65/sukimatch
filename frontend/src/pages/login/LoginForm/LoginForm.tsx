import React, { useState } from 'react';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import Airplane from '@/components/airplane';

import couple from '@/assets/image2.png';

import styles from './LoginForm.module.css';

const Form = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/login', {
        mail_address: email,
        password: password,
      });
      localStorage.setItem('token', res.data.access_token);
      navigate('/userList');
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('メールアドレスかパスワードが間違っています。');
      } else {
        setError('ログインに失敗しました。もう一度お試しください。');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.title}>
        <h1>スキマッチ</h1>
      </div>
      <div className={styles.coupleImg}>
        <img src={couple} className={styles.couple} alt="Couple" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.loginForm}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="メールアドレス"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="パスワード"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center', margin: '8px 0' }}>{error}</p>}
        <div className={styles.formButton}>
          <input
            type="submit"
            className={styles.login}
            value={loading ? 'ログイン中...' : 'ログイン'}
            disabled={loading}
          />
          <Link to="/create" className={styles.newRegistration}>
            新規の方はこちら
          </Link>
        </div>
      </form>
      <Airplane />
    </>
  );
};

export default Form;
