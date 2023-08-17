import useFormItem from '@/hooks/useFormItem.ts';
import { PropsWithStyle } from '@/utils/typings';
import { EditOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './index.module.css';

interface TextareaProps extends PropsWithStyle {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  showCount?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  maxLength?: number;
  withPrefix?: boolean;
  gray?: boolean;

  onChange?(value: string): void;
}

export default function Textarea({
  value: propValue,
  defaultValue,
  placeholder,
  showCount = true,
  disabled: propDisabled,
  readonly,
  maxLength = 500,
  withPrefix = false,
  gray = false,
  style,
  className,
  onChange
}: TextareaProps) {
  const [value, setValue, ctx] = useFormItem(propValue, defaultValue, onChange);
  const disabled = propDisabled || ctx.disabled;

  return (
    <div>
      {withPrefix && <EditOutlined className={styles.prefix_icon} />}
      <textarea
        value={value}
        disabled={disabled}
        readOnly={readonly}
        autoComplete={'off'}
        placeholder={placeholder}
        maxLength={maxLength}
        className={classNames(
          styles.textarea,
          withPrefix && styles.indent,
          gray && styles.gray,
          className
        )}
        style={style}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      {showCount && (
        <div className={styles.limits}>
          {[value?.length || 0, maxLength].join('/')}
        </div>
      )}
    </div>
  );
}
