import "./styles/index.css";
// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";

// import ConfirmPassword from "./components/confirmPassword.jsx";
import Form from "./form";
// import Pay from "./components/pay.jsx";
// import PageFooter from "./components/footer";
// import Create from "./create.jsx";
// import UserDetails from "./userDetails.jsx";
// import UserList from "./userList.jsx";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="page">
        <div id="login_form">
          <Form />
          {/* <Create /> */}
          {/* <Pay /> */}
          {/* <ConfirmPassword /> */}
          {/* <UserDetails /> */}
          {/* <UserList /> */}
        </div>
        {/* <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div> */}
        <div className="ticks"></div>
        <section id="spacer"></section>
      </div>
    </>
  );
}

export default App;
