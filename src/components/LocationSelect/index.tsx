import Grid from '@/components/Grid';
import popup from '@/components/Popup';
import { useMemo } from 'react';
import { Locations } from './const.ts';
import styles from './index.module.less';

function LocationSelect() {
  const locations = useMemo(() => {
    const locations1 = [];
    for (let i = 0; i < 7; i++) {
      locations1.push(...Locations);
    }
    return locations1;
  }, []);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>Welcome to Mi.com</div>
        <div className={styles.tips}>Please select location or language</div>
      </div>
      <Grid columns={5} gap={'2rem'} className={styles.links}>
        {locations.map((item, index) => (
          <a
            key={index}
            href={item.href}
            target={'_blank'}
            className={styles.link_item}
          >
            {item.label}
          </a>
        ))}
      </Grid>
    </>
  );
}

export default function openLocationSelect() {
  popup.open({
    footer: null,
    width: '84rem',
    title: 'Select location or language',
    content: <LocationSelect />
  });
}
