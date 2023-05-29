import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Form, { FormHandle } from '@/components/Form';
import AlipayCircle from '@/components/Iconfont/AlipayCircle.tsx';
import QQCircle from '@/components/Iconfont/QQCircle.tsx';
import WechatCircle from '@/components/Iconfont/WechatCircle.tsx';
import WeiboCircle from '@/components/Iconfont/WeiboCircle.tsx';
import Input from '@/components/Input';
import Row from '@/components/Row';
import Space from '@/components/Space';
import classNames from 'classnames';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
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
        <Form.Item name={'agreed'}>
          <Checkbox>
            <Space className={styles.accept_terms} size={'0.4rem'}>
              已阅读并同意小米帐号
              <a
                href={
                  'https://account.xiaomi.com/about/protocol/agreement?_locale=zh_CN'
                }
                target={'_blank'}
              >
                用户协议
              </a>
              和
              <a
                href={
                  'https://account.xiaomi.com/about/protocol/privacy?_locale=zh_CN'
                }
                target={'_blank'}
              >
                隐私政策
              </a>
            </Space>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button className={classNames(styles.btn_primary, styles.disabled)}>
            登录
          </Button>
        </Form.Item>
      </Form>

      <Row justify={'space-between'} className={styles.links_bar}>
        <Link to={'/password-reset'}>忘记密码？</Link>
        <a>手机号登录</a>
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
