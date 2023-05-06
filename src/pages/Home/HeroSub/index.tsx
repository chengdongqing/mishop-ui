import { Channels, Promos } from './const.ts';
import styles from './index.module.less';

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
          href={item.href}
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
          key={item.src}
          href={item.href}
          target={'_blank'}
        >
          <img
            src={item.src}
            alt={item.description}
            title={item.description}
            className={styles.picture}
          />
        </a>
      ))}
    </div>
  );
}
