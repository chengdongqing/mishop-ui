import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Form from '@/components/Form';
import { AlipayCircle, QQCircle, WechatCircle, WeiboCircle } from '@/components/Iconfont';
import Row from '@/components/Row';
import Space from '@/components/Space';
import toast from '@/components/Toast';
import useRequest from '@/hooks/useRequest.ts';
import {
  LoginDTOWithPassword,
  LoginDTOWithVerificationCode,
  loginWithPassword,
  loginWithVerificationCode
} from '@/services/auth.ts';
import userSlice from '@/store/slices/userSlice.ts';
import { useRef } from 'react';
import { useStore } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from '../index.module.less';

export default function Login() {
  const { pathname, state } = useLocation();
  const returnPathRef = useRef(state?.pathname);
  const navigate = useNavigate();
  const store = useStore();

  const { run, loading: submitting } = useRequest(
    (values: RecordsType) => {
      if (values.account && values.password) {
        return loginWithPassword(values as LoginDTOWithPassword);
      }
      return loginWithVerificationCode(values as LoginDTOWithVerificationCode);
    },
    {
      manual: true
    }
  );

  function handleLogin(values: RecordsType) {
    if (!values.agreed) {
      toast.warning('请您同意用户条款');
    } else {
      run(values).then((res) => {
        if (res) {
          toast.success('登录成功', {
            duration: 1000
          });
          store.dispatch(userSlice.actions.setUser(res));
          setTimeout(() => {
            navigate(returnPathRef.current || '/', {
              replace: returnPathRef.current
            });
          }, 500);
        }
      });
    }
  }

  return (
    <div className={styles.container}>
      <Form onOk={handleLogin}>
        <Outlet />
        <Form.Item name={'agreed'}>
          <Checkbox>
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
        </Form.Item>
        <Form.Item>
          <Button
            type={'submit'}
            loading={submitting}
            className={styles.btn_primary}
          >
            登录
          </Button>
        </Form.Item>
      </Form>

      <Row justify={'space-between'} className={styles.links_bar}>
        <Link to={'/auth/password-reset'}>忘记密码？</Link>
        {pathname.endsWith('/login') ? (
          <Link to={'/auth/login/verification-code'}>手机号登录</Link>
        ) : (
          <Link to={'/auth/login'}>密码登录</Link>
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
