import Button from '@/components/Button';
import Form from '@/components/Form';
import Input from '@/components/Input';
import popup from '@/components/Popup';
import Select from '@/components/Select';
import VerificationCodeInput from '@/components/VerificationCodeInput';
import patterns from '@/utils/patterns.ts';
import { Key, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../index.module.less';

export default function Login() {
  const [activeType, setActiveType] = useState<Key>('phoneNumber');
  const [account, setAccount] = useState('');
  const passwordRef = useRef('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  return (
    <Form
      onOk={() => {
        setSubmitting(true);
        setTimeout(() => {
          setSubmitting(false);
          popup.alert('密码重置成功，即将重新登录', () => {
            navigate('/auth/login');
          });
        }, 1000);
      }}
    >
      <Form.Item name={'type'}>
        <Select
          options={[
            { key: 'phoneNumber', label: '手机号' },
            { key: 'email', label: '邮箱' }
          ]}
          defaultValue={'phoneNumber'}
          onChange={setActiveType}
        />
      </Form.Item>
      {activeType === 'phoneNumber' ? (
        <Form.Item
          key={'phoneNumber'}
          name={'phoneNumber'}
          rules={[
            { required: true, message: '请输入手机号' },
            {
              pattern: patterns.phoneNumber,
              message: '手机号格式错误'
            }
          ]}
        >
          <Input placeholder={'手机号'} onChange={setAccount} />
        </Form.Item>
      ) : (
        <Form.Item
          key={'email'}
          name={'email'}
          rules={[
            { required: true, message: '请输入邮箱' },
            {
              pattern: patterns.email,
              message: '邮箱格式错误'
            }
          ]}
        >
          <Input placeholder={'邮箱'} onChange={setAccount} />
        </Form.Item>
      )}
      <Form.Item
        name={'verification-code'}
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
              if (
                activeType === 'phoneNumber' &&
                !patterns.phoneNumber.test(account)
              ) {
                reject('请输入正确的手机号');
                return;
              }
              if (activeType === 'email' && !patterns.email.test(account)) {
                reject('请输入正确的邮箱');
                return;
              }
              setTimeout(() => {
                resolve();
              }, 3000);
            });
          }}
        />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[
          { required: true, message: '请输入密码' },
          {
            pattern: patterns.password,
            message: '密码格式错误'
          }
        ]}
      >
        <Input
          placeholder={'新密码'}
          type={'password'}
          onChange={(value) => {
            passwordRef.current = value;
          }}
        />
      </Form.Item>
      <Form.Item
        name={'password-repeat'}
        rules={[
          { required: true, message: '请确认密码' },
          {
            validator(value) {
              const val = value as string;
              if (val !== passwordRef.current) {
                return Promise.reject('两次输入的密码不一致');
              }
              return Promise.resolve();
            }
          }
        ]}
      >
        <Input placeholder={'确认新密码'} type={'password'} />
      </Form.Item>
      <Form.Item>
        <Button
          type={'submit'}
          loading={submitting}
          className={styles.btn_primary}
        >
          重置密码
        </Button>
      </Form.Item>
    </Form>
  );
}
