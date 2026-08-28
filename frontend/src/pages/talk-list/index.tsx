import { LoadingSpinner } from '@/components/Loading/LoadingSpinner';
import { PageHeader } from '@/components/PageHeader';

import { useTalkList } from '@/hooks/useMessages';

import { formatTalkTimestamp } from '@/lib/date';

import TalkListItem from './TalkListItem/TalkListItem';

export default function TalkList() {
  const { talks, isLoading, isError } = useTalkList();

  return (
    <>
      <PageHeader title="TALK" />
      {/* TODO：検索バー */}
      <main>
        {isLoading && <LoadingSpinner />}

        {isError && (
          <p style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
            データの取得に失敗しました。
          </p>
        )}

        {!isLoading && !isError && talks.length === 0 && (
          <p style={{ textAlign: 'center', padding: '20px' }}>まだトーク履歴がありません。</p>
        )}

        {!isLoading &&
          !isError &&
          talks.map((talkItem) => (
            <TalkListItem
              key={talkItem.matchId}
              matchId={talkItem.matchId}
              imageUrl={talkItem.partnerIconUrl}
              userName={talkItem.partnerName}
              latestMessage={talkItem.latestMessage}
              latestMessageAt={formatTalkTimestamp(talkItem.latestMessageAt)}
              unreadCount={talkItem.unreadCount}
            />
          ))}
      </main>
    </>
  );
}
