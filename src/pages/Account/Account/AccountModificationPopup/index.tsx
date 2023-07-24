import Button from '@/components/Button';
import Form from '@/components/Form';
import Input from '@/components/Input';
import popup from '@/components/Popup';
import VerificationCodeInput from '@/components/VerificationCodeInput';
import patterns from '@/consts/patterns.ts';
import useSetState from '@/hooks/useSetState.ts';
import { desensitizeAccount } from '@/utils';
import { useMemo, useState } from 'react';
import Steps from '../Steps';
import styles from './index.module.less';

type AccountTypes = 'phoneNumber' | 'email';

export function AccountModificationPopup({
  type,
  onOk
}: {
  type: AccountTypes;
  onOk(value: string): void;
}) {
  const label = useMemo(() => {
    return { phoneNumber: '手机号', email: '邮箱' }[type];
  }, [type]);

  const [currentStep, setCurrentStep] = useState(1);
  const [values, setValues] = useSetState({
    account: '',
    verificationCode: ''
  });
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.title}>绑定安全{label}</div>
      <Steps
        value={currentStep}
        options={[`输入新${label}`, `验证新${label}`]}
      />
      {currentStep === 1 ? (
        <Form
          onOk={() => {
            setCurrentStep(2);
          }}
        >
          <Form.Item
            name={type}
            rules={[
              {
                required: true,
                message: `请输入${label}`
              },
              {
                pattern:
                  type === 'phoneNumber'
                    ? patterns.phoneNumber
                    : patterns.email,
                message: `${label}输入错误`
              }
            ]}
          >
            <Input
              placeholder={label}
              onChange={(account) => {
                setValues({ account });
              }}
            />
          </Form.Item>
          <Button
            type={'submit'}
            disabled={!values.account}
            className={styles.btn}
          >
            下一步
          </Button>
        </Form>
      ) : (
        <Form
          onOk={() => {
            setSubmitting(true);
            setTimeout(() => {
              setSubmitting(false);
              onOk(desensitizeAccount(values.account));
            }, 1000);
          }}
        >
          <Form.Item
            name={type}
            rules={[
              { required: true, message: '请输入验证码' },
              {
                pattern: patterns.verificationCode,
                message: '验证码格式错误'
              }
            ]}
          >
            <VerificationCodeInput
              onSend={() => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(null);
                  }, 1000);
                });
              }}
              onChange={(verificationCode) => {
                setValues({ verificationCode });
              }}
            />
          </Form.Item>
          <Button
            type={'submit'}
            loading={submitting}
            disabled={!values.verificationCode}
            className={styles.btn}
          >
            确定
          </Button>
        </Form>
      )}
    </div>
  );
}

export default function toModifyAccount(
  type: AccountTypes,
  onOk: (value: string) => void
) {
  const close = popup.open({
    footer: null,
    width: '45rem',
    content: (
      <AccountModificationPopup
        type={type}
        onOk={(value) => {
          close();
          onOk(value);
        }}
      />
    )
  });
}
