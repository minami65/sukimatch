import PageFooter from "./components/footer";
import "./styles/profile.css";

export default function Profile() {
  return (
    <div>
      <div className="profileImage">
        <img src="" alt="プロフィール画像" />
      </div>
      <div className="introductionText">
        <input type="text" />
      </div>
      <div className="profileDetail">
        <p>プロフィール</p>
        <div className="profileInput">
          <p>出身地</p>
          <select name="" id="">
            <option value="選択してください"></option>
          </select>
        </div>
        <div className="profileInput">
          <p>居住地</p>
          <select name="" id="">
            <option value="選択してください"></option>
          </select>
        </div>
        <div className="profileInput">
          <p>学歴</p>
          <select name="" id="">
            <option value="選択してください"></option>
          </select>
        </div>
        <div className="profileInput">
          <p>職種</p>
          <select name="" id="">
            <option value="選択してください"></option>
          </select>
        </div>
        <div className="profileInput">
          <p>年収</p>
          <select name="" id="">
            <option value="選択してください"></option>
          </select>
        </div>
        <div className="profileInput">
          <p>身長</p>
          <select name="" id="">
            <option value="選択してください"></option>
          </select>
        </div>
        <div className="profileInput">
          <p>結婚に対する意思</p>
          <select name="" id="">
            <option value="選択してください"></option>
          </select>
        </div>
        <div className="profileInput">
          <p>休日</p>
          <select name="" id="">
            <option value="選択してください"></option>
          </select>
        </div>
        <div className="profileInput">
          <p>お酒</p>
          <select name="" id="">
            <option value="選択してください"></option>
          </select>
        </div>
        <div className="profileInput">
          <p>タバコ</p>
          <select name="" id="">
            <option value="選択してください"></option>
          </select>
        </div>
        <div className="profileInput">
          <p>同居人</p>
          <select name="" id="">
            <option value="選択してください"></option>
          </select>
        </div>
        <div className="profileInput">
          <p>出会うまでの希望</p>
          <select name="" id="">
            <option value="選択してください"></option>
          </select>
        </div>
      </div>
      <button>登録</button>
      <PageFooter />
    </div>
  );
}
