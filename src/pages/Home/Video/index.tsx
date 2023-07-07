import Grid from '@/components/Grid';
import Row from '@/components/Row';
import useRequest from '@/hooks/useRequest.ts';
import { VideoCard } from '@/pages/Videos';
import { fetchVideos } from '@/services/video.ts';
import { RightCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

export default function HomeVideo() {
  const { data } = useRequest(fetchVideos, {
    initialData: [],
    defaultParams: [4]
  });

  return (
    !!data?.length &&
    <div className={styles.container}>
      <Row justify={'space-between'} align={'middle'} className={styles.header}>
        <div className={styles.title}>视频</div>
        <Link className={styles.more_link} to={'/videos'} target={'_blank'}>
          查看更多 <RightCircleFilled className={styles.icon} />
        </Link>
      </Row>

      <Grid columns={4} gap={'1.4rem'} className={styles.videos}>
        {data?.map((item) => (
          <VideoCard key={item.id} {...item} />
        ))}
      </Grid>
    </div>
  );
}
