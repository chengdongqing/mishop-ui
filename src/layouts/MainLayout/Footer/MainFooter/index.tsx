import Iconfont from '@/components/Iconfont';
import Space from '@/components/Space';
import { Links, Services } from './const.ts';
import styles from './index.module.less';

export default function MainFooter() {
  return (
    <div className={styles.container}>
      <ServiceBar />
      <LinksBlock />
    </div>
  );
}

function ServiceBar() {
  return (
    <div className={styles.service_bar}>
      {Services.map((item) => (
        <a
          key={item.label}
          className={styles.service_item}
          href={item.href}
          target={'_blank'}
          rel={'nofollow'}
        >
          <Space size={'0.6rem'}>
            <Iconfont type={item.icon} className={styles.icon} />
            <span className={styles.label}>{item.label}</span>
          </Space>
        </a>
      ))}
    </div>
  );
}

function LinksBlock() {
  return (
    <div className={styles.links_block}>
      <div className={styles.main_wrapper}>
        {Links.map((item) => (
          <div className={styles.links_column} key={item.label}>
            <div className={styles.title}>{item.label}</div>
            <div className={styles.list}>
              {item.children.map((item) => (
                <a
                  key={item.label}
                  className={styles.link_item}
                  href={item.href}
                  target={'_blank'}
                  rel={'nofollow'}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.contact_wrapper}>
        <div className={styles.box}>
          <a className={styles.telephone} href={'tel:400-100-5678'}>
            400-100-5678
          </a>
          <div className={styles.remark}>8:00-18:00（仅收市话费）</div>
          <div
            className={styles.btn_primary}
            onClick={() => {
              window.open('https://mi.com', '', 'width=495px,height=789px');
            }}
          >
            <Iconfont type={'i-message'} className={styles.icon} />
            人工客服
          </div>
        </div>
      </div>
    </div>
  );
}
