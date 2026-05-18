import "./styles/userDetails.css";
import PageFooter from "./components/footer";
import close from "./assets/close.png";
import likeIcon from "./assets/like.png";
import likedIcon from "./assets/liked.png";
import users from "../src/data/users.json";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

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
  MARRIAGE,
  MEETING,
} from "./data/base.jsx";

function UserDetails() {
  const { id } = useParams();
  const user = users.find((u) => Number(u.id) === Number(id));
  const images = user.images;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  return (
    <>
      <div className="main_img">
        <img src={images[currentIndex]} className="user1" alt="main" />
        {/* 左ボタン */}
        <div
          className="arrow left"
          onClick={() =>
            setCurrentIndex(
              (prev) => (prev - 1 + images.length) % images.length,
            )
          }
        >
          ‹
        </div>

        {/* 右ボタン */}
        <div
          className="arrow right"
          onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        >
          ›
        </div>
        <Link to={`/userList`} className="link">
          <img src={close} className="close" alt="close" />
        </Link>
      </div>

      <div className="sub_img">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className={i === currentIndex ? "active_thumb" : ""}
            onClick={() => setCurrentIndex(i)}
            alt="thumb"
          />
        ))}
      </div>

      <div className="user_info">
        <div className="main_profile">
          <h2>
            {user.name} <span className="age">{user.age}歳</span>{" "}
            <span className="location">{user.location}</span>
          </h2>
          <div className="profile">
            <p className="bio">{user.bio}</p>
          </div>
        </div>
      </div>

      <div className="row">
        <span>出身地</span>
        <span>{PREFECTURES[user.birth_location_id]}</span>
      </div>

      <div className="row">
        <span>居住地</span>
        <span>{PREFECTURES[user.current_location_id]}</span>
      </div>

      <div className="row">
        <span>学歴</span>
        <span>{EDUCATION[user.education_id]}</span>
      </div>

      <div className="row">
        <span>職種</span>
        <span>{JOB[user.job_id]}</span>
      </div>

      <div className="row">
        <span>年収</span>
        <span>{INCOME[user.income_id]}</span>
      </div>

      <div className="row">
        <span>身長</span>
        <span>{user.height}cm</span>
      </div>

      <div className="row">
        <span>休日</span>
        <span>{HOLIDAY[user.holiday_id]}</span>
      </div>

      <div className="row">
        <span>お酒</span>
        <span>{ALCOHOL[user.alcohol_id]}</span>
      </div>

      <div className="row">
        <span>タバコ</span>
        <span>{SMOKING[user.smoking_id]}</span>
      </div>

      <div className="row">
        <span>同居人</span>
        <span>{LIVING[user.living_arrangement_id]}</span>
      </div>

      <div className="row">
        <span>結婚に対する意思</span>
        <span>{MARRIAGE[user.marriage_intention_id]}</span>
      </div>

      <div className="row">
        <span>出会うまでの希望</span>
        <span>{MEETING[user.meeting_preference_id]}</span>
      </div>

      <img
        src={liked ? likedIcon : likeIcon}
        className="like_button"
        alt="like"
        onClick={() => {
          if (!liked) {
            setLiked(true);
          }
        }}
      />

      <PageFooter />
    </>
  );
}

export default UserDetails;
