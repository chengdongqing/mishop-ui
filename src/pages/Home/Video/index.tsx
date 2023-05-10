import Grid from '@/components/Grid';
import Row from '@/components/Row';
import { VideoCard } from '@/pages/Videos';
import { Videos } from '@/pages/Videos/const.ts';
import { RightCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

export default function HomeVideo() {
  return (
    <div className={styles.container}>
      <Row justify={'space-between'} align={'middle'} className={styles.header}>
        <div className={styles.title}>视频</div>
        <Link className={styles.more_link} to={'/videos'} target={'_blank'}>
          查看更多 <RightCircleFilled className={styles.icon} />
        </Link>
      </Row>

      <Grid columns={4} gap={'1.4rem'} className={styles.videos}>
        {Videos.slice(0, 4).map((item) => (
          <VideoCard key={item.title} {...item} />
        ))}
      </Grid>
    </div>
  );
}
