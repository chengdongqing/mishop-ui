import Iconfont from '@/components/Iconfont';
import classNames from 'classnames';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './index.module.less';

interface PopupProps extends PropsWithChildren {
  // 是否弹出
  open: boolean;
  // 标题
  title?: string;
  // 宽度
  width?: number | string;
  // 底部内容
  footer?: ReactNode;
  // 是否可关闭
  closable?: boolean;
  // 点击蒙层是否可关闭
  maskClosable?: boolean;

  // 关闭事件
  onClose?: () => void;
}

export default function Popup({
  open,
  title,
  width,
  footer,
  closable = true,
  maskClosable = true,
  children,
  onClose
}: PopupProps) {
  const [closing, setClosing] = useState(false);

  function close() {
    setClosing(true);
    setTimeout(() => {
      onClose?.();
      setClosing(false);
    }, 500);
  }

  return createPortal(
    open && (
      <div className={classNames(styles.popup, closing && styles.closing)}>
        <div style={{ width }} className={styles.container}>
          <div className={classNames(styles.header, !title && styles.headless)}>
            {!!title && <div className={styles.title}>{title}</div>}
            {closable && (
              <div className={styles.btn_close} onClick={close}>
                <Iconfont type={'i-close'} className={styles.icon} />
              </div>
            )}
          </div>
          <div className={styles.body}>{children}</div>
          {!!footer && <div className={styles.footer}>{footer}</div>}
        </div>

        <div
          className={styles.mask}
          onClick={() => {
            if (maskClosable) {
              close();
            }
          }}
        />
      </div>
    ),
    document.getElementById('popup') as HTMLElement
  );
}
