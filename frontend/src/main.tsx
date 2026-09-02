import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import FootPrint from '@/pages/footprint/index.jsx';
import Liked from '@/pages/liked/index.jsx';
import Login from '@/pages/login/index.tsx';
import MyPage from '@/pages/my-page/index.jsx';
import Profile from '@/pages/profile/index.tsx';
import Setting from '@/pages/setting/index.tsx';
import UserList from '@/pages/user-list/index.tsx';
import '@/styles/index.css';
import '@/styles/reset.css';

import { AuthLayout } from './layouts/AuthLayout.tsx';
import BottomNavLayout from './layouts/BottomNav/BottomNavLayout.tsx';
import MatchNotificationLayout from './layouts/MatchNotificationLayout.tsx';
import MatchComplete from './match.jsx';
import Create from './pages/create/index.tsx';
import Form from './pages/login/LoginForm/LoginForm.js';
import TalkList from './pages/talk-list/index.tsx';
import TalkRoom from './pages/talk-room/index.tsx';
import UserDetails from './pages/user-details/index.tsx';
import Pay from './pay.jsx';
import Welcome from './welcome.jsx';

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/form" element={<Form />} />
          <Route path="/create" element={<Create />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/welcome" element={<Welcome />} />

          <Route element={<AuthLayout />}>
            <Route element={<MatchNotificationLayout />}>
              <Route element={<BottomNavLayout />}>
                <Route path="/userList" element={<UserList />} />
                <Route path="/userDetail/:id" element={<UserDetails />} />
                <Route path="/match" element={<MatchComplete />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/footprint" element={<FootPrint />} />
                <Route path="/liked" element={<Liked />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/talkList" element={<TalkList />} />
              </Route>
              <Route path="/talks/:matchId" element={<TalkRoom />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>,
  );
}
