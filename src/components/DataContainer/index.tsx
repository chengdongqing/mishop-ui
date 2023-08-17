import Loading from '@/components/Loading';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import styles from './index.module.css';

interface DataContainerProps extends PropsWithChildren {
  loading?: boolean;
  empty?: boolean | string;
  whiteOnEmpty?: boolean;
}

export default function DataContainer({
  children,
  loading,
  empty,
  whiteOnEmpty
}: DataContainerProps) {
  if (!loading && empty) {
    return (
      <div className={classNames(styles.empty, whiteOnEmpty && styles.white)}>
        {empty}
      </div>
    );
  }
  return <>{loading ? <Loading style={{ height: '50vh' }} /> : children}</>;
}
