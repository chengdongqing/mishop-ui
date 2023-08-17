import Button from '@/components/Button';
import DataContainer from '@/components/DataContainer';
import Grid from '@/components/Grid';
import popup from '@/components/Popup';
import Space from '@/components/Space';
import toast from '@/components/Toast';
import useRequest from '@/hooks/useRequest.ts';
import UserLayout from '@/layouts/UserLayout';
import services from '@/services/favorite.ts';
import { buildProductUrl, formatAmount } from '@/utils';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

export default function FavoriteProductsPage() {
  const { data, loading, run } = useRequest(services.fetchFavorites);

  return (
    <>
      <UserLayout.Header title={'喜欢的商品'} />
      <DataContainer loading={loading} empty={!data?.length && '您暂未收藏任何商品。'}>
        <Grid columns={3}>
          {data?.map((item) => (
            <div key={item.id} className={styles.product_item}>
              <Link to={buildProductUrl(item.productId)} target={'_blank'}>
                <img src={item.pictureUrl} alt={item.productName} />
                <div className={classNames(styles.label, 'text-ellipsis')}>
                  {item.productName} {item.skuName}
                </div>
              </Link>
              <div className={styles.price}>{formatAmount(item.price)}</div>
              <Space size={'1.4rem'} className={styles.actions}>
                <Button
                  className={classNames(styles.btn, styles.plain)}
                  onClick={() => {
                    popup.confirm('确定要删除吗？', {
                      async onOk() {
                        await services.removeFavorite(item.productId);
                        toast.success('删除成功');
                        await run();
                      }
                    });
                  }}
                >
                  删除
                </Button>
                <Link to={buildProductUrl(item.productId)} target={'_blank'}>
                  <Button className={styles.btn}>查看详情</Button>
                </Link>
              </Space>
            </div>
          ))}
        </Grid>
      </DataContainer>
    </>
  );
}
