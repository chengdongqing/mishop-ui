import useUpdateEffect from '@/hooks/useUpdateEffect.ts';
import { PropsWithStyle } from '@/utils/typings';
import { CaretDownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { CSSProperties, Key, PropsWithChildren, ReactNode, useRef, useState } from 'react';
import styles from './index.module.less';

export interface OptionProps {
  key: Key;
  label: ReactNode;
  disabled?: boolean;
}

interface DropdownProps extends PropsWithChildren<PropsWithStyle> {
  menus: OptionProps[];
  active?: Key;
  arrow?: boolean;
  trigger?: 'hover' | 'click';
  overlayStyle?: CSSProperties;
  overlayClassName?: string;

  onChange?: (key: Key) => void;
  onOpenChange?: (open: boolean) => void;
}

export default function Dropdown({
  children,
  menus,
  active,
  arrow = true,
  trigger = 'hover',
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

  function openOverlay() {
    if (open) {
      closeOverlay();
      return;
    }
    setWillOpen(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setOpen(true);
    }, 100);

    if (trigger === 'click') {
      setTimeout(() => {
        window.addEventListener('click', closeOverlay);
      });
    }
  }
  function closeOverlay() {
    setOpen(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setWillOpen(false);
    }, 200);

    if (trigger === 'click') {
      window.removeEventListener('click', closeOverlay);
    }
  }

  return (
    <div
      style={style}
      className={classNames(styles.container, className)}
      onMouseEnter={() => {
        if (trigger === 'hover') {
          openOverlay();
        }
      }}
      onMouseLeave={() => {
        if (trigger === 'hover') {
          closeOverlay();
        }
      }}
      onClick={() => {
        if (trigger === 'click') {
          openOverlay();
        }
      }}
    >
      <div className={styles.content}>
        {children}
        {arrow && (
          <CaretDownOutlined
            className={classNames(styles.arrow, open && styles.active)}
          />
        )}
      </div>

      <div
        hidden={!willOpen}
        style={overlayStyle}
        className={classNames(
          styles.overlay,
          overlayClassName,
          open && [styles.open, 'open']
        )}
      >
        {menus.map((item) => (
          <div
            key={item.key}
            className={classNames(
              'item',
              styles.item,
              item.disabled && styles.disabled,
              item.key === active && [styles.active, 'active']
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
