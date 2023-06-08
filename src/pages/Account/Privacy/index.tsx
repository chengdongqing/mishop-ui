import LazyImage from '@/components/LazyImage';
import Row from '@/components/Row';
import Space from '@/components/Space';
import AccountLayout from '@/layouts/AccountLayout';
import { RightOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const menus = [
  {
    label: '管理您的数据',
    desc: '从小米提供的服务或App中下载或删除与您的小米帐号相关的数据',
    icon: () => import('./assets/data.png')
  },
  {
    label: '注销帐号',
    desc: '永久删除小米帐号及其下所有数据并永远无法恢复',
    icon: () => import('./assets/logoff.png')
  },
  {
    label: '撤回同意隐私政策',
    desc: '撤回对隐私政策的同意，将永久删除小米帐号及其下所有数据并永远无法恢复',
    icon: () => import('./assets/revoke.png')
  },
  {
    label: '下载小米帐号个人资料',
    desc: '下载您在小米帐号中的个人信息和相关设置',
    icon: () => import('./assets/download.png')
  }
];

export default function PrivacyPage() {
  return (
    <>
      <AccountLayout.Title title={'隐私中心'} />

      {menus.map((item) => (
        <Row
          key={item.label}
          align={'middle'}
          justify={'space-between'}
          className={styles.row}
        >
          <Space size={'1rem'} align={'start'}>
            <LazyImage
              src={item.icon}
              alt={item.label}
              className={styles.icon}
            />
            <div>
              <div className={styles.label}>{item.label}</div>
              <div className={styles.desc}>{item.desc}</div>
            </div>
          </Space>
          <RightOutlined className={styles.icon_arrow} />
        </Row>
      ))}
    </>
  );
}
