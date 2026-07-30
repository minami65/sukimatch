import { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';

import MatchNotificationModal, {
  MatchedUser,
} from '@/components/shared/modals/MatchNotificationModal';

import { useMarkMatchesAsRead, useUnreadMatches } from '@/hooks/useMatchNotification';

const MatchNotificationLayout = () => {
  const { unreadMatches, refetch } = useUnreadMatches();
  const { markAsRead } = useMarkMatchesAsRead();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleMatchEvent = () => {
      console.log('📢 MATCHイベントを検知！refetch()を直接実行します！');
      refetch();
    };

    window.addEventListener('ws-match-event', handleMatchEvent);
    return () => {
      window.removeEventListener('ws-match-event', handleMatchEvent);
    };
  }, [refetch]);

  useEffect(() => {
    if (unreadMatches && unreadMatches.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [unreadMatches]);

  const handleClose = () => {
    if (!unreadMatches) return;

    const ids = unreadMatches.map((m: any) => m.match_id);
    console.log('ids: ', ids);
    markAsRead(ids);
    setShowModal(false);
  };

  const formattedMatches: MatchedUser[] = (unreadMatches || []).map((match: any) => ({
    id: match.user.user_id,
    name: match.user.name,
    imageUrl: match.user.image_url || '',
  }));

  return (
    <>
      <Outlet />

      {showModal && (
        <MatchNotificationModal
          isOpen={showModal}
          onClose={handleClose}
          matchedUsers={formattedMatches}
        />
      )}
    </>
  );
};

export default MatchNotificationLayout;
