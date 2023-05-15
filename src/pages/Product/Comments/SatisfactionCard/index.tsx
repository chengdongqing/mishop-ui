import { displayAmount } from '@/utils';
import styles from './index.module.less';

export default function SatisfactionCard() {
  return (
    <div className={styles.container}>
      <div className={styles.people_number}>
        <span>{displayAmount(851475, '')}</span>人购买后满意
      </div>
      <div className={styles.percent_bar}>
        <span style={{ width: '69%' }}>满意度：69%</span>
      </div>
    </div>
  );
}
