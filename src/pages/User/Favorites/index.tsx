import Button from '@/components/Button';
import Grid from '@/components/Grid';
import popup from '@/components/Popup';
import Space from '@/components/Space';
import toast from '@/components/Toast';
import UserLayout from '@/layouts/UserLayout';
import { useCartProducts } from '@/store/slices/cartSlice.ts';
import { buildProductUrl, formatAmount } from '@/utils';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

export default function FavoriteProductsPage() {
  const products = useCartProducts();

  return (
    <>
      <UserLayout.Header title={'喜欢的商品'} />
      {products.length ? (
        <Grid columns={3}>
          {products.map((item) => (
            <div key={item.name} className={styles.product_item}>
              <Link to={buildProductUrl(item.name)} target={'_blank'}>
                <img src={item.pictureUrl} alt={item.name} />
                <div className={classNames(styles.label, 'text-ellipsis')}>
                  {item.name}
                </div>
              </Link>
              <div className={styles.price}>{formatAmount(item.price)}</div>
              <Space size={'1.4rem'} className={styles.actions}>
                <Button
                  className={classNames(styles.btn, styles.plain)}
                  onClick={() => {
                    popup.confirm('确定删除该商品吗？', {
                      onOk() {
                        return new Promise((resolve) => {
                          setTimeout(() => {
                            toast.success('删除成功');
                            resolve();
                          }, 1000);
                        });
                      }
                    });
                  }}
                >
                  删除
                </Button>
                <Link to={buildProductUrl(item.name)} target={'_blank'}>
                  <Button className={styles.btn}>查看详情</Button>
                </Link>
              </Space>
            </div>
          ))}
        </Grid>
      ) : (
        <UserLayout.Empty title={'您暂未收藏任何商品。'} />
      )}
    </>
  );
}
