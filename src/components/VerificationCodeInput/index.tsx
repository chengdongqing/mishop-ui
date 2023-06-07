import Input, { InputProps } from '@/components/Input';
import toast from '@/components/Toast';
import useCountdown from '@/hooks/useCountdown.ts';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import styles from './index.module.less';

interface VerificationCodeInputProps extends InputProps {
  interval?: number;
  onSend(): Promise<string | void>;
}

export default function VerificationCodeInput({
  interval = 120,
  onSend,
  ...rest
}: VerificationCodeInputProps) {
  const sending = useRef(false);
  const hasSent = useRef(false);
  const [waiting, setWaiting] = useState(false);
  const [seconds, { start }] = useCountdown(interval, true, () => {
    setWaiting(false);
  });

  function send() {
    if (!waiting && !sending.current) {
      sending.current = true;
      const closeLoading = toast.loading('发送中...');
      onSend()
        .finally(() => {
          closeLoading();
          sending.current = false;
        })
        .then(() => {
          start();
          setWaiting(true);
          hasSent.current = true;
          toast.success('发送成功，请注意查收');
        })
        .catch(toast.warning);
    }
  }

  return (
    <Input
      type={'number'}
      placeholder={'验证码'}
      suffix={
        <div
          className={classNames(
            styles.btn_send,
            waiting && !!seconds && styles.disabled
          )}
          onClick={send}
        >
          {!hasSent.current ? '获取验证码' : '重新发送'}
          {waiting && seconds ? ` ${seconds}s` : ''}
        </div>
      }
      {...rest}
    />
  );
}
