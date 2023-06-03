import Button from '@/components/Button';
import Iconfont from '@/components/Iconfont';
import Row from '@/components/Row';
import Space from '@/components/Space';
import cartSlice from '@/store/slices/cartSlice.ts';
import { useHasLogin } from '@/store/slices/userSlice.ts';
import { formatAmount } from '@/utils';
import { CheckCircleOutlined, HeartOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { useStore } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AfterSaleInfos } from './const.ts';
import styles from './index.module.less';
import ProductDetails from './ProductDetails';
import ProductSkus, { ProductSku } from './ProductSkus';
import ProductSwiper from './ProductSwiper';

export default function ProductBuyingPage() {
  const hasLogin = useHasLogin();
  const [pictures, setPictures] = useState<string[]>([]);

  const { label } = useParams<{ label: string }>();
  // 此处根据是否为空调控制展示静态详情，仅为功能示意
  const isAC = useMemo(() => label?.includes('空调'), [label]);

  return (
    <>
      {!hasLogin && <LoginTipsBar />}
      <div className={styles.container}>
        <ProductSwiper pictures={pictures} />
        <ProductPanel onPicturesChange={setPictures} />
      </div>
      {isAC ? <ProductDetails /> : <PriceDescription />}
    </>
  );
}

function ProductPanel({
  onPicturesChange
}: {
  onPicturesChange: (values: string[]) => void;
}) {
  const store = useStore();
  const navigate = useNavigate();
  const [sku, setSku] = useState<ProductSku>();
  const productName = useMemo(() => {
    return (
      sku?.attrs
        .reduce((sum: string[], item) => {
          sum.push(item.value);
          return sum;
        }, [])
        .join(' ') || ''
    );
  }, [sku?.attrs]);

  return (
    <div className={styles.panel_container}>
      <div className={styles.name}>Xiaomi 13 Ultra 系列</div>
      <div className={styles.desc}>Xiaomi 13 Ultra 系列</div>
      <div className={styles.source}>小米自营</div>
      <div className={styles.price}>{formatAmount(sku?.price)}</div>
      <div className={styles.split} />

      <ProductSkus
        onChange={(value) => {
          setSku(value);
          onPicturesChange(value?.pictures || []);
        }}
      />

      <div className={styles.selected_info}>
        <Row justify={'space-between'}>
          <div>{productName}</div>
          <div>{formatAmount(sku?.price)}</div>
        </Row>
        <div className={styles.total}>总计：{formatAmount(sku?.price)}</div>
      </div>

      {!!sku && (
        <Space size={'1rem'} className={styles.action_buttons}>
          <Button
            className={classNames(styles.btn, styles.btn_buy)}
            onClick={() => {
              store.dispatch(
                cartSlice.actions.putProduct({
                  product: {
                    pictureUrl: sku.picture,
                    label: productName,
                    price: sku.price,
                    checked: true,
                    number: 1
                  },
                  callback(successful) {
                    if (successful) {
                      navigate(`/cart/successful/${productName}`);
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
      )}

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

export function PriceDescription({ weixin = false }: { weixin?: boolean }) {
  return (
    <div style={{ backgroundColor: 'var(--color-background)' }}>
      {weixin && (
        <div className={styles.official_weixin}>
          <div className={styles.title}>官方微信</div>
          <img
            src={
              'https://i8.mifile.cn/b2c-mimall-media/1a84b2b629512205bf528aae91361efb.jpg'
            }
            alt={''}
            width={'100%'}
          />
        </div>
      )}
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
