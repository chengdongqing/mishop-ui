import styles from './index.module.less';

export default function HomeBanner({ src, href, description }: Promo) {
  return (
    <a className={styles.container} href={href} target={'_blank'}>
      <img
        src={src}
        alt={description}
        title={description}
        className={styles.picture}
      />
    </a>
  );
}
