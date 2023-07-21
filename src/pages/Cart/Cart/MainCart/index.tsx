import openAgreementsDeclaring from '@/components/AgreementsDeclaring';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import CloseIcon from '@/components/CloseIcon';
import NumberInput from '@/components/NumberInput';
import Row from '@/components/Row';
import Space from '@/components/Space';
import useCartActions from '@/hooks/useCartActions.ts';
import useElementVisible from '@/hooks/useElementVisible.ts';
import { useCartItems } from '@/store/slices/cartSlice.ts';
import { useHasLogin } from '@/store/slices/userSlice.ts';
import { buildProductUrl, formatAmount } from '@/utils';
import classNames from 'classnames';
import Decimal from 'decimal.js';
import { useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartCheck, useCartCounter } from './helpers.ts';
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
  const products = useCartItems();
  const { allChecked, halfChecked, switchCheck } = useCartCheck();
  const actions = useCartActions();

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
        <Row key={item.skuId} align={'middle'} className={styles.product_row}>
          <div className={styles.col_check}>
            <Checkbox
              checked={item.isChecked}
              onChange={(checked) => {
                switchCheck(item, checked);
              }}
            />
            <Link to={buildProductUrl(item.productId)}>
              <img
                alt={item.productName}
                src={item.pictureUrl}
                className={styles.img}
              />
            </Link>
          </div>
          <div className={classNames(styles.col_name, 'text-ellipsis')}>
            <Link to={buildProductUrl(item.productId)}>
              {item.productName} {item.skuName}
            </Link>
          </div>
          <div className={styles.col_price}>{formatAmount(item.price)}</div>
          <div className={styles.col_num}>
            <NumberInput
              value={item.quantity}
              onChange={(value) => {
                if (value === 0) {
                  actions.remove([item]);
                } else {
                  actions.modify([
                    {
                      ...item,
                      quantity: value
                    }
                  ]);
                }
              }}
            />
          </div>
          <div className={classNames(styles.col_total, styles.value)}>
            {formatAmount(
              new Decimal(item.price).mul(item.quantity).toNumber()
            )}
          </div>
          <div className={styles.col_action}>
            <CloseIcon
              className={styles.icon}
              onClick={() => {
                actions.remove([item]);
              }}
            />
          </div>
        </Row>
      ))}
    </div>
  );
}

function FooterBar() {
  const products = useCartItems();
  const checkedProducts = useMemo(() => {
    return products.filter((item) => item.isChecked);
  }, [products]);
  const { totalNumber, totalAmount } = useCartCounter();
  const footerRef = useRef<HTMLDivElement>(null);
  const fixed = useElementVisible(
    footerRef,
    (rect) => rect.bottom >= window.innerHeight,
    [products.length]
  );

  const hasLogin = useHasLogin();
  const navigate = useNavigate();
  const actions = useCartActions();
  const [submitting, setSubmitting] = useState(false);

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
        {!!checkedProducts.length && (
          <div
            className={classNames(styles.link_item, styles.danger)}
            onClick={() => {
              actions.remove(checkedProducts);
            }}
          >
            删除已选
          </div>
        )}
        <div className={styles.cart_total}>
          已选择 <span>{formatAmount(totalNumber, '')}</span> 件
        </div>
      </Space>
      <Space size={'5rem'}>
        <div className={styles.total_amount}>
          合计：<span>{formatAmount(totalAmount, '')}</span> 元
        </div>
        <div>
          <Button
            loading={submitting}
            className={classNames(
              styles.btn_order,
              totalNumber === 0 && styles.disabled
            )}
            onClick={() => {
              if (totalNumber > 0) {
                if (hasLogin) {
                  setSubmitting(true);
                  setTimeout(() => {
                    navigate('/orders/checkout');
                  }, 1000);
                } else {
                  openAgreementsDeclaring(() => {
                    navigate('/auth/login', {
                      state: {
                        pathname: '/cart'
                      }
                    });
                  });
                }
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
