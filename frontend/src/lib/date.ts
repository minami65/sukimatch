/**
 * ISO形式の日時文字列（またはDateオブジェクト）を受け取り、
 * チャット一覧等に適した相対表記文字列に変換します。
 */
export function formatTalkTimestamp(dateString?: string | Date | null): string {
  if (!dateString) return '';

  const targetDate = new Date(dateString);
  const now = new Date();

  // 無効な日付の場合は空文字を返す
  if (isNaN(targetDate.getTime())) return '';

  // 日付の比較用に時刻を「00:00:00」に揃えたオブジェクトを作成
  const targetDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // 日数の差分（ミリ秒 -> 日）
  const diffDays = Math.floor((today.getTime() - targetDay.getTime()) / (1000 * 60 * 60 * 24));

  // 1. 当日（0日前）: 時刻を表示（例: "14:30"）
  if (diffDays === 0) {
    const hours = String(targetDate.getHours()).padStart(2, '0');
    const minutes = String(targetDate.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // 2. 1日前: 「昨日」
  if (diffDays === 1) {
    return '昨日';
  }

  // 3. 2〜6日前（1週間以内）: 曜日を表示（例: "月曜日" や "月"）
  if (diffDays > 1 && diffDays < 7) {
    const dayNames = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
    return dayNames[targetDate.getDay()];
  }

  // 4. 今年（1年以内）: 「MM/DD」（例: "08/26"）
  if (targetDate.getFullYear() === now.getFullYear()) {
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');
    return `${month}/${day}`;
  }

  // 5. 1年以上前（今年より前）: 「YYYY/MM/DD」（例: "2025/08/26"）
  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}
