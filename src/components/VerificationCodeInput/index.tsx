import Input from '@/components/Input';
import toast from '@/components/Toast';
import useUnmount from '@/hooks/useUnmount.ts';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import styles from './index.module.less';

interface InputProps {
  interval?: number;
  onSend(): Promise<string | void>;
}

export default function VerificationCodeInput({
  interval = 120,
  onSend
}: InputProps) {
  const [seconds, setSeconds] = useState(0);
  const sending = useRef(false);
  const timer = useRef<NodeJS.Timer>();

  function send() {
    if (!seconds && !sending.current) {
      sending.current = true;
      const closeLoading = toast.loading('发送中...');
      onSend()
        .finally(() => {
          closeLoading();
          sending.current = false;
        })
        .then(() => {
          setSeconds(interval);
          timer.current = setInterval(() => {
            setSeconds((v) => {
              if (v > 0) return v - 1;
              clearInterval(timer.current);
              return v;
            });
          }, 1000);
          toast.success('发送成功，请注意查收');
        })
        .catch(toast.warning);
    }
  }
  useUnmount(() => {
    clearInterval(timer.current);
  });

  return (
    <Input
      type={'number'}
      placeholder={'验证码'}
      suffix={
        <div
          className={classNames(
            styles.btn_send,
            seconds > 0 && styles.disabled
          )}
          onClick={send}
        >
          {!timer.current ? '获取验证码' : '重新发送'}
          {seconds ? ` ${seconds}s` : ''}
        </div>
      }
    />
  );
}
