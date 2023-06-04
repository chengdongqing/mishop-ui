import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Form from '@/components/Form';
import Rate from '@/components/Rate';
import Row from '@/components/Row';
import Space from '@/components/Space';
import UserLayout from '@/layouts/UserLayout';
import styles from './index.module.less';

export default function PostCommentPage() {
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
      <Form noStyle onChange={console.log}>
        <Row className={styles.overall}>
          <div className={styles.scores}>
            <Form.Item name={'wrapperStars'} className={styles.item}>
              <Rate prefix={'物流包装'} />
            </Form.Item>
            <Form.Item name={'speedStars'} className={styles.item}>
              <Rate prefix={'物流速度'} />
            </Form.Item>
            <Form.Item name={'serviceStars'} className={styles.item}>
              <Rate prefix={'客服服务'} />
            </Form.Item>
          </div>
          <div className={styles.content}>
            <textarea />
            <Space>
              <Checkbox>匿名评价</Checkbox>
              <Button outlined>发表评价</Button>
            </Space>
          </div>
        </Row>
      </Form>
    </>
  );
}
