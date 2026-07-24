import { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';

import MatchNotificationModal, {
  MatchedUser,
} from '@/components/shared/modals/MatchNotificationModal';

import { useMarkMatchesAsRead, useUnreadMatches } from '@/hooks/useMatchNotification';

const MatchNotificationLayout = () => {
  const { unreadMatches } = useUnreadMatches();
  const { markAsRead } = useMarkMatchesAsRead();
  const [showModal, setShowModal] = useState(false);

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
