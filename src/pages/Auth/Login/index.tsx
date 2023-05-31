import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Form from '@/components/Form';
import { AlipayCircle, QQCircle, WechatCircle, WeiboCircle } from '@/components/Iconfont';
import Row from '@/components/Row';
import Space from '@/components/Space';
import toast from '@/components/Toast';
import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from '../index.module.less';

export default function Login() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Form
        onOk={(values) => {
          if (!(values.agreed as [])?.length) {
            toast.warning('请您同意用户条款');
          } else {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              toast.success('登录成功', {
                duration: 1000
              });
              setTimeout(() => {
                navigate('/');
              }, 1000);
            }, 3000);
          }
        }}
      >
        <Outlet />
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
            loading={loading}
            className={styles.btn_primary}
          >
            登录
          </Button>
        </Form.Item>
      </Form>

      <Row justify={'space-between'} className={styles.links_bar}>
        <Link to={'/auth/password-reset'}>忘记密码？</Link>
        {pathname.endsWith('password') ? (
          <Link to={'/auth/login/verification-code'}>手机号登录</Link>
        ) : (
          <Link to={'/auth/login/password'}>密码登录</Link>
        )}
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
