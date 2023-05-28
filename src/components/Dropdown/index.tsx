import Space from '@/components/Space';
import useUpdateEffect from '@/hooks/useUpdateEffect.ts';
import { CaretDownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { CSSProperties, Key, PropsWithChildren, ReactNode, useRef, useState } from 'react';
import styles from './index.module.less';

interface DropdownProps extends PropsWithChildren {
  menus: {
    key: Key;
    label: ReactNode;
    disabled?: boolean;
  }[];
  arrow?: boolean;
  style?: CSSProperties;
  className?: string;
  overlayStyle?: CSSProperties;
  overlayClassName?: string;

  onChange?: (key: Key) => void;
  onOpenChange?: (open: boolean) => void;
}

export default function Dropdown({
  children,
  menus,
  arrow = true,
  style,
  className,
  overlayStyle,
  overlayClassName,
  onChange,
  onOpenChange
}: DropdownProps) {
  const [willOpen, setWillOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const timer = useRef<NodeJS.Timer>();

  useUpdateEffect(() => {
    onOpenChange?.(open);
  }, [open]);

  return (
    <div
      style={style}
      className={classNames(styles.container, className)}
      onMouseEnter={() => {
        setWillOpen(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          setOpen(true);
        }, 100);
      }}
      onMouseLeave={() => {
        setOpen(false);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          setWillOpen(false);
        }, 200);
      }}
    >
      <Space className={styles.content}>
        {children}
        {arrow && (
          <CaretDownOutlined
            className={classNames(styles.arrow, open && styles.active)}
          />
        )}
      </Space>

      <div
        hidden={!willOpen}
        style={overlayStyle}
        className={classNames(
          styles.overlay,
          overlayClassName,
          open && styles.active
        )}
      >
        {menus.map((item) => (
          <div
            key={item.key}
            className={classNames(
              styles.item,
              item.disabled && styles.disabled
            )}
            onClick={() => {
              if (!item.disabled) {
                onChange?.(item.key);
                setWillOpen(false);
                setOpen(false);
              }
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
