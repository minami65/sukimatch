import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login.jsx";
import Form from "./form.jsx";
import Create from "./create.jsx";
import Pay from "./pay.jsx";
import Welcome from "./welcome.jsx";
import UserList from "./userList.jsx";
import UserDetails from "./userDetails.jsx";
import MatchComplete from "./match.jsx";

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
    </Routes>
  </BrowserRouter>,
);
