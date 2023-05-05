import Iconfont from '@/components/Iconfont';
import styles from './index.module.less';

export default function CloseIcon({ onClose }: { onClose: () => void }) {
  return (
    <div
      className={styles.container}
      onClick={() => {
        onClose();
      }}
    >
      <Iconfont type={'i-close'} className={styles.icon} />
    </div>
  );
}
