import Button from '@/components/Button';
import RecommendedProducts from '@/components/RecommendedProducts';
import Row from '@/components/Row';
import Space from '@/components/Space';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.less';

export default function CartSuccessfulPage() {
  const params = useParams();
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
              <div className={styles.name}>{params.label}</div>
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

        <RecommendedProducts title={'买购物车中商品的人还买了'} />
      </div>
    </div>
  );
}
