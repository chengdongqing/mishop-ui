import Grid from '@/components/Grid';
import Iconfont from '@/components/Iconfont';
import Popup from '@/components/Popup';
import Row from '@/components/Row';
import { RightCircleFilled } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { Videos } from './const.ts';
import styles from './index.module.less';

export default function HomeVideo() {
  return (
    <div className={styles.container}>
      <Row justify={'space-between'} align={'middle'} className={styles.header}>
        <div className={styles.title}>视频</div>
        <NavLink className={styles.more_link} to={'/videos'} target={'_blank'}>
          查看更多 <RightCircleFilled className={styles.icon} />
        </NavLink>
      </Row>

      <Grid columns={4} gap={'1.4rem'} className={styles.videos}>
        {Videos.slice(0, 4).map((item) => (
          <div className={styles.video_item} key={item.title}>
            <div
              className={styles.cover}
              onClick={() => {
                Popup.open({
                  title: item.title,
                  width: '88rem',
                  footer: null,
                  content: (
                    <div style={{ margin: '-2rem' }}>
                      <video
                        style={{ width: '100%' }}
                        src={item.playUrl}
                        autoPlay
                        controls
                      />
                    </div>
                  )
                });
              }}
            >
              <img
                alt={item.title}
                src={item.coverUrl}
                className={styles.picture}
              />
              <div className={styles.btn_play}>
                <Iconfont type={'i-play'} className={styles.icon} />
              </div>
            </div>
            <div className={styles.footer}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.description}>{item.description}</div>
            </div>
          </div>
        ))}
      </Grid>
    </div>
  );
}
