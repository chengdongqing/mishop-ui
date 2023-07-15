import { formatAmount, formatValue } from '@/utils';
import styles from './index.module.less';

interface SatisfactionCardProps {
  numberOfSatisfied?: number;
  percentOfSatisfaction?: number;
}

export default function SatisfactionCard(props: SatisfactionCardProps) {
  const percent = props.percentOfSatisfaction || 0;

  return (
    <div className={styles.container}>
      <div className={styles.people_number}>
        <span>{formatAmount(props.numberOfSatisfied, '')}</span>人购买后满意
      </div>
      <div className={styles.percent_bar}>
        <span style={{ width: `${percent}%` }}>
          满意度：{formatValue(percent, '%')}
        </span>
      </div>
    </div>
  );
}
