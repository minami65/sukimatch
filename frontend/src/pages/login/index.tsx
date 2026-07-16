import { useSearchParams } from 'react-router-dom';

import Form from './LoginForm/LoginForm';
import styles from './login.module.css';

function Login() {
  const [searchParams] = useSearchParams();
  const isExpired = searchParams.get('reason') === 'expired';

  return (
    <div className="page">
      <div id="login_form">
        {isExpired && (
          <div className={styles.errorBanner || 'error-banner'}>
            ⚠️ セッションの有効期限が切れました。再度ログインしてください。
          </div>
        )}
        <Form />
      </div>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </div>
  );
}

export default Login;
