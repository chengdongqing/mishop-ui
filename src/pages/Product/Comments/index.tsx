import Checkbox from '@/components/Checkbox';
import Grid from '@/components/Grid';
import Loading from '@/components/Loading';
import Row from '@/components/Row';
import Space from '@/components/Space';
import useIsElementVisible from '@/hooks/useIsElementVisible.ts';
import { comments } from '@/pages/Product/Comments/const.ts';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import FilterBar from './FilterBar';
import styles from './index.module.less';
import SatisfactionCard from './SatisfactionCard';

export default function ProductCommentsPage() {
  const [category, setCategory] = useState(-1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [category]);

  const containerRef = useRef<HTMLDivElement>(null);
  const btnVisible = useIsElementVisible({
    elementRef: containerRef,
    predicate() {
      return window.scrollY > 100;
    }
  });

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className={styles.container}>
        <FilterBar onChange={setCategory} />

        {loading ? (
          <Loading style={{ height: '30vh' }} />
        ) : (
          <Row style={{ marginTop: '3rem' }} wrap={false}>
            <CommentList />
            <SatisfactionCard />

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
        )}
      </div>
    </div>
  );
}

function CommentList() {
  const [withPhotosOnly, setWithPhotosOnly] = useState(false);

  return (
    <div className={styles.body}>
      <Row justify={'space-between'} align={'middle'} className={styles.header}>
        <div className={styles.title}>热门评价</div>
        <Checkbox checked={withPhotosOnly} onChange={setWithPhotosOnly}>
          只显示带图评价
        </Checkbox>
      </Row>

      <div className={styles.comment_list}>
        {comments.map((item) => (
          <div key={item.user.name} className={styles.comment_item}>
            <Row justify={'space-between'} align={'middle'}>
              <Space size={'1.8rem'} className={styles.user_info}>
                <img
                  alt={item.user.name}
                  src={item.user.avatar}
                  className={styles.avatar}
                />
                <div>
                  <div className={styles.name}>{item.user.name}</div>
                  <div className={styles.date}>{item.date}</div>
                </div>
              </Space>
              超爱
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
                  {item.photos.map((item) => (
                    <img
                      key={item}
                      src={
                        'https://i1.mifile.cn/a2/1683647469_2378684_s1504_2006wh.jpg'
                      }
                      alt={''}
                    />
                  ))}
                </Grid>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
