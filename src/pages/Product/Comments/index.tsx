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
import { CommentsPageRequestDTO, fetchCommentsByPage, fetchCommentsStatistics } from '@/services/comment.ts';
import { MehOutlined, SmileOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import FilterBar from './FilterBar';
import styles from './index.module.less';
import SatisfactionCard from './SatisfactionCard';

export default function ProductCommentsPage() {
  const productId = useParams().id as Id;
  const { loading, data, run } = useRequest(fetchCommentsStatistics, {
    manual: true
  });
  useEffect(() => {
    run(productId);
  }, [productId, run]);

  const [filterParams, setFilterParams] = useSetState<CommentsPageRequestDTO>();

  const containerRef = useRef<HTMLDivElement>(null);
  const btnVisible = useElementVisible(containerRef, () => {
    return window.scrollY > 200;
  });

  console.log(filterParams);

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className={styles.container}>
        <Form
          onChange={(changedValues) => {
            setFilterParams(changedValues);
          }}
        >
          <DataContainer
            loading={loading}
            empty={!data?.numberOfAll && '该商品暂无评论'}
            whiteOnEmpty
          >
            <Form.Item name={'rating'}>
              <FilterBar
                all={data?.numberOfAll || 0}
                items={data?.scoresMap || {}}
              />
            </Form.Item>
            <Row style={{ marginTop: '3rem' }} wrap={false}>
              <CommentList productId={productId} params={filterParams} />
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

export interface ProductCommentItem {
  id: Id;
  rating: number;
  content?: string;
  photos?: string[];
  userName: string;
  userAvatar: string;
  createdAt: string;
}

function CommentList({
  productId,
  params
}: {
  productId: Id;
  params: CommentsPageRequestDTO;
}) {
  const [comments, setComments] = useState<ProductCommentItem[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const { data, loading, run } = useRequest(
    (pageNumber: number) =>
      fetchCommentsByPage(productId, {
        ...params,
        pageNumber
      }),
    {
      manual: true
    }
  );
  useEffect(() => {
    run().then((res) => {
      setComments(res?.data || []);
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
        <div className={styles.comment_list}>
          {comments.map((item) => (
            <div key={item.id} className={styles.comment_item}>
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
              {!!item.photos?.length && (
                <div
                  className={classNames(
                    styles.photos,
                    item.photos.length === 1 && styles.single
                  )}
                >
                  <Grid columns={4} gap={'0.8rem'}>
                    {item.photos.map((photo, index) => (
                      <LazyImage
                        key={photo}
                        src={photo}
                        alt={''}
                        onClick={() => {
                          previewImages(item.photos || [], index);
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
                    setComments((items) => {
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
