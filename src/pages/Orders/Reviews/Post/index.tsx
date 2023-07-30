import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import DataContainer from '@/components/DataContainer';
import Form from '@/components/Form';
import Rate from '@/components/Rate';
import Row from '@/components/Row';
import Space from '@/components/Space';
import Textarea from '@/components/Textarea';
import useRequest from '@/hooks/useRequest.ts';
import UserLayout from '@/layouts/UserLayout';
import { createOrderReview, createProductReview, fetchOrderReview } from '@/services/orderReview.ts';
import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.less';

export default function PostReviewPage() {
  const params = useParams<{
    orderId: string;
  }>();
  const orderId = Number(params.orderId);
  const {
    data: order,
    loading,
    run: refresh
  } = useRequest(() => fetchOrderReview(orderId));
  const { run: submitOrderReview, loading: orderSubmitting } = useRequest(
    createOrderReview,
    { manual: true }
  );
  const { run: submitProductReview, loading: productSubmitting } = useRequest(
    createProductReview,
    { manual: true }
  );

  return (
    <DataContainer loading={loading} empty={!order && '暂无数据'}>
      <UserLayout.Header
        title={
          <div
            style={{
              fontSize: '3.4rem',
              fontWeight: 'bold',
              margin: '2.8rem 0'
            }}
          >
            服务评价
          </div>
        }
      />
      <Form
        noStyle
        disabled={!!order?.packagingRating}
        initialValues={order?.packagingRating ? order : undefined}
        onOk={(values) => {
          submitOrderReview(orderId, values).then(refresh);
        }}
      >
        <Row className={styles.overall}>
          <div className={styles.scores}>
            <Form.Item name={'packagingRating'} className={styles.item}>
              <Rate prefix={'物流包装'} />
            </Form.Item>
            <Form.Item name={'speedRating'} className={styles.item}>
              <Rate prefix={'物流速度'} />
            </Form.Item>
            <Form.Item name={'serviceRating'} className={styles.item}>
              <Rate prefix={'客服服务'} />
            </Form.Item>
          </div>
          <ReviewGroup
            loading={orderSubmitting}
            textarea={
              <Textarea
                withPrefix
                placeholder={'还有想说的吗？您的意见对我们非常重要'}
              />
            }
          />
        </Row>
      </Form>
      {order?.items.map((item) => (
        <Form
          noStyle
          key={item.id}
          disabled={!!item.rating}
          initialValues={item.rating ? item : undefined}
          onOk={(values) => {
            submitProductReview(orderId, item.id, values).then(refresh);
          }}
        >
          <Row className={styles.product_item}>
            <div className={styles.product_info}>
              <img src={item.pictureUrl} alt={item.name} />
              <div className={styles.label}>{item.name}</div>
            </div>
            <div className={styles.content}>
              <Rating />
              <ReviewGroup
                loading={productSubmitting}
                textarea={
                  <Textarea
                    placeholder={
                      '外形如何？品质如何？写写你的感受分享给网友吧！\n' +
                      '为保障您的个人隐私，请将带有个人信息的数据打码上传，否则可能会影响您的评价展示呦~'
                    }
                    style={{ fontSize: '1.4rem', textIndent: 0 }}
                  />
                }
              />
            </div>
          </Row>
        </Form>
      ))}
    </DataContainer>
  );
}

const options: Record<number, string> = {
  1: '失望',
  2: '一般',
  3: '满意',
  4: '喜欢',
  5: '超爱'
};

function Rating() {
  return (
    <Form.Item name={'rating'} style={{ marginBottom: '1rem' }}>
      <Rate
        prefix={'评分'}
        suffix={(value) => {
          return <span className={styles.score_label}>{options[value]}</span>;
        }}
      />
    </Form.Item>
  );
}

function ReviewGroup({
                       textarea,
                       loading
                     }: {
  textarea: ReactNode;
  loading?: boolean;
}) {
  return (
    <div className={styles.content}>
      <Form.Item name={'content'}>{textarea}</Form.Item>
      <div className={styles.actions}>
        <Space size={'3rem'}>
          <Form.Item name={'isAnonymous'}>
            <Checkbox>匿名评价</Checkbox>
          </Form.Item>
          <Button
            outlined
            type={'submit'}
            loading={loading}
            className={styles.btn}
          >
            发表评价
          </Button>
        </Space>
      </div>
    </div>
  );
}
