import { SimpleDateTimeFormat } from '@/utils/consts.ts';
import classNames from 'classnames';
import moment from 'moment';
import styles from './index.module.less';

interface ProgressBarProps {
  value: number;
  options: {
    step: number;
    label: string;
    datetime?: string;
  }[];
}

export default function ProgressBar({ value, options }: ProgressBarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {options.map((item) => (
          <div
            key={item.step}
            className={classNames(
              styles.time_node,
              item.step <= value && styles.active,
              item.step === value && styles.last
            )}
          >
            <div className={styles.step}>{item.label}</div>
            {!!item.datetime && (
              <div className={styles.datetime}>
                {moment(item.datetime).format(SimpleDateTimeFormat)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
