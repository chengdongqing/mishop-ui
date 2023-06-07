import LazyImage from '@/components/LazyImage';
import popup from '@/components/Popup';
import Row from '@/components/Row';
import Space from '@/components/Space';
import AccountLayout from '@/layouts/AccountLayout';
import toModifyPassword from '@/pages/Account/Account/PasswordModificationPopup';
import { useUserInfo } from '@/store/slices/userSlice.ts';
import { RightOutlined } from '@ant-design/icons';
import toModifyAccount from './AccountModificationPopup';
import styles from './index.module.less';

export default function AccountPage() {
  return (
    <>
      <LoginMethods />
      <AccountSecurity />
    </>
  );
}

function LoginMethods() {
  const userInfo = useUserInfo();

  return (
    <>
      <AccountLayout.Title title={'登录方式'} />
      <div className={styles.list}>
        <Row
          align={'middle'}
          justify={'space-between'}
          className={styles.list_item}
          onClick={() => {
            toModifyAccount('phoneNumber', () => {
              popup.alert('手机号修改成功！');
            });
          }}
        >
          <Space size={'1rem'}>
            <LazyImage
              alt={''}
              src={() => import('./assets/phone.png')}
              className={styles.icon}
            />
            安全手机
          </Space>
          <div>
            +86 {userInfo?.phoneNumber}
            <RightOutlined className={styles.icon_arrow} />
          </div>
        </Row>
        <Row
          align={'middle'}
          justify={'space-between'}
          className={styles.list_item}
          onClick={() => {
            toModifyAccount('email', () => {
              popup.alert('邮箱修改成功！');
            });
          }}
        >
          <Space size={'1rem'}>
            <LazyImage
              alt={''}
              src={() => import('./assets/email.png')}
              className={styles.icon}
            />
            安全邮箱
          </Space>
          <div>
            {userInfo?.email}
            <RightOutlined className={styles.icon_arrow} />
          </div>
        </Row>
        <Row
          align={'middle'}
          justify={'space-between'}
          className={styles.list_item}
          onClick={() => {
            toModifyPassword(() => {
              popup.alert('密码修改成功！');
            });
          }}
        >
          <Space size={'1rem'}>
            <LazyImage
              alt={''}
              src={() => import('./assets/password.png')}
              className={styles.icon}
            />
            修改密码
          </Space>
          <div>
            <RightOutlined className={styles.icon_arrow} />
          </div>
        </Row>
        <Row
          align={'middle'}
          justify={'space-between'}
          className={styles.list_item}
        >
          <Space size={'1rem'}>
            <LazyImage
              alt={''}
              src={() => import('./assets/account.png')}
              className={styles.icon}
            />
            第三方账号
          </Space>
          <div>
            <RightOutlined className={styles.icon_arrow} />
          </div>
        </Row>
      </div>
    </>
  );
}

function AccountSecurity() {
  return (
    <>
      <AccountLayout.Title title={'帐号安全'} />
      <div className={styles.list}>
        <Row
          align={'middle'}
          justify={'space-between'}
          className={styles.list_item}
        >
          <Space size={'1rem'}>
            <LazyImage
              alt={''}
              src={() => import('./assets/security.png')}
              className={styles.icon}
            />
            密保问题
          </Space>
          <div>
            <RightOutlined className={styles.icon_arrow} />
          </div>
        </Row>
        <Row
          align={'middle'}
          justify={'space-between'}
          className={styles.list_item}
        >
          <Space size={'1rem'}>
            <LazyImage
              alt={''}
              src={() => import('./assets/device.png')}
              className={styles.icon}
            />
            登录设备管理
          </Space>
          <div>
            <RightOutlined className={styles.icon_arrow} />
          </div>
        </Row>
      </div>
    </>
  );
}
