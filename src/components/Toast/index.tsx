import Space from '@/components/Space';
import { PropsWithStyle } from '@/utils/typings';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  LoadingOutlined
} from '@ant-design/icons';
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
  },
  loading: {
    icon: <LoadingOutlined />,
    color: 'var(--color-primary)'
  }
};

interface ToastProps extends PropsWithStyle {
  type: 'warning' | 'success' | 'info' | 'error' | 'loading';
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
  return () => {
    toast?.unmount();
  };
}

type ToastType = Omit<OpenToastProps, 'type' | 'content'>;

export default {
  warning(content: string, props?: ToastType) {
    return open({
      type: 'warning',
      content,
      ...props
    });
  },
  success(content: string, props?: ToastType) {
    return open({
      type: 'success',
      content,
      ...props
    });
  },
  info(content: string, props?: ToastType) {
    return open({
      type: 'info',
      content,
      ...props
    });
  },
  error(content: string, props?: ToastType) {
    return open({
      type: 'error',
      content,
      ...props
    });
  },
  loading(content = '加载中...', props?: ToastType) {
    return open({
      type: 'loading',
      content,
      duration: props?.duration || 0,
      ...props
    });
  }
};
