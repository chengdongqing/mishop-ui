import LazyImage from '@/components/LazyImage';
import popup from '@/components/Popup';
import Row from '@/components/Row';
import Space from '@/components/Space';
import toast from '@/components/Toast';
import useQueryParams from '@/hooks/useQueryParams.ts';
import AccountLayout from '@/layouts/AccountLayout';
import useLogout from '@/layouts/MainLayout/Header/TopBar/UserNavs/useLogout.ts';
import { deleteAccount } from '@/services/user.ts';
import userSlice, { useUserInfo } from '@/store/slices/userSlice.ts';
import { RightOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import toModifyAccount from './AccountModificationPopup';
import styles from './index.module.less';
import toModifyPassword from './PasswordModificationPopup';

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
  const dispatch = useDispatch();
  const { action } = useQueryParams<{
    action?: string;
  }>();
  useEffect(() => {
    if (action === 'password') {
      setTimeout(() => {
        toModifyPassword(() => {
          popup.alert('密码修改成功！');
        });
      }, 500);
    }
  }, [action]);

  return (
    <>
      <AccountLayout.Title title={'登录方式'} />
      <div className={styles.list}>
        <Row
          align={'middle'}
          justify={'space-between'}
          className={styles.list_item}
          onClick={() => {
            toModifyAccount('phoneNumber', (value) => {
              dispatch(
                userSlice.actions.modifyUser({
                  phoneNumber: value
                })
              );
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
            toModifyAccount('email', (value) => {
              dispatch(
                userSlice.actions.modifyUser({
                  emailAddress: value
                })
              );
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
            {userInfo?.emailAddress}
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
  const { logout } = useLogout();

  return (
    <>
      <AccountLayout.Title title={'账号安全'} />
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
          onClick={() => {
            popup.confirm(
              '请注意，注销后当前账号的个人信息将被彻底删除且不可恢复，确定注销账号吗？',
              {
                async onOk() {
                  await deleteAccount();
                  toast.success('账号注销成功');
                  logout();
                }
              }
            );
          }}
        >
          <Space size={'1rem'}>
            <LazyImage
              alt={''}
              src={() => import('./assets/device.png')}
              className={styles.icon}
            />
            注销账号
          </Space>
          <div>
            <RightOutlined className={styles.icon_arrow} />
          </div>
        </Row>
      </div>
    </>
  );
}
