import Space from '@/components/Space';
import { PropsWithStyle } from '@/utils/typings';
import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import classNames from 'classnames';
import { createRoot, Root } from 'react-dom/client';
import styles from './index.module.less';

const types = {
  warning: {
    icon: <ExclamationCircleFilled />,
    color: 'var(--color-primary)'
  },
  success: {
    icon: <CheckCircleFilled />,
    color: '#52c41a'
  },
  info: {
    icon: <InfoCircleFilled />,
    color: '#1677ff'
  },
  error: {
    icon: <CloseCircleFilled />,
    color: 'var(--color-error)'
  }
};

interface ToastProps extends PropsWithStyle {
  type: 'warning' | 'success' | 'info' | 'error';
  content: string;
}

function Toast({ type, content, style, className }: ToastProps) {
  return (
    <div style={style} className={classNames(styles.container, className)}>
      <Space>
        <span className={styles.icon} style={{ color: types[type].color }}>
          {types[type].icon}
        </span>
        {content}
      </Space>
    </div>
  );
}

interface OpenToastProps extends ToastProps {
  duration?: number;
  onClose?(): void;
}

let toast: Root | undefined, timer: NodeJS.Timer;
function open({ duration = 3000, onClose, ...rest }: OpenToastProps) {
  toast?.unmount();
  toast = createRoot(document.getElementById('toast') as HTMLElement);
  clearTimeout(timer);
  toast.render(<Toast {...rest} />);
  if (duration > 0) {
    timer = setTimeout(() => {
      toast?.unmount();
      onClose?.();
    }, duration);
  }
}

type ToastType = Omit<OpenToastProps, 'type' | 'content'>;

export default {
  warning(content: string, props?: ToastType) {
    open({
      type: 'warning',
      content,
      ...props
    });
  },
  success(content: string, props?: ToastType) {
    open({
      type: 'success',
      content,
      ...props
    });
  },
  info(content: string, props?: ToastType) {
    open({
      type: 'info',
      content,
      ...props
    });
  },
  error(content: string, props?: ToastType) {
    open({
      type: 'error',
      content,
      ...props
    });
  }
};
