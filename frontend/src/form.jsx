import couple from "./assets/image2.png";
import "./styles/form.css";
import { Link } from "react-router-dom";
import Airplane from "./components/airplane";
// import { useRouter } from "next/router";
// import { findUserByEmail, loginUser } from "../lib/authClient";

const Form = () => {
  // const router = useRouter();

  // const handleSubmit = async (formData, setError) => {
  //   try {
  //     const user = await findUserByEmail(formData.email);

  //     if (!user || user.password !== formData.password) {
  //       setError("password", {
  //         type: "manual",
  //         message: "メールアドレスかパスワードが間違っています。",
  //       });
  //       throw new Error();
  //     } else {
  //       await loginUser(formData);
  //       router.push("/");
  //     }
  //   } catch (error) {
  //     console.error("Login failed", error);
  //   }
  // };

  return (
    <>
      <div className="title">
        <h1>スキマッチ</h1>
      </div>
      <div className="couple_img">
        <img src={couple} className="couple" alt="Couple" />
      </div>
      <form action="">
        <div className="login_form">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="メールアドレス"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="パスワード"
            required
          />
        </div>
        <div className="form_button">
          <input
            type="submit"
            className="login"
            value="ログイン"
            // onSubmit={handleSubmit}
          />
          <Link to="/create" className="new_registration">
            新規の方はこちら
          </Link>
        </div>
      </form>
      <Airplane />
    </>
  );
};

export default Form;
