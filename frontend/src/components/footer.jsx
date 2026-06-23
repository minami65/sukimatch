import { Link } from 'react-router-dom';

import mypage from '../assets/mypage.png';
import receive from '../assets/receive.png';
import search from '../assets/search.png';
import talk from '../assets/talk.png';
import './styles/footer.css';

function PageFooter() {
  return (
    <footer>
      <div className="img_search">
        <Link to="/userList" className="link">
          <img src={search} className="search" alt="logo" />
          さがす
        </Link>
      </div>
      <div className="img_receive">
        <Link to="/receive" className="link">
          <img src={receive} className="receive" alt="logo" />
          受けとったいいね!
        </Link>
      </div>
      <div className="img_talk">
        <Link to="/talkList" className="link">
          <img src={talk} className="talk" alt="logo" />
          トーク
        </Link>
      </div>
      <div className="img_mypage">
        <Link to="/mypage" className="link">
          <img src={mypage} className="mypage" alt="logo" />
          マイページ
        </Link>
      </div>
    </footer>
  );
}

export default PageFooter;
