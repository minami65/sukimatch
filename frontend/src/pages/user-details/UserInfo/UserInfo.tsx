import { UserDetailResponse } from '@/api/generated/models';
import {
  ALCOHOL,
  EDUCATION,
  HOLIDAY,
  INCOME,
  JOB,
  LIVING,
  MARRIAGE,
  MEETING,
  PREFECTURES,
  SMOKING,
} from '@/data/base.jsx';

import styles from './UserInfo.module.css';

interface UserInfoProps {
  user: UserDetailResponse;
}

const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <>
      {/* 基本情報 */}
      <div className={styles.userBaseInfo}>
        {/* 名前 */}
        <h2>
          {user.name} <span className={styles.age}>{user.age}歳</span>{' '}
          <span className={styles.location}>
            {PREFECTURES[(user.current_location_id ?? 0) as keyof typeof PREFECTURES]}
          </span>
        </h2>

        {/* 自己紹介文 */}
        <p className={styles.bio}>{user.bio ? user.bio : '自己紹介文がありません'}</p>
      </div>

      {/* 詳細情報 */}
      <div className={styles.userDetailInfo}>
        <div className={styles.row}>
          <span>出身地</span>
          <span>{PREFECTURES[(user.birth_location_id ?? 0) as keyof typeof PREFECTURES]}</span>
        </div>

        <div className={styles.row}>
          <span>居住地</span>
          <span>{PREFECTURES[(user.current_location_id ?? 0) as keyof typeof PREFECTURES]}</span>
        </div>

        <div className={styles.row}>
          <span>学歴</span>
          <span>{EDUCATION[(user.education_id ?? 0) as keyof typeof EDUCATION]}</span>
        </div>

        <div className={styles.row}>
          <span>職種</span>
          <span>{JOB[(user.job_id ?? 0) as keyof typeof JOB]}</span>
        </div>

        <div className={styles.row}>
          <span>年収</span>
          <span>{INCOME[(user.income_id ?? 0) as keyof typeof INCOME]}</span>
        </div>

        <div className={styles.row}>
          <span>身長</span>
          <span>{user.height}cm</span>
        </div>

        <div className={styles.row}>
          <span>休日</span>
          <span>{HOLIDAY[(user.holiday_id ?? 0) as keyof typeof HOLIDAY]}</span>
        </div>

        <div className={styles.row}>
          <span>お酒</span>
          <span>{ALCOHOL[(user.alcohol_id ?? 0) as keyof typeof ALCOHOL]}</span>
        </div>

        <div className={styles.row}>
          <span>タバコ</span>
          <span>{SMOKING[(user.smoking_id ?? 0) as keyof typeof SMOKING]}</span>
        </div>

        <div className={styles.row}>
          <span>同居人</span>
          <span>{LIVING[(user.living_arrangement_id ?? 0) as keyof typeof LIVING]}</span>
        </div>

        <div className={styles.row}>
          <span>結婚に対する意思</span>
          <span>{MARRIAGE[(user.marriage_intention_id ?? 0) as keyof typeof MARRIAGE]}</span>
        </div>

        <div className={styles.row}>
          <span>出会うまでの希望</span>
          <span>{MEETING[(user.meeting_preference_id ?? 0) as keyof typeof MEETING]}</span>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
