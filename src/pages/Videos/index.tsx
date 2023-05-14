import Breadcrumb from '@/components/Breadcrumb';
import Grid from '@/components/Grid';
import Iconfont from '@/components/Iconfont';
import Popup from '@/components/Popup';
import { Videos } from '@/pages/Videos/const.ts';
import classNames from 'classnames';
import styles from './index.module.less';

export interface VideoProps {
  // 标题
  title: string;
  // 视频播放地址
  playUrl: string;
  // 封面图片地址
  coverUrl: string;
  // 视频描述信息
  description?: string;
}

export default function VideosPage() {
  return (
    <>
      <Breadcrumb value={'视频列表'} />
      <div style={{ backgroundColor: 'var(--color-background)' }}>
        <div className={styles.container}>
          <div className={styles.title_bar}>全部视频</div>

          <Grid columns={2} gap={'1.4rem'} className={styles.videos}>
            {Videos.map((item) => (
              <VideoCard key={item.title} {...item} large />
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}

export function VideoCard(props: VideoProps & { large?: boolean }) {
  return (
    <div
      className={classNames(styles.video_item, !!props.large && styles.large)}
    >
      <div
        className={styles.cover}
        onClick={() => {
          Popup.open({
            title: props.title,
            width: '88rem',
            footer: null,
            content: (
              <div style={{ margin: '-2rem' }}>
                <video src={props.playUrl} width={'100%'} autoPlay controls />
              </div>
            )
          });
        }}
      >
        <img
          draggable={false}
          alt={props.title}
          src={props.coverUrl}
          className={styles.picture}
        />
        <div className={styles.btn_play}>
          <Iconfont type={'i-play'} className={styles.icon} />
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.description}>{props.description}</div>
      </div>
    </div>
  );
}
