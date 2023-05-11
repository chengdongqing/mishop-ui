import Button from '@/components/Button';
import CloseIcon from '@/components/CloseIcon';
import Space from '@/components/Space';
import classNames from 'classnames';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot, Root } from 'react-dom/client';
import styles from './index.module.less';

export interface PopupProps extends PropsWithChildren {
  // 是否弹出
  open: boolean;
  // 标题
  title?: ReactNode;
  // 宽度
  width?: number | string;
  // 底部内容
  footer?: ReactNode;
  // 是否可关闭
  closable?: boolean;
  // 点击蒙层是否可关闭
  maskClosable?: boolean;
  // 确认按钮文本
  okText?: ReactNode;
  // 取消按钮文本
  cancelText?: ReactNode;
  // 点击确定时关闭
  closeOnOk?: boolean;

  // 点击确认回调
  onOk?: () => void;
  // 点击取消回调
  onCancel?: () => void;
}

function Popup({
  open,
  title,
  width,
  footer,
  closable = true,
  maskClosable = true,
  okText = '确定',
  cancelText = '取消',
  closeOnOk,
  children,
  onOk,
  onCancel
}: PopupProps) {
  const [closing, setClosing] = useState(false);

  function close() {
    setClosing(true);
    setTimeout(() => {
      onCancel?.();
      setClosing(false);
    }, 500);
  }

  return createPortal(
    open && (
      <div className={classNames(styles.popup, closing && styles.closing)}>
        <div style={{ width }} className={styles.container}>
          <div className={classNames(styles.header, !title && styles.headless)}>
            {!!title && <div className={styles.title}>{title}</div>}
            {closable && <CloseIcon onClick={close} />}
          </div>
          <div className={styles.body}>{children}</div>
          {footer !== undefined ? (
            footer
          ) : (
            <div className={styles.footer}>
              <Space size={'1.4rem'}>
                {!!okText && (
                  <Button
                    onClick={() => {
                      if (closeOnOk) {
                        close();
                      }
                      onOk?.();
                    }}
                  >
                    {okText}
                  </Button>
                )}
                {!!cancelText && (
                  <Button
                    gray
                    onClick={() => {
                      close();
                    }}
                  >
                    {cancelText}
                  </Button>
                )}
              </Space>
            </div>
          )}
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

let popup: Root | undefined;
function open(
  props: Omit<PopupProps, 'open' | 'children'> & { content?: ReactNode }
) {
  popup?.unmount();
  popup = createRoot(document.getElementById('popup') as HTMLElement);
  popup.render(
    <Popup
      open
      {...props}
      children={props.content}
      onCancel={() => {
        props.onCancel?.();
        popup?.unmount();
      }}
    />
  );
}

function alert(title: string) {
  open({
    width: '48rem',
    content: <div className={styles.message}>{title}</div>,
    maskClosable: false,
    cancelText: null,
    closeOnOk: true
  });
}

function confirm(title: string, props: Omit<PopupProps, 'open' | 'children'>) {
  open({
    width: '48rem',
    content: (
      <div className={classNames(styles.message, styles.confirm)}>{title}</div>
    ),
    maskClosable: false,
    closeOnOk: true,
    ...props
  });
}

Popup.open = open;
Popup.alert = alert;
Popup.confirm = confirm;

export default Popup;
