import { formatAmount, formatValue } from '@/utils';
import styles from './index.module.css';

interface SatisfactionCardProps {
  satisfiedCount?: number;
  satisfactionPercent?: number;
}

export default function SatisfactionCard(props: SatisfactionCardProps) {
  const percent = props.satisfactionPercent || 0;

  return (
    <div className={styles.container}>
      <div className={styles.people_number}>
        <span>{formatAmount(props.satisfiedCount, '')}</span>人购买后满意
      </div>
      <div className={styles.percent_bar}>
        <span style={{ width: `${percent}%` }}>
          满意度：{formatValue(percent, '%')}
        </span>
      </div>
    </div>
  );
}
