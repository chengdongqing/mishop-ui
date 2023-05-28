import Form, { FormHandle } from '@/components/Form';
import Input from '@/components/Input';
import { useRef } from 'react';
import styles from './index.module.less';

export default function Login() {
  const form = useRef<FormHandle>(null);

  return (
    <div className={styles.container}>
      <Form ref={form}>
        <Form.Item
          name={'account'}
          rules={[{ message: '请输入账号', required: true }]}
        >
          <Input placeholder={'邮箱/手机号码/小米ID'} />
        </Form.Item>
        <Form.Item
          name={'password'}
          rules={[{ message: '请输入密码', required: true }]}
        >
          <Input placeholder={'密码'} type={'password'} />
        </Form.Item>
      </Form>
    </div>
  );
}
