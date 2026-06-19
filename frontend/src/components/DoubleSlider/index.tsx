import { Root, Track, Range, Thumb } from '@radix-ui/react-slider';
import styles from './DoubleSlider.module.css';

interface DoubleSliderProps {
  value: [number, number] | number[];
  onValueChange: (value: number[]) => void;
  min: number;
  max: number;
  step?: number;
}

const DoubleSlider = ({ value, onValueChange, min, max, step = 1 }: DoubleSliderProps) => {
  return (
    <Root
      className={styles.slider}
      value={value}
      onValueChange={onValueChange}
      min={min}
      max={max}
      step={step}
    >
      <Track className={styles.track}>
        <Range className={styles.range} />
      </Track>
      <Thumb className={styles.thumb} aria-label="最小値" />
      <Thumb className={styles.thumb} aria-label="最大値" />
    </Root>
  );
};

export default DoubleSlider;
