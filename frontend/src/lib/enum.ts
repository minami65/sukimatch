import { Option } from '@/components/SelectBox';

/**
 * Enumオブジェクトを SelectBox 用の Option[] に変換する関数
 */
export const enumToOptions = (enumObj: Record<string, string>): Option[] => {
  return Object.entries(enumObj).map(([value, label]) => ({
    value,
    label,
  }));
};
