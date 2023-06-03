import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Form from '@/components/Form';
import Input from '@/components/Input';
import popup from '@/components/Popup';
import Space from '@/components/Space';
import toast from '@/components/Toast';
import VerificationCodeInput from '@/components/VerificationCodeInput';
import useLatest from '@/hooks/useLatest.ts';
import useSetState from '@/hooks/useSetState.ts';
import userSlice from '@/store/slices/userSlice.ts';
import patterns from '@/utils/patterns.ts';
import { useState } from 'react';
import { useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../index.module.less';

export default function Register() {
  const [values, setValues] = useSetState();
  const valuesRef = useLatest(values);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const store = useStore();

  return (
    <Form
      onChange={setValues}
      onOk={() => {
        if (!(values.agreed as [])?.length) {
          toast.warning('请您同意用户条款');
        } else {
          setSubmitting(true);
          setTimeout(() => {
            setSubmitting(false);
            store.dispatch(
              userSlice.actions.setUser({
                id: 450762342,
                name: '海盐芝士不加糖',
                phoneNumber: '189*****874'
              })
            );
            popup.alert('恭喜您，注册成功！', () => {
              navigate('/');
            });
          }, 1000);
        }
      }}
    >
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
        <Input placeholder={'手机号'} />
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
              if (
                !values.phoneNumber ||
                !patterns.phoneNumber.test(values.phoneNumber as string)
              ) {
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
      <Form.Item
        name={'password'}
        rules={[
          { required: true, message: '请输入密码' },
          {
            pattern: patterns.password,
            message: '密码为8-20位的英文或数字'
          }
        ]}
      >
        <Input placeholder={'密码'} type={'password'} />
      </Form.Item>
      <Form.Item
        name={'password-repeat'}
        rules={[
          { required: true, message: '请确认密码' },
          {
            validator(value) {
              const val = value as string;
              if (val !== valuesRef.current.password) {
                return Promise.reject('两次输入的密码不一致');
              }
              return Promise.resolve();
            }
          }
        ]}
      >
        <Input placeholder={'确认密码'} type={'password'} />
      </Form.Item>
      <Form.Item name={'agreed'}>
        <Checkbox.Group>
          <Checkbox value={true}>
            <Space className={styles.accept_terms} size={'0.4rem'}>
              已阅读并同意小米帐号
              <a
                href={
                  'https://account.xiaomi.com/about/protocol/agreement?_locale=zh_CN'
                }
                target={'_blank'}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                用户协议
              </a>
              和
              <a
                href={
                  'https://account.xiaomi.com/about/protocol/privacy?_locale=zh_CN'
                }
                target={'_blank'}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                隐私政策
              </a>
            </Space>
          </Checkbox>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item>
        <Button
          type={'submit'}
          loading={submitting}
          className={styles.btn_primary}
        >
          注册
        </Button>
      </Form.Item>
    </Form>
  );
}
