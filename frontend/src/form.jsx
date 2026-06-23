import { useState } from 'react';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import couple from './assets/image2.png';
import Airplane from './components/airplane';
import './styles/form.css';

const Form = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
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
    } catch (err) {
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
      <div className="title">
        <h1>スキマッチ</h1>
      </div>
      <div className="couple_img">
        <img src={couple} className="couple" alt="Couple" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login_form">
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
        <div className="form_button">
          <input
            type="submit"
            className="login"
            value={loading ? 'ログイン中...' : 'ログイン'}
            disabled={loading}
          />
          <Link to="/create" className="new_registration">
            新規の方はこちら
          </Link>
        </div>
      </form>
      <Airplane />
    </>
  );
};

export default Form;
