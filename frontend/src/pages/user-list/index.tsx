import { useState } from 'react';

import { Link } from 'react-router-dom';

import Button from '@/components/Button/index.js';
import DoubleSlider from '@/components/DoubleSlider/index.js';
import { FullPageLoading } from '@/components/Loading/FullPageLoading/index.js';

import { useAuth } from '@/hooks/useAuth.js';
import { useFilteredUsers } from '@/hooks/useUser.js';

import { GetUserListUsersGetParams } from '@/api/generated/models/getUserListUsersGetParams.js';
import search from '@/assets/search_logo.png';
import { API_BASE } from '@/config';

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
} from '../../data/base.jsx';
import styles from './userList.module.css';

function UserList() {
  const { user: currentUser } = useAuth();
  const loginUserId = currentUser?.user_id ?? 1;

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [ageRange, setAgeRange] = useState([18, 60]);
  const [heightRange, setHeightRange] = useState([100, 200]);
  const [prefecture, setPrefecture] = useState(0);
  const [job, setJob] = useState(0);
  const [education, setEducation] = useState(0);
  const [income, setIncome] = useState(0);
  const [holidays, setHolidays] = useState(0);
  const [alcohol, setAlcohol] = useState(0);
  const [smoking, setSmoking] = useState(0);
  const [living, setLiving] = useState(0);
  const [meeting, setMeeting] = useState(0);
  const [marriage, setMarriage] = useState(0);

  const [activeParams, setActiveParams] = useState<GetUserListUsersGetParams>({
    min_age: 18,
    max_age: 60,
  });

  const { users: filteredUsers, isLoading } = useFilteredUsers(activeParams, loginUserId);

  // 検索開閉
  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // 検索処理
  const handleFilterSearch = async () => {
    const params: GetUserListUsersGetParams = {
      min_age: ageRange[0],
      max_age: ageRange[1],
    };
    if (heightRange[0] !== 100) params.min_height = heightRange[0];
    if (heightRange[1] !== 200) params.max_height = heightRange[1];
    if (prefecture !== 0) params.current_location_id = prefecture;
    if (job !== 0) params.job_id = job;
    if (education !== 0) params.education_id = education;
    if (income !== 0) params.income_id = income;
    if (holidays !== 0) params.holiday_id = holidays;
    if (alcohol !== 0) params.alcohol_id = alcohol;
    if (smoking !== 0) params.smoking_id = smoking;
    // TODO: Fix living arrangement id to be included
    // if (living !== 0) params.living_arrangement_id = living;
    if (meeting !== 0) params.meeting_preference_id = meeting;
    if (marriage !== 0) params.marriage_intention_id = marriage;

    setActiveParams(params);
    setIsSearchOpen(false);
  };

  // リセット
  const handleReset = async () => {
    setAgeRange([18, 60]);
    setHeightRange([100, 200]);
    setPrefecture(0);
    setJob(0);
    setEducation(0);
    setIncome(0);
    setHolidays(0);
    setAlcohol(0);
    setSmoking(0);
    setLiving(0);
    setMeeting(0);
    setMarriage(0);

    setActiveParams({
      min_age: 18,
      max_age: 60,
    });
    setIsSearchOpen(false);
  };

  if (isLoading) return <FullPageLoading />;

  return (
    <div className={styles.searchPage}>
      {/* ヘッダー */}
      <div className={styles.header}>
        <h2>さがす</h2>
      </div>

      {/* 虫眼鏡 */}
      <div className={styles.searchSet} onClick={handleSearchToggle}>
        <div className={styles.searchIcon}>
          <img src={search} alt="search_logo" />
        </div>
      </div>

      {/* 検索条件 */}
      {isSearchOpen && (
        <div className={styles.searchContainer}>
          <div className={styles.searchConditions}>
            {/* 年齢 */}
            <div className={`${styles.conditionItem} ${styles.slider_item}`}>
              <p>
                年齢：{ageRange[0]}歳 〜 {ageRange[1]}歳
              </p>

              <DoubleSlider value={ageRange} onValueChange={setAgeRange} min={18} max={60} />
            </div>

            {/* 居住地 */}
            <div className={`${styles.conditionItem} ${styles.inlineSelect}`}>
              <p>居住地</p>

              <select value={prefecture} onChange={(e) => setPrefecture(Number(e.target.value))}>
                {Object.entries(PREFECTURES).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* 職種 */}
            <div className={`${styles.conditionItem} ${styles.inlineSelect}`}>
              <p>職種</p>

              <select value={job} onChange={(e) => setJob(Number(e.target.value))}>
                {Object.entries(JOB).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* 学歴 */}
            <div className={`${styles.conditionItem} ${styles.inlineSelect}`}>
              <p>学歴</p>

              <select value={education} onChange={(e) => setEducation(Number(e.target.value))}>
                {Object.entries(EDUCATION).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* 年収 */}
            <div className={`${styles.conditionItem} ${styles.inlineSelect}`}>
              <p>年収</p>

              <select value={income} onChange={(e) => setIncome(Number(e.target.value))}>
                {Object.entries(INCOME).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* 身長 */}
            <div className={`${styles.conditionItem} ${styles.sliderItem}`}>
              <p>
                身長：{heightRange[0]}cm 〜 {heightRange[1]}cm
              </p>

              <DoubleSlider
                value={heightRange}
                onValueChange={setHeightRange}
                min={100}
                max={200}
              />
            </div>

            {/* 休日 */}
            <div className={`${styles.conditionItem} ${styles.inlineSelect}`}>
              <p>休日</p>

              <select value={holidays} onChange={(e) => setHolidays(Number(e.target.value))}>
                {Object.entries(HOLIDAY).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* お酒 */}
            <div className={`${styles.conditionItem} ${styles.inlineSelect}`}>
              <p>お酒</p>

              <select value={alcohol} onChange={(e) => setAlcohol(Number(e.target.value))}>
                {Object.entries(ALCOHOL).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* タバコ */}
            <div className={`${styles.conditionItem} ${styles.inlineSelect}`}>
              <p>タバコ</p>

              <select value={smoking} onChange={(e) => setSmoking(Number(e.target.value))}>
                {Object.entries(SMOKING).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* 暮らし */}
            <div className={`${styles.conditionItem} ${styles.inlineSelect}`}>
              <p>暮らし</p>

              <select value={living} onChange={(e) => setLiving(Number(e.target.value))}>
                {Object.entries(LIVING).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* 結婚 */}
            <div className={`${styles.conditionItem} ${styles.inlineSelect}`}>
              <p>結婚について</p>

              <select value={marriage} onChange={(e) => setMarriage(Number(e.target.value))}>
                {Object.entries(MARRIAGE).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* 会うまで */}
            <div className={`${styles.conditionItem} ${styles.inlineSelect}`}>
              <p>会うまでの希望</p>

              <select value={meeting} onChange={(e) => setMeeting(Number(e.target.value))}>
                {Object.entries(MEETING).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ボタン */}
          <div className={styles.searchButtons}>
            <Button
              variant="tertiary"
              size="md"
              fullWidth
              className={styles.reset}
              onClick={handleReset}
            >
              リセット
            </Button>

            <Button
              variant="primary"
              size="md"
              fullWidth
              className={styles.filterSearch}
              onClick={handleFilterSearch}
            >
              この条件で検索🔍
            </Button>
          </div>
        </div>
      )}

      {/* ユーザー一覧 */}
      <div className={styles.userGrid}>
        {filteredUsers.length === 0 ? (
          <p className={styles.noResults}>条件に一致するユーザーがいません</p>
        ) : (
          filteredUsers.map((user) => {
            return (
              <div key={user.user_id} className={styles.userCard}>
                <div className={styles.avatar}>
                  <Link to={`/userDetail/${user.user_id}`} className={styles.link}>
                    <img
                      src={
                        user.images?.[0] ? `${API_BASE}${user.images[0].image_url}` : '/default.png'
                      }
                      alt="user"
                    />
                  </Link>
                </div>

                <p className={styles.info}>
                  {user.age}歳 {user.current_location?.name ?? ''}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default UserList;
