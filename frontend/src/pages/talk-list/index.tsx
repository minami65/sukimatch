import { Link } from 'react-router-dom';

import { LoadingSpinner } from '@/components/Loading/LoadingSpinner';
import { PageHeader } from '@/components/PageHeader';

import { useTalkList } from '@/hooks/useMessages';

import { formatTalkTimestamp } from '@/lib/date';

import styles from './TalkList.module.css';
import TalkListItem from './TalkListItem/TalkListItem';

export default function TalkList() {
  const { talks, isLoading, isError } = useTalkList();

  const unstartedTalks = talks.filter((talk) => !talk.latestMessage);
  const startedTalks = talks.filter((talk) => talk.latestMessage);

  return (
    <>
      <PageHeader title="TALK" />
      {/* TODO：検索バー */}
      <main className={styles.container}>
        {isLoading && <LoadingSpinner />}
        {isError && <p className={styles.errorMessage}>データの取得に失敗しました。</p>}
        {!isLoading && !isError && (
          <>
            {/* 1. メッセージ未開始のトーク（横スクロール表示） */}
            {unstartedTalks.length > 0 && (
              <section className={styles.unstartedSection}>
                <h2 className={styles.sectionTitle}>メッセージを始めてみませんか？</h2>
                {/* 横スクロールコンテナ */}
                <div className={styles.unstartedList}>
                  {unstartedTalks.map((talk) => (
                    <Link
                      key={talk.matchId}
                      to={`/talks/${talk.matchId}`}
                      className={styles.unstartedItem}
                    >
                      <div className={styles.avatarWrapper}>
                        <img
                          src={talk.partnerIconUrl || '/default-avatar.png'}
                          alt={talk.partnerName}
                          className={styles.avatar}
                        />
                      </div>
                      <span className={styles.partnerName}>{talk.partnerName}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* 2. トーク履歴が全くない場合 */}
            {talks.length === 0 && (
              <p className={styles.statusMessage}>まだトーク履歴がありません。</p>
            )}

            {/* 3. メッセージ開始済みのトーク */}
            <section>
              {startedTalks.map((talkItem) => (
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
            </section>
          </>
        )}{' '}
      </main>
    </>
  );
}
