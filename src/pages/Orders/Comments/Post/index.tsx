import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Form from '@/components/Form';
import Rate from '@/components/Rate';
import Row from '@/components/Row';
import Space from '@/components/Space';
import Textarea from '@/components/Textarea';
import toast from '@/components/Toast';
import useSetState from '@/hooks/useSetState.ts';
import UserLayout from '@/layouts/UserLayout';
import { orders } from '@/pages/Orders/Orders/const.ts';
import { ReactNode, useState } from 'react';
import styles from './index.module.less';

export default function PostCommentPage() {
  const order = orders[0];
  const [data, setData] = useSetState();
  const [loading, setLoading] = useState<string>();

  function post(key: string, values: unknown) {
    setLoading(key);
    setTimeout(() => {
      setLoading(undefined);
      toast.success('提交成功');
      setData({
        [key]: values
      });
    }, 1000);
  }

  return (
    <>
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
        disabled={!!data.overall}
        onOk={(values) => {
          post('overall', values);
        }}
      >
        <Row className={styles.overall}>
          <div className={styles.scores}>
            <Form.Item name={'wrapper-score'} className={styles.item}>
              <Rate prefix={'物流包装'} />
            </Form.Item>
            <Form.Item name={'speed-score'} className={styles.item}>
              <Rate prefix={'物流速度'} />
            </Form.Item>
            <Form.Item name={'service-score'} className={styles.item}>
              <Rate prefix={'客服服务'} />
            </Form.Item>
          </div>
          <CommentGroup
            loading={loading === 'overall'}
            textarea={
              <Textarea placeholder={'还有想说的吗？您的意见对我们非常重要'} />
            }
          />
        </Row>
      </Form>
      {order.products.map((item) => (
        <Form
          noStyle
          key={item.label}
          disabled={!!data[item.label]}
          onOk={(values) => {
            post(item.label, values);
          }}
        >
          <Row className={styles.product_item}>
            <div className={styles.product_info}>
              <img src={item.pictureUrl} alt={item.label} />
              <div className={styles.label}>{item.label}</div>
            </div>
            <div className={styles.content}>
              <Score />
              <CommentGroup
                loading={loading === item.label}
                textarea={
                  <Textarea
                    placeholder={
                      '外形如何？品质如何？写写你的感受分享给网友吧！\n' +
                      '为保障您的个人隐私，请将带有个人信息的数据打码上传，否则可能会影响您的评价展示呦~'
                    }
                    noPrefix
                    style={{ fontSize: '1.4rem', textIndent: 0 }}
                  />
                }
              />
            </div>
          </Row>
        </Form>
      ))}
    </>
  );
}

const options: Record<number, string> = {
  1: '失望',
  2: '一般',
  3: '满意',
  4: '喜欢',
  5: '超爱'
};

function Score() {
  return (
    <Form.Item name={'score'} style={{ marginBottom: '1rem' }}>
      <Rate
        prefix={'评分'}
        suffix={(value) => {
          return <span className={styles.score_label}>{options[value]}</span>;
        }}
      />
    </Form.Item>
  );
}

function CommentGroup({
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
          <Form.Item name={'anonymous'}>
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
