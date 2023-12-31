import Form from '@/components/Form';
import Input from '@/components/Input';
import VerificationCodeInput from '@/components/VerificationCodeInput';
import patterns from '@/utils/patterns.ts';
import { useState } from 'react';
import styles from '../index.module.less';

export default function LoginByVerificationCode() {
  const [phoneNumber, setPhoneNumber] = useState<string>();

  return (
    <>
      <Form.Item
        name={'phoneNumber'}
        rules={[
          { required: true, message: '请输入手机号' },
          {
            pattern: patterns.phoneNumber,
            message: '手机号格式错误'
          }
        ]}
      >
        <Input placeholder={'手机号'} onChange={setPhoneNumber} />
      </Form.Item>
      <Form.Item
        name={'verificationCode'}
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
            return new Promise((resolve, reject) => {
              if (!phoneNumber || !patterns.phoneNumber.test(phoneNumber)) {
                reject('手机号格式错误');
                return;
              }
              setTimeout(() => {
                resolve();
              }, 1000);
            });
          }}
        />
      </Form.Item>
      <Form.Item>
        <div className={styles.login_tips}>
          未注册的手机号验证后将自动创建小米帐号
        </div>
      </Form.Item>
    </>
  );
}
