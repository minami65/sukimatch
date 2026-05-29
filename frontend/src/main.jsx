import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login.jsx";
import Form from "./form.jsx";
import Create from "./create.jsx";
import Pay from "./pay.jsx";
import UserList from "./userList.jsx";
import UserDetails from "./userDetails.jsx";
import MatchComplete from "./match.jsx";
import Mypage from "./mypage.jsx";
import Profile from "./profile.jsx";
import FootPrint from "./footPrint.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/form" element={<Form />} />
      <Route path="/create" element={<Create />} />
      <Route path="/pay" element={<Pay />} />
      <Route path="/userList" element={<UserList />} />
      <Route path="/userDetail/:id" element={<UserDetails />} />
      <Route path="/match" element={<MatchComplete />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/footprint" element={<FootPrint />} />
    </Routes>
  </BrowserRouter>,
);
