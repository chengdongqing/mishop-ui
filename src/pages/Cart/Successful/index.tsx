import Button from '@/components/Button';
import CommendedProducts from '@/components/CommendedProducts';
import Row from '@/components/Row';
import Space from '@/components/Space';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';

export default function CartSuccessfulPage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--color-background)' }}>
      <div className={styles.container}>
        <Row
          align={'middle'}
          justify={'space-between'}
          className={styles.content}
        >
          <Space>
            <img
              src={'https://c1.mifile.cn/f/i/17/static/success.png'}
              className={styles.icon}
              alt={'successful'}
            />
            <div>
              <div className={styles.title}>已成功加入购物车！</div>
              <div className={styles.name}>Xiaomi 13 Ultra 限量定制色 12GB+256GB 赤霞橙</div>
            </div>
          </Space>
          <Space size={'1.4rem'}>
            <Button
              outlined
              className={classNames(styles.btn, styles.gray)}
              onClick={() => {
                navigate(-1);
              }}
            >
              返回上一级
            </Button>
            <Button
              className={styles.btn}
              onClick={() => {
                navigate('/cart');
              }}
            >
              去购物车结算
            </Button>
          </Space>
        </Row>

        <CommendedProducts title={'买购物车中商品的人还买了'} />
      </div>
    </div>
  );
}
