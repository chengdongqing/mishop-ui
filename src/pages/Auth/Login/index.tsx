import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Form, { FormHandle } from '@/components/Form';
import { AlipayCircle, QQCircle, WechatCircle, WeiboCircle } from '@/components/Iconfont';
import Input from '@/components/Input';
import Row from '@/components/Row';
import Space from '@/components/Space';
import toast from '@/components/Toast';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.less';

export default function Login() {
  const formRef = useRef<FormHandle>(null);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Form
        ref={formRef}
        onOk={(values) => {
          if (!(values.agreed as [])?.length) {
            toast.warning('请您同意用户条款');
          } else {
            toast.success('登录成功', {
              duration: 1000
            });
            setTimeout(() => {
              navigate('/');
            }, 1000);
          }
        }}
      >
        <Form.Item
          name={'account'}
          rules={[
            { required: true, message: '请输入账号' },
            {
              pattern:
                /^(1[3-9]\d{9}$)|[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
              message: '请输入正确的手机号或邮箱'
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
              pattern: /^\w{8,20}$/,
              message: '密码为8-20位的英文或数字'
            }
          ]}
        >
          <Input placeholder={'密码'} type={'password'} />
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
            className={styles.btn_primary}
            onClick={() => {
              formRef.current?.submit();
            }}
          >
            登录
          </Button>
        </Form.Item>
      </Form>

      <Row justify={'space-between'} className={styles.links_bar}>
        <Link to={'/password-reset'}>忘记密码？</Link>
        <a
          onClick={() => {
            formRef.current?.resetFields();
          }}
        >
          重置表单
        </a>
      </Row>

      <div className={styles.third_party_logins}>
        <div className={styles.title}>其它方式登录</div>
        <Space className={styles.icons} size={'2.4rem'}>
          <AlipayCircle />
          <WechatCircle />
          <QQCircle />
          <WeiboCircle />
        </Space>
      </div>
    </div>
  );
}
