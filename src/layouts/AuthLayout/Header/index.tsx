import Dropdown from '@/components/Dropdown';
import Logo from '@/components/Logo';
import Row from '@/components/Row';
import Space from '@/components/Space';
import useLogout from '@/layouts/MainLayout/Header/TopBar/UserNavs/useLogout.ts';
import { useHasLogin } from '@/store/slices/userSlice.ts';
import { Key, useState } from 'react';
import styles from './index.module.css';

export default function Header() {
  const hasLogin = useHasLogin();
  const { logoutWithConfirm } = useLogout();

  return (
    <Row
      align={'middle'}
      justify={'space-between'}
      className={styles.container}
    >
      <Space size={'1rem'}>
        <Logo className={styles.logo} />
        <div className={styles.title}>小米账号</div>
      </Space>

      <Space
        size={'2rem'}
        split={
          <div style={{ borderRight: '1px solid #ddd', height: '1.4rem' }} />
        }
        className={styles.navs}
      >
        <Space size={'2rem'}>
          <a
            href={
              'https://cn.account.xiaomi.com/about/protocol/agreement?_locale=zh_CN'
            }
            target={'_blank'}
          >
            用户协议
          </a>
          <a
            href={
              'https://cn.account.xiaomi.com/about/protocol/privacy?_locale=zh_CN'
            }
            target={'_blank'}
          >
            隐私政策
          </a>
          <a
            href={'https://cn.account.xiaomi.com/helpcenter?_locale=zh_CN'}
            target={'_blank'}
          >
            帮助中心
          </a>
        </Space>
        <Space size={'2rem'}>
          <LanguagePicker />
          {hasLogin && (
            <a className={styles.logout} onClick={logoutWithConfirm}>
              退出
            </a>
          )}
        </Space>
      </Space>
    </Row>
  );
}

const languages = [
  { key: 'zh_CN', label: '中文(简体)' },
  { key: 'zh_TW', label: '中文(繁體)' },
  { key: 'en', label: 'English' }
];

function LanguagePicker() {
  const [current, setCurrent] = useState<Key>(() => languages[0].key);

  return (
    <Dropdown
      menus={languages.filter((item) => item.key !== current)}
      overlayStyle={{ minWidth: '6.5rem' }}
      className={styles.language_picker}
      onChange={setCurrent}
    >
      <a>{languages.find((item) => item.key === current)?.label}</a>
    </Dropdown>
  );
}
