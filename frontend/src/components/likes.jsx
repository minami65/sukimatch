import './styles/likes.css';
import like from '../assets/likes-button.png';
import axios from 'axios';

export default function Likes({ footprintId, disabled }) {
  console.log('footprintId:', footprintId);

  const handleLikeCreate = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.assign('/');
      return;
    }
    try {
      await axios.post(`http://127.0.0.1:8000/users/${footprintId}/like`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`userId${footprintId}にいいねしました`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`like ${disabled ? 'disabled' : ''}`}>
      <img
        src={like}
        alt="いいね"
        className="like-button"
        onClick={!disabled ? () => handleLikeCreate() : undefined}
      />
      <p>いいね</p>
    </div>
  );
}
