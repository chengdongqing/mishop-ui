import styles from './index.module.css';

export default function HomeBanner({ src, href }: Banner) {
  return (
    <a className={styles.container} href={href} target={'_blank'}>
      <img
        alt={''}
        src={src}
        className={styles.picture}
      />
    </a>
  );
}
