import PageFooter from "./components/footer";
import "./styles/profile.css";
import "./assets/default-profile.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ToMypageButton from "./components/toMypageButton";

export default function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    birth_location_id: "",
    current_location_id: "",
    education_id: "",
    job_id: "",
    income_id: "",
    height: "",
    marriage_intention_id: "",
    holiday_id: "",
    alcohol_id: "",
    smoking_id: "",
    living_arrangement_id: "",
    meeting_preference_id: "",
  });

  const [locations, setLocations] = useState([]);
  const [education, setEducation] = useState([]);
  const [job, setJob] = useState([]);
  const [income, setIncome] = useState([]);
  const [marriage, setMarriage] = useState([]);
  const [holiday, setHoliday] = useState([]);
  const [alcohol, setAlcohol] = useState([]);
  const [smoking, setSmoking] = useState([]);
  const [living, setLiving] = useState([]);
  const [meeting, setMeeting] = useState([]);
  const [images, setImages] = useState([]);

  // 登録済みユーザー情報取得
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!token) {
          navigate("/");
          return;
        }

        const userInfo = await fetch("http://127.0.0.1:8000/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await userInfo.json();
        setForm(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfo();
  }, [navigate, token, userId]);

  // 登録済み画像取得
  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        if (!token) {
          navigate("/");
          return;
        }
        const userImage = await fetch(
          `http://127.0.0.1:8000/users/${userId}/images`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const userImageData = await userImage.json();
        setImages(userImageData);
        console.log(userImageData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserImage();
  }, [navigate, token, userId]);

  // 出身地・居住地
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/locations");
        const data = await res.json();
        setLocations(data);
      } catch (error) {
        console.error("エラー:", error);
      }
    };

    fetchLocations();
  }, []);

  // 学歴
  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const educationResponse = await fetch(
          "http://127.0.0.1:8000/education",
        );
        const educationData = await educationResponse.json();
        setEducation(educationData);
      } catch (error) {
        console.error("エラー:", error);
      }
    };
    fetchEducations();
  }, []);

  // 職種
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobResponse = await fetch("http://127.0.0.1:8000/job");
        const jobData = await jobResponse.json();
        setJob(jobData);
      } catch (error) {
        console.error("エラー:", error);
      }
    };
    fetchJob();
  }, []);

  // 年収
  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const incomeResponse = await fetch("http://127.0.0.1:8000/income");
        const incomeData = await incomeResponse.json();
        setIncome(incomeData);
      } catch (error) {
        console.error("エラー:", error);
      }
    };
    fetchIncome();
  }, []);

  // 結婚に対する意思
  useEffect(() => {
    const fetchMarriage = async () => {
      try {
        const marriageResponse = await fetch("http://127.0.0.1:8000/marriage");
        const marriageData = await marriageResponse.json();
        setMarriage(marriageData);
      } catch (error) {
        console.error("エラー:", error);
      }
    };
    fetchMarriage();
  }, []);
  // 休日
  useEffect(() => {
    const fetchHoliday = async () => {
      try {
        const holidayResponse = await fetch("http://127.0.0.1:8000/holiday");
        const holidayData = await holidayResponse.json();
        setHoliday(holidayData);
      } catch (error) {
        console.error("エラー:", error);
      }
    };
    fetchHoliday();
  }, []);

  // お酒
  useEffect(() => {
    const fetchAlcohol = async () => {
      try {
        const alcoholResponse = await fetch("http://127.0.0.1:8000/alcohol");
        const alcoholData = await alcoholResponse.json();
        setAlcohol(alcoholData);
      } catch (error) {
        console.error("エラー:", error);
      }
    };
    fetchAlcohol();
  }, []);

  // タバコ
  useEffect(() => {
    const fetchSmoking = async () => {
      try {
        const smokingResponse = await fetch("http://127.0.0.1:8000/smoking");
        const smokingData = await smokingResponse.json();
        setSmoking(smokingData);
      } catch (error) {
        console.error("エラー:", error);
      }
    };
    fetchSmoking();
  }, []);

  // 同居人
  useEffect(() => {
    const fetchLiving = async () => {
      try {
        const livingResponse = await fetch("http://127.0.0.1:8000/living");
        const livingData = await livingResponse.json();
        setLiving(livingData);
      } catch (error) {
        console.error("エラー", error);
      }
    };
    fetchLiving();
  }, []);
  // 出会うまでの希望
  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const meetingResponse = await fetch("http://127.0.0.1:8000/meeting");
        const meetingData = await meetingResponse.json();
        setMeeting(meetingData);
      } catch (error) {
        console.error("エラー:", error);
      }
    };
    fetchMeeting();
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 画像の表示
  const [deletedImageIds, setDeletedImageIds] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    const newImages = files.map((file, index) => ({
      tempId: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      sort_order: images.length + index + 1,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleImageDelete = (imageId) => {
    setImages((prev) => {
      const remaining = prev.filter(
        (image) => image.id !== imageId && image.tempId !== imageId,
      );

      const removed = prev.find((image) => image.id === imageId);
      if (removed && removed.id) {
        setDeletedImageIds((d) => [...d, removed.id]);
      }

      return remaining;
    });
    console.log("setImages", images);
  };
  // 登録
  const handleSubmit = async () => {
    if (!token) {
      navigate("/");
      return;
    }

    try {
      for (const id of deletedImageIds) {
        try {
          await axios.delete(`http://127.0.0.1:8000/users/me/images/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (err) {
          console.error(`Failed to delete image ${id}:`, err);
        }
      }

      for (const image of images) {
        if (!image.file) continue;

        const formData = new FormData();
        formData.append("file", image.file);

        await axios.post("http://127.0.0.1:8000/users/me/images", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      await axios.put("http://127.0.0.1:8000/users/me", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/mypage");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="imageSection">
        {/* メイン画像 */}
        <div className="mainProfileImage">
          {images?.[0] && (
            <img
              src={
                images[0].image_url
                  ? `http://127.0.0.1:8000${images[0].image_url}`
                  : images[0].preview
              }
              alt="プロフィール画像"
              className="profileImage"
            />
          )}
          <label htmlFor="imageUpload" className="plusButton">
            ＋
          </label>

          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleImageChange}
          />
        </div>

        {/* サブ画像一覧 */}
        <div className="subImages">
          {images.length > 1 &&
            images.slice(1).map((m) => (
              <div key={m.id || m.tempId} style={{ position: "relative" }}>
                <button
                  type="button"
                  className="deleteButton"
                  onClick={() => handleImageDelete(m.id || m.tempId)}
                >
                  ×
                </button>

                <img
                  src={
                    m.image_url
                      ? `http://127.0.0.1:8000${m.image_url}`
                      : m.preview
                  }
                  alt="サブプロフィール"
                  className="subImage"
                />
              </div>
            ))}
        </div>
      </div>

      <div className="introductionText">
        <input
          type="text"
          name="bio"
          value={form.bio || ""}
          onChange={handleChange}
        />
      </div>

      <div className="profileDetail">
        <p>プロフィール</p>

        <div className="profileInput">
          <p>出身地</p>
          <select
            name="birth_location_id"
            value={form.birth_location_id}
            onChange={handleChange}
          >
            <option value="">選択してください</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <div className="profileInput">
          <p>居住地</p>
          <select
            name="current_location_id"
            value={form.current_location_id}
            onChange={handleChange}
          >
            <option value="">選択してください</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <div className="profileInput">
          <p>学歴</p>
          <select
            name="education_id"
            value={form.education_id}
            onChange={handleChange}
          >
            <option value="">選択してください</option>
            {education.map((edu) => (
              <option key={edu.education_id} value={edu.education_id}>
                {edu.education_name}
              </option>
            ))}
          </select>
        </div>

        <div className="profileInput">
          <p>職種</p>
          <select name="job_id" value={form.job_id} onChange={handleChange}>
            <option value="">選択してください</option>
            {job.map((j) => (
              <option key={j.job_id} value={j.job_id}>
                {j.job_name}
              </option>
            ))}
          </select>
        </div>

        <div className="profileInput">
          <p>年収</p>
          <select
            name="income_id"
            value={form.income_id}
            onChange={handleChange}
          >
            <option value="">選択してください</option>
            {income.map((i) => (
              <option key={i.income_id} value={i.income_id}>
                {i.income_name}
              </option>
            ))}
          </select>
        </div>

        {/* TODO:身長の入力欄 */}
        <div className="profileInput">
          <p>身長</p>
          <input
            type="text"
            name="height"
            value={form.height}
            onChange={handleChange}
          />
          &nbsp;cm
        </div>

        <div className="profileInput">
          <p>結婚に対する意思</p>
          <select
            name="marriage_intention_id"
            value={form.marriage_intention_id}
            onChange={handleChange}
          >
            <option value="">選択してください</option>
            {marriage.map((m) => (
              <option
                key={m.marriage_intention_id}
                value={m.marriage_intention_id}
              >
                {m.marriage_intention_name}
              </option>
            ))}
          </select>
        </div>

        <div className="profileInput">
          <p>休日</p>
          <select
            name="holiday_id"
            value={form.holiday_id}
            onChange={handleChange}
          >
            <option value="">選択してください</option>
            {holiday.map((h) => (
              <option key={h.holiday_id} value={h.holiday_id}>
                {h.holiday_name}
              </option>
            ))}
          </select>
        </div>

        <div className="profileInput">
          <p>お酒</p>
          <select
            name="alcohol_id"
            value={form.alcohol_id}
            onChange={handleChange}
          >
            <option value="">選択してください</option>
            {alcohol.map((a) => (
              <option key={a.alcohol_id} value={a.alcohol_id}>
                {a.alcohol_name}
              </option>
            ))}
          </select>
        </div>

        <div className="profileInput">
          <p>タバコ</p>
          <select
            name="smoking_id"
            value={form.smoking_id}
            onChange={handleChange}
          >
            <option value="">選択してください</option>
            {smoking.map((s) => (
              <option key={s.smoking_id} value={s.smoking_id}>
                {s.smoking_name}
              </option>
            ))}
          </select>
        </div>

        <div className="profileInput">
          <p>同居人</p>
          <select
            name="living_arrangement_id"
            value={form.living_arrangement_id}
            onChange={handleChange}
          >
            <option value="">選択してください</option>
            {living.map((l) => (
              <option
                key={l.living_arrangement_id}
                value={l.living_arrangement_id}
              >
                {l.living_arrangement_name}
              </option>
            ))}
          </select>
        </div>

        <div className="profileInput">
          <p>出会うまでの希望</p>
          <select
            name="meeting_preference_id"
            value={form.meeting_preference_id}
            onChange={handleChange}
          >
            <option value="">選択してください</option>
            {meeting.map((m) => (
              <option
                key={m.meeting_preference_id}
                value={m.meeting_preference_id}
              >
                {m.meeting_preference_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="buttonGroup">
        <button onClick={handleSubmit} className="button">
          登録
        </button>
        <ToMypageButton />
      </div>
      <PageFooter />
    </div>
  );
}
