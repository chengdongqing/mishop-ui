import styles from './index.module.less';
import { Channels, Promos } from './const.ts';

export default function HomeHeroSub() {
  return (
    <div className={styles.container}>
      <ChannelBox />
      <PromoCards />
    </div>
  );
}

function ChannelBox() {
  return (
    <div className={styles.channel_box}>
      {Channels.map((item) => (
        <a
          className={styles.channel_item}
          key={item.label}
          href={item.linkUrl}
          target={'_blank'}
        >
          <img src={item.iconUrl} alt={item.label} className={styles.icon} />
          <span className={styles.label}>{item.label}</span>
        </a>
      ))}
    </div>
  );
}

function PromoCards() {
  return (
    <div className={styles.promo_cards}>
      {Promos.map((item) => (
        <a
          className={styles.promo_item}
          key={item.pictureUrl}
          href={item.linkUrl}
          target={'_blank'}
        >
          <img src={item.pictureUrl} alt={''} className={styles.picture} />
        </a>
      ))}
    </div>
  );
}
