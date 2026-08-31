/**
 * 日付文字列/Dateオブジェクトを確実に日本時間（JST）の Date オブジェクトに補正する内部ヘルパー
 */
const parseToJSTDate = (dateVal?: string | Date | null): Date | null => {
  if (!dateVal) return null;
  if (dateVal instanceof Date) return dateVal;

  // APIからの文字列にタイムゾーン（Z または +09:00等）が含まれていない場合、UTC（Z）として補正する
  let formattedStr = dateVal;
  if (!formattedStr.includes('Z') && !formattedStr.includes('+')) {
    formattedStr = formattedStr.replace(' ', 'T') + 'Z';
  }

  const d = new Date(formattedStr);
  return isNaN(d.getTime()) ? null : d;
};

/**
 * ISO形式の日時文字列（またはDateオブジェクト）を受け取り、
 * チャット一覧等に適した相対表記文字列に変換します。
 */
export function formatTalkTimestamp(dateString?: string | Date | null): string {
  const targetDate = parseToJSTDate(dateString);
  if (!targetDate) return '';

  const now = new Date();

  // 日本時間（Asia/Tokyo）の年月日・時刻を抽出するフォーマッター
  const getJSTParts = (d: Date) => {
    const formatter = new Intl.DateTimeFormat('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      weekday: 'short',
      hour12: false,
    });
    const parts = formatter.formatToParts(d);
    const map: Record<string, string> = {};
    parts.forEach((p) => {
      if (p.type !== 'literal') map[p.type] = p.value;
    });
    return map;
  };

  const targetParts = getJSTParts(targetDate);
  const nowParts = getJSTParts(now);

  // 日本時間ベースで「00:00:00」の日付を作成して比較
  const targetDay = new Date(
    Number(targetParts.year),
    Number(targetParts.month) - 1,
    Number(targetParts.day),
  );
  const today = new Date(Number(nowParts.year), Number(nowParts.month) - 1, Number(nowParts.day));

  const diffDays = Math.floor((today.getTime() - targetDay.getTime()) / (1000 * 60 * 60 * 24));

  // 1. 当日（0日前）: 時刻を表示（例: "14:30"）
  if (diffDays === 0) {
    return `${targetParts.hour}:${targetParts.minute}`;
  }

  // 2. 1日前: 「昨日」
  if (diffDays === 1) {
    return '昨日';
  }

  // 3. 2〜6日前（1週間以内）: 曜日を表示（例: "月曜日"）
  if (diffDays > 1 && diffDays < 7) {
    const dayNames: Record<string, string> = {
      日: '日曜日',
      月: '月曜日',
      火: '火曜日',
      水: '水曜日',
      木: '木曜日',
      金: '金曜日',
      土: '土曜日',
    };
    return dayNames[targetParts.weekday] || `${targetParts.weekday}曜日`;
  }

  // 4. 今年（1年以内）: 「MM/DD」（例: "08/26"）
  if (targetParts.year === nowParts.year) {
    return `${targetParts.month}/${targetParts.day}`;
  }

  // 5. 1年以上前: 「YYYY/MM/DD」（例: "2025/08/26"）
  return `${targetParts.year}/${targetParts.month}/${targetParts.day}`;
}

// 日付のグループ分け用ラベルを返す関数
export const getMessageDateLabel = (dateString: string): string => {
  const messageDate = parseToJSTDate(dateString);
  if (!messageDate) return '';

  const now = new Date();

  // 日本時間での「YYYY/MM/DD」形式の文字列を取得して比較
  const toJSTDateString = (d: Date) =>
    new Intl.DateTimeFormat('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(d);

  const msgDateStr = toJSTDateString(messageDate);
  const todayStr = toJSTDateString(now);

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = toJSTDateString(yesterday);

  if (msgDateStr === todayStr) {
    return '今日';
  } else if (msgDateStr === yesterdayStr) {
    return '昨日';
  } else {
    // 日本時間での月・日を取得
    const formatter = new Intl.DateTimeFormat('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    const parts = formatter.formatToParts(messageDate);
    const map: Record<string, string> = {};
    parts.forEach((p) => {
      if (p.type !== 'literal') map[p.type] = p.value;
    });

    const nowYear = new Intl.DateTimeFormat('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
    }).format(now);

    if (map.year === nowYear) {
      return `${map.month}月${map.day}日`;
    } else {
      return `${map.year}年${map.month}月${map.day}日`;
    }
  }
};
