import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import Modal from '@/components/Modal';

import balloonImage from '@/assets/balloon.png';

import UserIconProfile from '../../UserIconProfile.tsx';
import styles from './MatchNotificationModal.module.css';

export interface MatchedUser {
  id: number;
  name: string;
  imageUrl?: string;
}

interface MatchNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchedUsers: MatchedUser[];
}

const MatchNotificationModal = ({ isOpen, onClose, matchedUsers }: MatchNotificationModalProps) => {
  const navigate = useNavigate();
  const isMultiple = matchedUsers.length > 1;

  const handleClickStart = () => {
    onClose();
    navigate('/talkList');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showOverlay={true}>
      <div className={styles.innerContainer}>
        <img src={balloonImage} alt="balloon" className={styles.image} />

        <div className={styles.messageContainer}>
          <p>おめでとうございます！</p>
          <p>
            {isMultiple
              ? `${matchedUsers.length}人とのマッチングが成立しました！`
              : 'マッチングが成立しました！'}
          </p>
        </div>

        <div
          className={`${styles.usersDisplayArea} ${isMultiple ? styles.multiple : styles.single}`}
        >
          {matchedUsers.map((partner) => (
            <UserIconProfile
              key={partner.id}
              imageUrl={partner.imageUrl}
              name={partner.name}
              size={isMultiple ? 'small' : 'normal'}
            />
          ))}
        </div>

        <div className={styles.buttonWrapper}>
          <Button fullWidth onClick={handleClickStart}>
            さっそくトークをはじめる！
          </Button>
          <Button fullWidth variant="tertiary" onClick={onClose}>
            とじる
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MatchNotificationModal;
