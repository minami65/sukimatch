import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import "./styles/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login.jsx";
import Form from "./form.jsx";
import Create from "./create.jsx";
import Pay from "./pay.jsx";
import Welcome from "./welcome.jsx";
import UserList from "./pages/user-list/userList.jsx";
import UserDetails from "./userDetails.jsx";
import MatchComplete from "./match.jsx";
import MyPage from "@/pages/my-page/index.jsx";
import Profile from "./pages/profile/profile.jsx";
import FootPrint from "./pages/footprint/footprint.jsx";
import Liked from "./pages/liked/liked.jsx";
import Setting from "./pages/setting/setting.jsx";
import Talk from "./talk.jsx";
import TalkList from "./talkList.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/form" element={<Form />} />
      <Route path="/create" element={<Create />} />
      <Route path="/pay" element={<Pay />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/userList" element={<UserList />} />
      <Route path="/userDetail/:id" element={<UserDetails />} />
      <Route path="/match" element={<MatchComplete />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/footprint" element={<FootPrint />} />
      <Route path="/liked" element={<Liked />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/talk" element={<Talk />} />
      <Route path="/talkList" element={<TalkList />} />
    </Routes>
  </BrowserRouter>,
);
