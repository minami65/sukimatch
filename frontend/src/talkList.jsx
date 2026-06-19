import PageFooter from './components/footer';
import './styles/talkList.css';
import { useEffect, useState } from 'react';

export default function TalkList() {
  const talks = [
    { name: 'テスト', message: 'こんにちは。', time: '17:00', unread: true },
    { name: 'テスト', message: 'ど〜も〜', time: '昨日' },
    { name: 'テスト', message: '送信済み', time: '2026/6/1' },
  ];
  const [mainImages, setImages] = useState(null);
  const token = localStorage.getItem('token');

  // プロフィール画像取得
  useEffect(() => {
    // TODO：トーク相手のuser_id取得(↓は仮)
    let userId = 7;
    if (!userId) return;
    fetch(`http://127.0.0.1:8000/users/${userId}/images`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then((res) => res.json())
      .then((json) => {
        const mainImages = json.find((image) => image.sort_order === 1);
        setImages(mainImages);
      });
  }, [token]);
  return (
    <div className="talkListPage">
      <header className="talkListHeader">
        <h1>トーク</h1>
      </header>

      <main className="talkListBody">
        {talks.map((talk, index) => (
          <div className="talkItem" key={index}>
            <div className="talkAvatar">
              {mainImages && (
                <img
                  src={`http://127.0.0.1:8000${mainImages.image_url}`}
                  alt="プロフィール画像"
                  className="profileImage"
                />
              )}
            </div>

            <div className="talkInfo">
              <p className="talkName">{talk.name}</p>
              <p className="talkMessage">{talk.message}</p>
            </div>

            <div className="talkMeta">
              {talk.unread && <span className="unreadDot" />}
              <span className="talkTime">{talk.time}</span>
            </div>
          </div>
        ))}
      </main>

      <PageFooter />
    </div>
  );
}
