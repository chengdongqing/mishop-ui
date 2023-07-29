import Grid from '@/components/Grid';
import Row from '@/components/Row';
import Space from '@/components/Space';
import { useUserInfo } from '@/store/slices/userSlice.ts';
import { formatValue } from '@/utils';
import { RightOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

const options = [
  {
    label: '待支付的订单',
    icon: 'https://s01.mifile.cn/i/user/portal-icon-1.png',
    href: '/orders?status=PENDING_PAYMENT'
  },
  {
    label: '待收货的订单',
    icon: 'https://s01.mifile.cn/i/user/portal-icon-2.png',
    href: '/orders?status=PENDING_RECEIVING'
  },
  {
    label: '待评价的商品',
    icon: 'https://s01.mifile.cn/i/user/portal-icon-3.png',
    href: '/orders/reviews'
  },
  {
    label: '喜欢的商品',
    icon: 'https://s01.mifile.cn/i/user/portal-icon-4.png',
    href: '/user/favorites'
  }
];

export default function UserCenterPage() {
  const user = useUserInfo();
  const currentPeriod = useMemo(() => {
    const hours = new Date().getHours();
    const periods = ['凌晨', '上午', '下午', '晚上'];
    return periods[Math.floor(hours / 6)];
  }, []);

  return (
    <>
      <Row align={'middle'} className={styles.header}>
        <img alt={'avatar'} src={user?.avatarUrl} className={styles.avatar} />
        <div className={styles.profile}>
          <div className={styles.name}>{user?.name}</div>
          <div className={styles.welcome}>{currentPeriod}好～</div>
          <Link
            target={'_blank'}
            to={'/account/profile'}
            className={styles.link}
          >
            修改个人信息 {'>'}
          </Link>
        </div>
        <div className={styles.account}>
          <div>
            账户安全：<span className={styles.safety_level3}>较高</span>
          </div>
          <div>绑定手机：{user?.phoneNumber}</div>
          <div>绑定邮箱：{formatValue(user?.email)}</div>
        </div>
      </Row>
      <Grid columns={2} gap={'6rem 0'} className={styles.numbers}>
        {options.map((item) => (
          <Space key={item.label} size={'2rem'}>
            <img src={item.icon} alt={item.label} className={styles.icon} />
            <div>
              <div className={styles.label}>
                {item.label}：<span className={styles.value}>0</span>
              </div>
              <Link to={item.href} className={styles.link}>
                查看{item.label} <RightOutlined className={styles.icon_right} />
              </Link>
            </div>
          </Space>
        ))}
      </Grid>
    </>
  );
}
