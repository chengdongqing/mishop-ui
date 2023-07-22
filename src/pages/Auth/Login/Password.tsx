import Form from '@/components/Form';
import Input from '@/components/Input';
import patterns from '@/utils/patterns.ts';

export default function LoginByPassword() {
  return (
    <>
      <Form.Item
        name={'account'}
        rules={[
          { required: true, message: '请输入账号' },
          {
            validator(value) {
              const val = value as string;
              if (
                !patterns.phoneNumber.test(val) &&
                !patterns.email.test(val)
              ) {
                return Promise.reject('账号格式错误');
              }
              return Promise.resolve();
            }
          }
        ]}
      >
        <Input placeholder={'手机号/邮箱'} />
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
        <Input placeholder={'密码'} type={'password'} />
      </Form.Item>
    </>
  );
}
