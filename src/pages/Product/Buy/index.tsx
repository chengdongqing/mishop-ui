import Button from '@/components/Button';
import Iconfont from '@/components/Iconfont';
import Row from '@/components/Row';
import Space from '@/components/Space';
import cartSlice from '@/store/slices/cartSlice.ts';
import { useHasLogin } from '@/store/slices/userSlice.ts';
import { CheckCircleOutlined, HeartOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useState } from 'react';
import { useStore } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AfterSaleInfos } from './const.ts';
import styles from './index.module.less';
import ProductSkus from './ProductSkus';
import ProductSwiper from './ProductSwiper';

export default function BuyProductPage() {
  const hasLogin = useHasLogin();

  return (
    <>
      {!hasLogin && <LoginTipsBar />}
      <div className={styles.container}>
        <ProductSwiper />
        <ProductPanel />
      </div>
      <PriceDescription />
    </>
  );
}

function ProductPanel() {
  const store = useStore();
  const navigate = useNavigate();

  return (
    <div className={styles.panel_container}>
      <div className={styles.name}>Xiaomi 13 Ultra 系列</div>
      <div className={styles.desc}>Xiaomi 13 Ultra 系列</div>
      <div className={styles.source}>小米自营</div>
      <div className={styles.price}>5999 元</div>
      <div className={styles.split} />
      <ProductSkus />
      <div className={styles.selected_info}>
        <Row justify={'space-between'}>
          <div>Xiaomi 13 Ultra 限量定制色 12GB+256GB 赤霞橙</div>
          <div>5999元</div>
        </Row>
        <div className={styles.total}>总计：5999元</div>
      </div>

      <Space size={'1rem'} className={styles.action_buttons}>
        <Button
          className={classNames(styles.btn, styles.btn_buy)}
          onClick={() => {
            store.dispatch(
              cartSlice.actions.putProduct({
                product: {
                  pictureUrl:
                    'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1682993596.25086880.png',
                  label: 'Xiaomi 13 Ultra 限量定制色 12GB+256GB 赤霞橙',
                  price: 5999,
                  checked: true,
                  number: 1
                },
                callback(successful) {
                  if (successful) {
                    navigate('/cart/successfully');
                  }
                }
              })
            );
          }}
        >
          加入购物车
        </Button>
        <Button className={classNames(styles.btn, styles.btn_like)} gray>
          <HeartOutlined className={styles.icon} />
          喜欢
        </Button>
      </Space>

      <Space size={'1.5rem'} wrap className={styles.after_sale_info}>
        {AfterSaleInfos.map((item) => (
          <div key={item} className={styles.item}>
            <CheckCircleOutlined className={styles.icon} />
            {item}
          </div>
        ))}
      </Space>
    </div>
  );
}

function LoginTipsBar() {
  const [showLoginTips, setShowLoginTips] = useState(true);

  return showLoginTips ? (
    <div className={styles.login_tips}>
      <span>为方便您购买，请提前登录</span>
      <Link to={'/login'} className={styles.link}>
        立即登录
      </Link>
      <Iconfont
        type={'i-close'}
        className={styles.icon}
        onClick={() => {
          setShowLoginTips(false);
        }}
      />
    </div>
  ) : null;
}

function PriceDescription() {
  return (
    <div style={{ backgroundColor: 'var(--color-background)' }}>
      <div className={styles.price_description}>
        <div className={styles.title}>价格说明</div>
        <img
          src={
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/43e2954feb6d1b108438481f1d5b0bd3.png'
          }
          alt={''}
          width={'100%'}
        />
      </div>
    </div>
  );
}
