import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import CloseIcon from '@/components/CloseIcon';
import NumberInput from '@/components/NumberInput';
import popup from '@/components/Popup';
import Row from '@/components/Row';
import Space from '@/components/Space';
import { CartContext } from '@/pages/Cart';
import { displayAmount, MathOperation } from '@/utils';
import classNames from 'classnames';
import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.less';
import useCart from './useCart.ts';

export default function MainCart() {
  return (
    <div className={styles.container}>
      <ProductList />
      <FooterBar />
    </div>
  );
}

function ProductList() {
  const { products, onChange } = useContext(CartContext);
  const [{ allChecked, halfChecked }, { switchCheck, removeItem }] = useCart(
    products,
    onChange
  );

  return (
    <div className={styles.product_list}>
      <Row
        align={'middle'}
        className={classNames(styles.product_row, styles.title)}
      >
        <div className={styles.col_check}>
          <Checkbox
            checked={allChecked || halfChecked}
            indeterminate={!allChecked && halfChecked}
            onChange={(checked) => {
              switchCheck(-1, checked);
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
      {products.map((item, index) => (
        <Row key={item.label} align={'middle'} className={styles.product_row}>
          <div className={styles.col_check}>
            <Checkbox
              checked={item.checked}
              onChange={(checked) => {
                switchCheck(index, checked);
              }}
            />
            <img
              alt={item.label}
              src={item.pictureUrl}
              className={styles.img}
            />
          </div>
          <div className={classNames(styles.col_name, 'text-ellipsis')}>
            {item.label}
          </div>
          <div className={styles.col_price}>{displayAmount(item.price)}</div>
          <div className={styles.col_num}>
            <NumberInput
              value={item.number}
              onChange={(value) => {
                if (value > item.limitNumber) {
                  popup.alert('商品加入购物车数量超过限购数');
                } else if (value === 0) {
                  removeItem(index);
                } else {
                  products.splice(index, 1, {
                    ...item,
                    number: value
                  });
                  onChange([...products]);
                }
              }}
            />
          </div>
          <div className={classNames(styles.col_total, styles.value)}>
            {displayAmount(MathOperation.multiply(item.price, item.number))}
          </div>
          <div className={styles.col_action}>
            <CloseIcon
              className={styles.icon}
              onClick={() => {
                removeItem(index);
              }}
            />
          </div>
        </Row>
      ))}
    </div>
  );
}

function FooterBar() {
  const { products, onChange } = useContext(CartContext);

  const totalNum = useMemo(() => {
    return products.reduce((sum, item) => {
      return item.checked ? sum + item.number : sum;
    }, 0);
  }, [products]);
  const totalAmount = useMemo(() => {
    return products.reduce((sum, item) => {
      return item.checked
        ? MathOperation.plus(
            sum,
            MathOperation.multiply(item.price, item.number)
          )
        : sum;
    }, 0);
  }, [products]);

  return (
    <Row
      align={'middle'}
      justify={'space-between'}
      className={styles.footer_bar}
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
            popup.confirm('确认清空购物车吗？', {
              onOk() {
                onChange([]);
              }
            });
          }}
        >
          清空购物车
        </div>
        <div className={styles.cart_total}>
          已选择 <span>{totalNum}</span> 件
        </div>
      </Space>
      <Space size={'5rem'}>
        <div className={styles.total_amount}>
          合计：<span>{totalAmount}</span> 元
        </div>
        <div>
          <Link to={'/order/checkout'}>
            <Button
              className={classNames(
                styles.btn_order,
                totalNum === 0 && styles.disabled
              )}
            >
              去结算
            </Button>
          </Link>
          {totalNum === 0 && (
            <Button outlined className={styles.btn_tips}>
              请勾选需要结算的商品
            </Button>
          )}
        </div>
      </Space>
    </Row>
  );
}
