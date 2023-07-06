import Breadcrumb from '@/components/Breadcrumb';
import DataContainer from '@/components/DataContainer';
import Grid from '@/components/Grid';
import Iconfont from '@/components/Iconfont';
import LazyImage from '@/components/LazyImage';
import Popup from '@/components/Popup';
import useRequest from '@/hooks/useRequest.ts';
import { fetchVideos } from '@/services/video.ts';
import classNames from 'classnames';
import styles from './index.module.less';

export default function VideosPage() {
  const { data, loading } = useRequest(fetchVideos, {
    initialData: []
  });

  return (
    <>
      <Breadcrumb value={'视频列表'} />
      <div style={{ backgroundColor: 'var(--color-background)' }}>
        <div className={styles.container}>
          <div className={styles.title_bar}>全部视频</div>

          <DataContainer loading={loading} empty={!data?.length && '暂无视频数据'}>
            <Grid columns={2} gap={'1.4rem'} className={styles.videos}>
              {data?.map((item) => (
                <VideoCard key={item.id} {...item} large />
              ))}
            </Grid>
          </DataContainer>
        </div>
      </div>
    </>
  );
}

export function VideoCard(props: Video & { large?: boolean }) {
  return (
    <div
      className={classNames(styles.video_item, !!props.large && styles.large)}
    >
      <div
        className={styles.cover}
        onClick={() => {
          Popup.open({
            title: props.name,
            width: '88rem',
            footer: null,
            content: (
              <div style={{ margin: '-2rem' }}>
                <video src={props.videoUrl} width={'100%'} autoPlay controls />
              </div>
            )
          });
        }}
      >
        <LazyImage
          draggable={false}
          alt={props.name}
          src={props.coverUrl}
          className={styles.picture}
        />
        <div className={styles.btn_play}>
          <Iconfont type={'i-play'} className={styles.icon} />
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.title}>{props.name}</div>
        <div className={styles.description}>{props.description}</div>
      </div>
    </div>
  );
}
