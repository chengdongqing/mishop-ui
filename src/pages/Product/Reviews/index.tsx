import Checkbox from '@/components/Checkbox';
import DataContainer from '@/components/DataContainer';
import Form from '@/components/Form';
import Grid from '@/components/Grid';
import previewImages from '@/components/ImagePreview';
import LazyImage from '@/components/LazyImage';
import Loading from '@/components/Loading';
import Rate from '@/components/Rate';
import Row from '@/components/Row';
import Space from '@/components/Space';
import useElementVisible from '@/hooks/useElementVisible.ts';
import useRequest from '@/hooks/useRequest.ts';
import useSetState from '@/hooks/useSetState.ts';
import {
  fetchProductReviewsByPage,
  fetchProductReviewsStatistics,
  ProductReviewVO,
  ReviewPageRequestDTO
} from '@/services/productReview.ts';
import { MehOutlined, SmileOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import FilterBar from './FilterBar';
import styles from './index.module.less';
import SatisfactionCard from './SatisfactionCard';

export default function ProductReviewsPage() {
  const params = useParams<{
    id: string;
  }>();
  const productId = Number(params.id);
  const [filterParams, setFilterParams] = useSetState<ReviewPageRequestDTO>();
  const { loading, data, run } = useRequest(fetchProductReviewsStatistics, {
    manual: true
  });
  useEffect(() => {
    run(productId);
  }, [productId, run]);

  const containerRef = useRef<HTMLDivElement>(null);
  const btnVisible = useElementVisible(containerRef, () => {
    return window.scrollY > 200;
  });

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className={styles.container}>
        <Form noStyle onChange={setFilterParams}>
          <DataContainer
            loading={loading}
            empty={!data?.allCount && '该商品暂无评论'}
            whiteOnEmpty
          >
            <Form.Item name={'rating'}>
              <FilterBar
                all={data?.allCount || 0}
                items={data?.scoresMap || {}}
              />
            </Form.Item>
            <Row style={{ marginTop: '3rem' }} wrap={false}>
              <ReviewList productId={productId} params={filterParams} />
              <SatisfactionCard {...data} />

              <div className={styles.go_top}>
                <div
                  hidden={!btnVisible}
                  className={styles.btn}
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    });
                  }}
                />
              </div>
            </Row>
          </DataContainer>
        </Form>
      </div>
    </div>
  );
}

function ReviewList({
  productId,
  params
}: {
  productId: number;
  params: ReviewPageRequestDTO;
}) {
  const [reviews, setReviews] = useState<ProductReviewVO[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const { data, loading, run } = useRequest(
    (pageNumber: number) =>
      fetchProductReviewsByPage(productId, {
        ...params,
        pageNumber
      }),
    {
      manual: true
    }
  );
  useEffect(() => {
    run().then((res) => {
      setReviews(res?.data || []);
    });
  }, [run, params]);

  return (
    <div className={styles.body}>
      <Row justify={'space-between'} align={'middle'} className={styles.header}>
        <div className={styles.title}>热门评价</div>
        <Form.Item name={'withPhotosOnly'}>
          <Checkbox>只显示带图评价</Checkbox>
        </Form.Item>
      </Row>

      <DataContainer
        loading={loading && !loadingMore}
        empty={!data?.totalSize && '暂无数据'}
      >
        <div className={styles.review_list}>
          {reviews.map((item) => (
            <div key={item.id} className={styles.review_item}>
              <Row justify={'space-between'} align={'middle'}>
                <Space size={'1.8rem'} className={styles.user_info}>
                  <LazyImage
                    alt={item.userName}
                    src={item.userAvatar}
                    className={styles.avatar}
                  />
                  <div>
                    <div className={styles.name}>{item.userName}</div>
                    <div className={styles.date}>{item.createdAt}</div>
                  </div>
                </Space>
                <Rate
                  disabled
                  value={item.rating}
                  character={(value) => {
                    return value >= 3 ? <SmileOutlined /> : <MehOutlined />;
                  }}
                />
              </Row>
              <div className={styles.content}>{item.content}</div>
              {!!item.photoUrls?.length && (
                <div
                  className={classNames(
                    styles.photos,
                    item.photoUrls.length === 1 && styles.single
                  )}
                >
                  <Grid columns={4} gap={'0.8rem'}>
                    {item.photoUrls.map((photo, index) => (
                      <LazyImage
                        key={photo}
                        src={photo}
                        alt={''}
                        onClick={() => {
                          previewImages(item.photoUrls || [], index);
                        }}
                      />
                    ))}
                  </Grid>
                </div>
              )}
            </div>
          ))}

          {!loadingMore && !!data && data.pageNumber < data.totalPages && (
            <div
              className={styles.btn_load_more}
              onClick={() => {
                setLoadingMore(true);
                run(data?.pageNumber + 1)
                  .then((res) => {
                    setReviews((items) => {
                      return items.concat(res?.data || []);
                    });
                  })
                  .finally(() => {
                    setLoadingMore(false);
                  });
              }}
            >
              加载更多
            </div>
          )}
          {loadingMore && <Loading type={'dots'} />}
        </div>
      </DataContainer>
    </div>
  );
}
