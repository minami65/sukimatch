import "./styles/userList.css";
import { useState, useEffect } from "react";
import PageFooter from "./components/footer";
import search from "./assets/search_logo.png";
import { Link } from "react-router-dom";
import ReactSlider from "react-slider";
import { API_BASE } from "@/config";

import {
  PREFECTURES,
  JOB,
  EDUCATION,
  INCOME,
  HOLIDAY,
  ALCOHOL,
  SMOKING,
  LIVING,
  MEETING,
  MARRIAGE,
} from "./data/base.jsx";

function UserList() {
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

  const [filteredUsers, setFilteredUsers] = useState([]);

  const loginUserId = Number(localStorage.getItem("loginUserId") ?? 1);

  useEffect(() => {
    fetch(`${API_BASE}/users`)
      .then((res) => res.json())
      .then((data) => {
        // 自分を除外
        const otherUsers = data.filter((user) => user.user_id !== loginUserId);

        setFilteredUsers(otherUsers);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [loginUserId]);

  // 検索開閉
  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // 検索処理
  const handleFilterSearch = async () => {
    const params = new URLSearchParams();

    params.append("min_age", ageRange[0]);
    params.append("max_age", ageRange[1]);

    if (heightRange[0] !== 100) {
      params.append("min_height", heightRange[0]);
    }

    if (heightRange[1] !== 200) {
      params.append("max_height", heightRange[1]);
    }

    if (prefecture !== 0) {
      params.append("current_location_id", prefecture);
    }

    if (job !== 0) {
      params.append("job_id", job);
    }

    if (education !== 0) {
      params.append("education_id", education);
    }

    if (income !== 0) {
      params.append("income_id", income);
    }

    if (holidays !== 0) {
      params.append("holiday_id", holidays);
    }

    if (alcohol !== 0) {
      params.append("alcohol_id", alcohol);
    }

    if (smoking !== 0) {
      params.append("smoking_id", smoking);
    }

    if (living !== 0) {
      params.append("living_arrangement_id", living);
    }

    if (meeting !== 0) {
      params.append("meeting_preference_id", meeting);
    }

    if (marriage !== 0) {
      params.append("marriage_intention_id", marriage);
    }

    const response = await fetch(
      `${API_BASE}/users?${params.toString()}`,
    );

    const data = await response.json();

    // 自分を除外
    const otherUsers = data.filter((user) => user.user_id !== loginUserId);

    setFilteredUsers(otherUsers);
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

    const response = await fetch(`${API_BASE}/users`);

    const data = await response.json();

    // 自分を除外
    const otherUsers = data.filter((user) => user.user_id !== loginUserId);

    setFilteredUsers(otherUsers);
  };

  return (
    <div className="search_page">
      {/* ヘッダー */}
      <div className="header">
        <h2>さがす</h2>
      </div>

      {/* 虫眼鏡 */}
      <div className="search_set" onClick={handleSearchToggle}>
        <div className="search_icon">
          <img src={search} alt="search_logo" />
        </div>
      </div>

      {/* 検索条件 */}
      {isSearchOpen && (
        <>
          <div className="search_conditions">
            {/* 年齢 */}
            <div className="condition_item">
              <p>
                年齢：{ageRange[0]}歳 〜 {ageRange[1]}歳
              </p>

              <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={ageRange}
                onChange={setAgeRange}
                min={18}
                max={60}
                pearling
                minDistance={1}
              />
            </div>

            {/* 居住地 */}
            <div className="condition_item inline_select">
              <p>居住地</p>

              <select
                value={prefecture}
                onChange={(e) => setPrefecture(Number(e.target.value))}
              >
                {Object.entries(PREFECTURES).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* 職種 */}
            <div className="condition_item inline_select">
              <p>職種</p>

              <select
                value={job}
                onChange={(e) => setJob(Number(e.target.value))}
                value={job}
                onChange={(e) => setJob(Number(e.target.value))}
              >
                {Object.entries(JOB).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* 学歴 */}
            <div className="condition_item inline_select">
              <p>学歴</p>

              <select
                value={education}
                onChange={(e) => setEducation(Number(e.target.value))}
                value={education}
                onChange={(e) => setEducation(Number(e.target.value))}
              >
                {Object.entries(EDUCATION).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* 年収 */}
            <div className="condition_item inline_select">
              <p>年収</p>

              <select
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
              >
                {Object.entries(INCOME).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* 身長 */}
            <div className="condition_item">
              <p>
                身長：{heightRange[0]}cm 〜 {heightRange[1]}cm
              </p>

              <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={heightRange}
                onChange={setHeightRange}
                min={100}
                max={200}
                pearling
                minDistance={1}
              />
            </div>

            {/* 休日 */}
            <div className="condition_item inline_select">
              <p>休日</p>

              <select
                value={holidays}
                onChange={(e) => setHolidays(Number(e.target.value))}
                value={holidays}
                onChange={(e) => setHolidays(Number(e.target.value))}
              >
                {Object.entries(HOLIDAY).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* お酒 */}
            <div className="condition_item inline_select">
              <p>お酒</p>

              <select
                value={alcohol}
                onChange={(e) => setAlcohol(Number(e.target.value))}
                value={alcohol}
                onChange={(e) => setAlcohol(Number(e.target.value))}
              >
                {Object.entries(ALCOHOL).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* タバコ */}
            <div className="condition_item inline_select">
              <p>タバコ</p>

              <select
                value={smoking}
                onChange={(e) => setSmoking(Number(e.target.value))}
                value={smoking}
                onChange={(e) => setSmoking(Number(e.target.value))}
              >
                {Object.entries(SMOKING).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* 暮らし */}
            <div className="condition_item inline_select">
              <p>暮らし</p>

              <select
                value={living}
                onChange={(e) => setLiving(Number(e.target.value))}
                value={living}
                onChange={(e) => setLiving(Number(e.target.value))}
              >
                {Object.entries(LIVING).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* 結婚 */}
            <div className="condition_item inline_select">
              <p>結婚について</p>

              <select
                value={marriage}
                onChange={(e) => setMarriage(Number(e.target.value))}
                value={marriage}
                onChange={(e) => setMarriage(Number(e.target.value))}
              >
                {Object.entries(MARRIAGE).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* 会うまで */}
            <div className="condition_item inline_select">
              <p>会うまでの希望</p>

              <select
                value={meeting}
                onChange={(e) => setMeeting(Number(e.target.value))}
                value={meeting}
                onChange={(e) => setMeeting(Number(e.target.value))}
              >
                {Object.entries(MEETING).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
          

          {/* ボタン */}
          <div className="search_buttons">        
            <button className="reset" onClick={handleReset}>
              リセット
            </button>

            <button className="filter_search" onClick={handleFilterSearch}>
              この条件で検索🔍
            </button>
          </div>
        </>
      )}

      {/* ユーザー一覧 */}
      <div className="user_grid">
        {filteredUsers.length === 0 ? (
          <p className="no_results">条件に一致するユーザーがいません</p>
        ) : (
          filteredUsers.map((user) => {
            return (
              <div key={user.user_id} className="user_card">
                <div className="avatar">
                  <Link to={`/userDetail/${user.user_id}`} className="link">
                    <img
                      src={
                        user.images?.[0]
                          ? `${API_BASE}${user.images[0].image_url}`
                          : "/default.png"
                      }
                      alt="user"
                    />
                  </Link>
                </div>

                <p className="info">
                  {user.age}歳 {user.current_location?.name ?? ""}
                </p>
              </div>
            );
          })
        )}
      </div>
      <PageFooter />
    </div>
  );
}

export default UserList;
