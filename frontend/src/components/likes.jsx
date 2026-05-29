import "./styles/likes.css";
import like from "../assets/likes-button.png";
import axios from "axios";

export default function Likes({ footprintId }) {
  console.log("footprintId:", footprintId);

  const handleLikeCreate = async () => {
    console.log("いいね！", footprintId);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzgwMDM1Mjk3fQ.GoudyJero96Ds1Rcc6Avf0Ud5bIyZ1NvNAVRmRqDDYs";
    try {
      await axios.post(
        `http://127.0.0.1:8000/users/${footprintId}/like`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(`userId${footprintId}にいいねしました`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="like">
      <img
        src={like}
        alt="いいね"
        className="like-button"
        onClick={() => handleLikeCreate()}
      />
      <p>いいね</p>
    </div>
  );
}
