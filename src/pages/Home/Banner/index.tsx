import styles from './index.module.less';

export default function HomeBanner({
  src,
  href
}: {
  src: string;
  href: string;
}) {
  return (
    <a className={styles.container} href={href} target={'_blank'}>
      <img src={src} alt={''} className={styles.picture} />
    </a>
  );
}
