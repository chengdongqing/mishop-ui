import Button from '@/components/Button';
import DataContainer from '@/components/DataContainer';
import Iconfont from '@/components/Iconfont';
import Row from '@/components/Row';
import Space from '@/components/Space';
import useToggle from '@/hooks/useToggle.ts';
import { ProductContext } from '@/pages/Product';
import { ProductDetails as ProductDetailsType, ProductSKU } from '@/services/product.ts';
import cartSlice from '@/store/slices/cartSlice.ts';
import { useHasLogin } from '@/store/slices/userSlice.ts';
import { formatAmount } from '@/utils';
import { CheckCircleOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useContext, useMemo, useState } from 'react';
import { useStore } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import ProductDetails from './ProductDetails';
import ProductSkus from './ProductSkus';
import ProductSwiper from './ProductSwiper';

export default function ProductBuyingPage() {
  const ctx = useContext(ProductContext);
  const hasLogin = useHasLogin();
  const [pictures, setPictures] = useState<string[]>([]);

  return (
    <DataContainer loading={!ctx}>
      {!hasLogin && <LoginTipsBar />}
      <div className={styles.container}>
        <ProductSwiper pictures={pictures} />
        <ProductPanel
          product={ctx as ProductDetailsType}
          onPicturesChange={setPictures}
        />
      </div>
      {ctx?.staticDetails ? (
        <ProductDetails items={ctx.staticDetails} />
      ) : (
        <PriceDescription />
      )}
    </DataContainer>
  );
}

function ProductPanel({
  product,
  onPicturesChange
}: {
  product: ProductDetailsType;
  onPicturesChange: (values: string[]) => void;
}) {
  const store = useStore();
  const navigate = useNavigate();
  const [liked, toggleLiked] = useToggle();
  const [sku, setSku] = useState<ProductSKU>();
  const productName = useMemo(() => {
    return [
      product.name,
      sku?.attributes.reduce((sum: string[], item) => {
        sum.push(item.value);
        return sum;
      }, [])
    ]
      .flatMap((item) => item)
      .join(' ');
  }, [product.name, sku?.attributes]);

  return (
    <div className={styles.panel_container}>
      <div className={styles.name}>{product.name}</div>
      <div className={styles.desc}>{product.description}</div>
      <div className={styles.source}>{product.brand}</div>
      <div className={styles.price}>{formatAmount(sku?.price)}</div>
      <div className={styles.split} />

      <ProductSkus
        items={product.skus}
        onChange={(value) => {
          setSku(value);
          onPicturesChange(value?.pictureUrls || []);
        }}
      />

      <div className={styles.selected_info}>
        <Row justify={'space-between'}>
          <div>{productName}</div>
        </Row>
        <div className={styles.total}>总计：{formatAmount(sku?.price)}</div>
      </div>

      {!!sku && !!productName && (
        <Space size={'1rem'} className={styles.action_buttons}>
          <Button
            className={classNames(styles.btn, styles.btn_buy)}
            onClick={() => {
              store.dispatch(
                cartSlice.actions.putProduct({
                  product: {
                    id: 1,
                    pictureUrl: sku.pictureUrl,
                    name: productName,
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
          <Button
            gray
            className={classNames(styles.btn, styles.btn_like)}
            onClick={toggleLiked}
          >
            {!liked ? (
              <HeartOutlined className={styles.icon} />
            ) : (
              <>
                <HeartFilled
                  className={classNames(styles.icon, styles.active)}
                />
                <HeartFilled
                  className={classNames(
                    styles.icon,
                    styles.active,
                    styles.animation
                  )}
                />
              </>
            )}
            喜欢
          </Button>
        </Space>
      )}

      <Space size={'1.5rem'} wrap className={styles.after_sale_info}>
        {['7天无理由退货', '7天价格保护'].map((item) => (
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
