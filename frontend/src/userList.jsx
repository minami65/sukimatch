import "./styles/userList.css";
import { useState } from "react";
import users from "../src/data/users.json";
import PageFooter from "./components/footer";
import search from "./assets/search_logo.png";
import { Link } from "react-router-dom";
import ReactSlider from "react-slider";
import {
  PREFECTURES,
  JOB,
  EDUCATION,
  BODY_TYPE,
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

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  const [ageRange, setAgeRange] = useState([20, 30]);
  const [prefecture, setPrefecture] = useState(0);

  return (
    <div className="search_page">
      {/* ヘッダー */}
      <div className="header">
        <h2>さがす</h2>
      </div>

      {/* 虫眼鏡ボタン */}
      <div className="search_set" onClick={handleSearchToggle}>
        <div className="search_icon">
          <img src={search} alt="search_logo" />
        </div>
      </div>

      {/* 検索条件 */}
      {isSearchOpen && (
        <>
          <div className="search_conditions">
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
            <p>
              居住地
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
            </p>
            <p>
              職種&nbsp;&nbsp;{" "}
              <select
                value={prefecture}
                onChange={(e) => setPrefecture(Number(e.target.value))}
              >
                {Object.entries(JOB).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </p>
            <p>
              学歴&nbsp;&nbsp;{" "}
              <select
                value={prefecture}
                onChange={(e) => setPrefecture(Number(e.target.value))}
              >
                {Object.entries(EDUCATION).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </p>
            <p>
              年収&nbsp;&nbsp;{" "}
              <select
                value={prefecture}
                onChange={(e) => setPrefecture(Number(e.target.value))}
              >
                {Object.entries(INCOME).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </p>
            <p>
              身長&nbsp;&nbsp;{" "}
              {/* <select
                value={prefecture}
                onChange={(e) => setPrefecture(Number(e.target.value))}
              >
                {Object.entries(HOLIDAY).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select> */}
            </p>
            <p>
              休日&nbsp;&nbsp;{" "}
              <select
                value={prefecture}
                onChange={(e) => setPrefecture(Number(e.target.value))}
              >
                {Object.entries(HOLIDAY).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </p>
            <p>
              お酒&nbsp;&nbsp;{" "}
              <select
                value={prefecture}
                onChange={(e) => setPrefecture(Number(e.target.value))}
              >
                {Object.entries(ALCOHOL).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </p>
            <p>
              タバコ&nbsp;{" "}
              <select
                value={prefecture}
                onChange={(e) => setPrefecture(Number(e.target.value))}
              >
                {Object.entries(SMOKING).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </p>
            <p>
              暮らし&nbsp;{" "}
              <select
                value={prefecture}
                onChange={(e) => setPrefecture(Number(e.target.value))}
              >
                {Object.entries(LIVING).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </p>
            <p>
              結婚について&nbsp;&nbsp;{" "}
              <select
                value={prefecture}
                onChange={(e) => setPrefecture(Number(e.target.value))}
              >
                {Object.entries(MARRIAGE).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </p>
            <p>
              会うまでの希望&nbsp;&nbsp;{" "}
              <select
                value={prefecture}
                onChange={(e) => setPrefecture(Number(e.target.value))}
              >
                {Object.entries(MEETING).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </p>
          </div>
          <div className="search_buttons">
            {/* リセット */}
            <button
              className="reset"
              onClick={() => {
                console.log("リセット");
              }}
            >
              リセット
            </button>

            {/* 検索 */}
            <button
              className="filter_search"
              onClick={() => {
                console.log("検索");
              }}
            >
              この条件で検索🔍
            </button>
          </div>
        </>
      )}

      {/* ユーザー一覧 */}
      <div className="user_grid">
        {users.map((user) => (
          <div key={user.id} className="user_card">
            <div className="avatar">
              <Link to={`/userDetail/${user.id}`} className="link">
                <img src={user.images[0] || "/default.png"} alt="user" />
              </Link>
            </div>

            <p className="info">
              {user.age}歳 {user.location}
            </p>
          </div>
        ))}
      </div>

      <PageFooter />
    </div>
  );
}

export default UserList;
