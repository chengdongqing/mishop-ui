import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import CloseIcon from '@/components/CloseIcon';
import NumberInput from '@/components/NumberInput';
import popup from '@/components/Popup';
import Row from '@/components/Row';
import Space from '@/components/Space';
import useIsElementVisible from '@/hooks/useIsElementVisible.ts';
import cartSlice, { useCartProducts } from '@/store/slices/cartSlice.ts';
import { buildProductUrl, displayAmount } from '@/utils';
import classNames from 'classnames';
import Decimal from 'decimal.js';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, useCartCounter } from './helpers.ts';
import styles from './index.module.less';

export default function MainCart() {
  return (
    <div className={styles.container}>
      <ProductList />
      <FooterBar />
    </div>
  );
}

function ProductList() {
  const products = useCartProducts();
  const dispatch = useDispatch();
  const [{ allChecked, halfChecked }, { switchCheck, removeItem }] = useCart();

  return (
    <div className={styles.product_list}>
      <Row
        align={'middle'}
        className={classNames(styles.product_row, styles.title)}
      >
        <div className={styles.col_check}>
          <Checkbox
            checked={allChecked}
            indeterminate={!allChecked && halfChecked}
            onChange={(checked) => {
              switchCheck(null, checked);
            }}
          >
            <span style={{ marginLeft: '1rem' }}>全选</span>
          </Checkbox>
        </div>
        <div className={styles.col_name}>商品名称</div>
        <div className={styles.col_price}>单价</div>
        <div className={styles.col_num}>数量</div>
        <div className={styles.col_total}>小计</div>
        <div className={styles.col_action}>操作</div>
      </Row>
      {products.map((item) => (
        <Row key={item.label} align={'middle'} className={styles.product_row}>
          <div className={styles.col_check}>
            <Checkbox
              checked={item.checked}
              onChange={(checked) => {
                switchCheck(item, checked);
              }}
            />
            <Link to={buildProductUrl(item.label)}>
              <img
                alt={item.label}
                src={item.pictureUrl}
                className={styles.img}
              />
            </Link>
          </div>
          <div className={classNames(styles.col_name, 'text-ellipsis')}>
            <Link to={buildProductUrl(item.label)}>{item.label}</Link>
          </div>
          <div className={styles.col_price}>{displayAmount(item.price)}</div>
          <div className={styles.col_num}>
            <NumberInput
              value={item.number}
              onChange={(value) => {
                if (value === 0) {
                  removeItem(item);
                } else {
                  dispatch(
                    cartSlice.actions.modifyProductNumber({
                      label: item.label,
                      number: value
                    })
                  );
                }
              }}
            />
          </div>
          <div className={classNames(styles.col_total, styles.value)}>
            {displayAmount(new Decimal(item.price).mul(item.number).toNumber())}
          </div>
          <div className={styles.col_action}>
            <CloseIcon
              className={styles.icon}
              onClick={() => {
                removeItem(item);
              }}
            />
          </div>
        </Row>
      ))}
    </div>
  );
}

function FooterBar() {
  const products = useCartProducts();
  const dispatch = useDispatch();
  const { totalNumber, totalAmount } = useCartCounter();
  const footerRef = useRef<HTMLDivElement>(null);
  const fixed = useIsElementVisible({
    elementRef: footerRef,
    predicate(rect) {
      return rect.bottom >= window.innerHeight;
    },
    deps: [products.length]
  });
  const navigate = useNavigate();

  return (
    <div
      ref={footerRef}
      className={classNames(styles.footer_bar, fixed && styles.fixed)}
    >
      <Space
        size={'1.6rem'}
        split={<span style={{ color: '#eee' }}>|</span>}
        style={{ marginLeft: '2.4rem' }}
      >
        <Link to={'/search'} className={styles.link_item}>
          继续购物
        </Link>
        <div
          className={classNames(styles.link_item, styles.danger)}
          onClick={() => {
            popup.confirm('确定清空购物车吗？', {
              onOk() {
                dispatch(cartSlice.actions.clearCart());
              }
            });
          }}
        >
          清空购物车
        </div>
        <div className={styles.cart_total}>
          已选择 <span>{displayAmount(totalNumber, '')}</span> 件
        </div>
      </Space>
      <Space size={'5rem'}>
        <div className={styles.total_amount}>
          合计：<span>{displayAmount(totalAmount, '')}</span> 元
        </div>
        <div>
          <Button
            className={classNames(
              styles.btn_order,
              totalNumber === 0 && styles.disabled
            )}
            onClick={() => {
              if (totalNumber > 0) {
                navigate('/order/checkout');
              }
            }}
          >
            去结算
          </Button>
          {totalNumber === 0 && (
            <Button outlined className={styles.btn_tips}>
              请勾选需要结算的商品
            </Button>
          )}
        </div>
      </Space>
    </div>
  );
}
