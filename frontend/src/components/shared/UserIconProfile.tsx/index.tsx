import defaultIcon from '@/assets/default-avatar.png';

import styles from './UserIconProfile.module.css';

interface UserIconProfileProps {
  name: string;
  isSelected?: boolean;
  imageUrl?: string;
  onClickIcon?: () => void;
  size?: 'normal' | 'small' | 'large';
}

const UserIconProfile = ({
  name,
  isSelected,
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
  const buttonClass = `${styles.iconButton} ${isSelected ? styles.selected : ''}`.trim();

  return (
    <div className={containerClass}>
      <button
        type="button"
        className={buttonClass}
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
