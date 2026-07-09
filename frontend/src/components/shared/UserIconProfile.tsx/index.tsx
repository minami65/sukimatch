import defaultIcon from '@/assets/default-avatar.png';

import styles from './UserIconProfile.module.css';

interface UserIconProfileProps {
  name: string;
  imageUrl?: string;
  onClickIcon?: () => void;
  size?: 'normal' | 'small' | 'large';
}

const UserIconProfile = ({
  name,
  imageUrl,
  onClickIcon,
  size = 'normal',
}: UserIconProfileProps) => {
  const sizeClasses = {
    small: styles.small,
    large: styles.large,
    normal: '',
  };
  const sizeClass = sizeClasses[size] || '';
  const containerClass = `${styles.container} ${sizeClass}`.trim();

  return (
    <div className={containerClass}>
      <button
        type="button"
        className={styles.iconButton}
        onClick={onClickIcon}
        disabled={!onClickIcon}
        aria-label={`${name}さんのアイコン`}
      >
        <img src={imageUrl || defaultIcon} alt={name} className={styles.avatar} />
      </button>

      <span className={styles.name}>{name}</span>
    </div>
  );
};

export default UserIconProfile;
