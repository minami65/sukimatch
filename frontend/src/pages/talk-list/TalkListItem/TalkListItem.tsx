import { Link } from 'react-router-dom';

import defaultIcon from '@/assets/default-avatar.png';

import Styles from './TalkListItem.module.css';

interface TalkListItemProps {
  matchId: number;
  userName: string;
  imageUrl?: string | null;
  latestMessage?: string | null;
  latestMessageAt?: string | null;
  unreadCount?: number;
}

const TalkListItem = ({
  matchId,
  imageUrl,
  userName,
  latestMessage,
  latestMessageAt,
  unreadCount,
}: TalkListItemProps) => {
  return (
    <Link to={`/talks/${matchId}`} className={Styles.talkItem}>
      <div className={Styles.profileImageContainer}>
        <img
          src={imageUrl ? imageUrl : defaultIcon}
          alt="プロフィール画像"
          className={Styles.profileImage}
        />
      </div>

      <div className={Styles.talkMain}>
        <p className={Styles.userName}>{userName}</p>
        <p className={Styles.latestMessage}>{latestMessage ?? '\u00A0'}</p>
      </div>

      <div className={Styles.talkSub}>
        <div className={Styles.talkSubContainer}>
          {latestMessage && <span className={Styles.latestMessageAt}>{latestMessageAt}</span>}
          {(unreadCount ?? 0) > 0 && <span className={Styles.unreadDot} />}
        </div>
      </div>
    </Link>
  );
};

export default TalkListItem;
