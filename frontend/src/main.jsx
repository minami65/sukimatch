import React from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import FootPrint from '@/pages/footprint/index.jsx';
import Liked from '@/pages/liked/index.jsx';
import MyPage from '@/pages/my-page/index.jsx';
import Profile from '@/pages/profile/index.jsx';
import Setting from '@/pages/setting/index.tsx';
import UserList from '@/pages/user-list/index.jsx';

import Create from './create.jsx';
import Form from './form.jsx';
import BottomNavLayout from './layouts/BottomNav/BottomNavLayout.js';
import Login from './login.jsx';
import MatchComplete from './match.jsx';
import Pay from './pay.jsx';
import Talk from './talk.jsx';
import TalkList from './talkList.jsx';
import UserDetails from './userDetails.jsx';
import Welcome from './welcome.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/form" element={<Form />} />
      <Route path="/create" element={<Create />} />
      <Route path="/pay" element={<Pay />} />
      <Route path="/welcome" element={<Welcome />} />

      <Route element={<BottomNavLayout />}>
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
      </Route>
    </Routes>
  </BrowserRouter>,
);
