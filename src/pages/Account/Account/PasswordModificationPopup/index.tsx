import Button from '@/components/Button';
import Form from '@/components/Form';
import Grid from '@/components/Grid';
import Input from '@/components/Input';
import popup from '@/components/Popup';
import patterns from '@/consts/patterns.ts';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import styles from './index.module.less';

function PasswordModificationPopup({
  onCancel,
  onOk
}: {
  onCancel(): void;
  onOk(): void;
}) {
  const passwordRef = useRef('');
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.title}>修改密码</div>
      <Form
        onOk={() => {
          setSubmitting(true);
          setTimeout(() => {
            setSubmitting(false);
            onOk();
          }, 1000);
        }}
      >
        <Form.Item
          name={'password'}
          rules={[
            { required: true, message: '请输入密码' },
            {
              pattern: patterns.password,
              message: '密码长度8-20位，包含数字、字母等'
            }
          ]}
        >
          <Input
            type={'password'}
            placeholder={'输入新密码'}
            onChange={(value) => {
              passwordRef.current = value;
            }}
          />
        </Form.Item>
        <Form.Item
          name={'password-repeat'}
          rules={[
            { required: true, message: '请输入密码' },
            {
              pattern: patterns.password,
              message: '密码长度8-20位，包含数字、字母等'
            },
            {
              validator(value) {
                if (value !== passwordRef.current) {
                  return Promise.reject('密码输入不一致');
                }
                return Promise.resolve();
              }
            }
          ]}
        >
          <Input type={'password'} placeholder={'输入新密码'} />
        </Form.Item>
        <Grid columns={2} gap={'2rem'}>
          <Button
            className={classNames(styles.btn, styles.plain)}
            onClick={onCancel}
          >
            取消
          </Button>
          <Button className={styles.btn} type={'submit'} loading={submitting}>
            确定
          </Button>
        </Grid>
      </Form>
    </div>
  );
}

export default function toModifyPassword(onOk: () => void) {
  const close = popup.open({
    footer: null,
    width: '45rem',
    content: (
      <PasswordModificationPopup
        onCancel={() => {
          close();
        }}
        onOk={() => {
          close();
          onOk();
        }}
      />
    )
  });
}
