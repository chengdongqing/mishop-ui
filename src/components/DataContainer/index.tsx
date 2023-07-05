import Loading from '@/components/Loading';
import { PropsWithChildren } from 'react';
import styles from './index.module.less';

interface DataContainerProps extends PropsWithChildren {
  loading?: boolean;
  empty?: boolean | string;
}

export default function DataContainer({ children, loading, empty }: DataContainerProps) {
  if (!loading && empty) {
    return <div className={styles.empty}>{empty}</div>;
  }
  return <div>{loading ? <Loading style={{ height: '50vh' }} /> : children}</div>;
}