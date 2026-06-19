import PageFooter from '../../components/footer';
import styles from '../talk/talk.module.css';
import sendButton from '../../assets/send-button.png';
import picture from '../../assets/picture.png';
import { Link } from 'react-router-dom';

export default function Talk() {
  const messages = [
    {
      date: '6/11',
      items: [
        { type: 'other', time: '9:00', bubbles: ['large'] },
        { type: 'me', time: '10:00', bubbles: ['large', 'small'] },
        { type: 'other', time: '15:00', bubbles: ['small', 'large'] },
        { type: 'me', time: '16:00', bubbles: ['small'] },
      ],
    },
    {
      date: '6/12',
      items: [
        { type: 'other', time: '13:00', bubbles: ['small', 'medium'] },
        { type: 'me', time: '15:00', bubbles: ['large', 'medium'] },
      ],
    },
  ];

  return (
    <div className={styles.talkPage}>
      <header className={styles.talkHeader}>
        <Link to="/talkList">
          <button className={styles.backButton}>&lt;</button>
        </Link>
        <div className={styles.talkTitle}>Y</div>
      </header>

      <main className={styles.talkBody}>
        <div className={styles.heartBg}>♡ ♡ ♡ ♡ ♡</div>

        {messages.map((group, groupIndex) => (
          <div key={groupIndex}>
            <div className={styles.dateDivider}>
              <span>{group.date}</span>
            </div>

            {group.items.map((message, index) => (
              <div key={index} className={`${styles.messageRow} ${styles[message.type]}`}>
                {message.type === 'other' && (
                  <div className={styles.avatar}>
                    <span>👤</span>
                  </div>
                )}

                <div className="messageContent">
                  <div className={styles.bubbleList}>
                    {message.bubbles.map((size, bubbleIndex) => (
                      <div
                        key={bubbleIndex}
                        className={`${styles.messageBubble} ${styles[`${message.type}Bubble`]} ${styles[size]}`}
                      />
                    ))}
                  </div>

                  <span className={styles.messageTime}>{message.time}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>

      <div className={styles.messageInputArea}>
        <button className={styles.imageSendButton}>
          <img src={picture} alt="" />
        </button>

        <input placeholder="メッセージを入力" />

        <button className={styles.sendButton}>
          <img src={sendButton} alt="送信ボタン" />
        </button>
      </div>
      <div className={styles.pageFooter}>
        <PageFooter />
      </div>
    </div>
  );
}
