import LogoIcon from '@/assets/logo.png';
import Space from '@/components/Space';
import { Certificates, Links } from './const.ts';
import styles from './index.module.less';

export default function BottomBar() {
  return (
    <div style={{ backgroundColor: '#fafafa' }}>
      <div className={styles.container}>
        <div className={styles.main}>
          <img src={LogoIcon} alt={'logo'} className={styles.logo} />
          <div>
            <div>
              <Space
                split={<span style={{ color: '#b0b0b0' }}>|</span>}
                size={'0.4rem'}
              >
                {Links[0].map((item) => (
                  <a key={item} className={styles.link_item}>
                    {item}
                  </a>
                ))}
              </Space>
            </div>
            <div>
              <Space
                split={<span style={{ color: '#b0b0b0' }}>|</span>}
                size={'0.4rem'}
              >
                {Links[1].map((item) => (
                  <a key={item} className={styles.link_item}>
                    {item}
                  </a>
                ))}
              </Space>
            </div>
            <p className={styles.secondary}>
              © mi.com 京ICP证110507号 京ICP备10046444号
              京公网安备11010802020134号 京网文[2023]0169-004号
              <br />
              （京）网械平台备字（2018）第00005号 互联网药品信息服务资格证
              (京)-非经营性-2014-0090 营业执照 医疗器械质量公告
              <br />
              增值电信业务许可证 网络食品经营备案 京食药网食备202010048
              食品经营许可证 <br />
              违法和不良信息举报电话：171-5104-4404 知识产权侵权投诉
              本网站所列数据，除特殊说明，所有数据均出自我司实验室测试
            </p>
            <Space size={'0.4rem'} className={styles.certificates}>
              {Certificates.map((item) => (
                <a
                  className={styles.certificate_item}
                  href={item.href}
                  target={'_blank'}
                  rel={'nofollow'}
                  key={item.src}
                >
                  <img src={item.src} alt={item.alt} className={styles.icon} />
                </a>
              ))}
            </Space>
          </div>
        </div>
        <div className={styles.slogan} />
      </div>
    </div>
  );
}
