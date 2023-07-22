import Loading from '@/components/Loading';
import popup from '@/components/Popup';
import Space from '@/components/Space';
import useMount from '@/hooks/useMount.ts';
import { useState } from 'react';
import styles from './index.module.less';

const options = [
  {
    label: '小米商城用户协议',
    href: 'https://www.mi.com/article/detail/dd1be902730a.html'
  },
  {
    label: '小米商城隐私政策',
    href: 'https://m.mi.com/support/module?id=63&headless=1'
  },
  {
    label: '小米账号用户协议',
    href: 'https://account.xiaomi.com/about/protocol/agreement?_locale=zh_CN'
  },
  {
    label: '小米账号隐私政策',
    href: 'https://account.xiaomi.com/about/protocol/privacy?_locale=zh_CN'
  }
];

function AgreementsDeclaring() {
  const [loading, setLoading] = useState(true);
  const [href, setHref] = useState(options[2].href);

  useMount(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return loading ? (
    <Loading style={{ height: '10rem' }} />
  ) : (
    <div className={styles.container}>
      <div className={styles.header}>
        <Space split={'、'} size={0}>
          {options.map((item) => (
            <span
              key={item.label}
              className={styles.link}
              onClick={() => {
                setHref(item.href);
              }}
            >
              《{item.label}》
            </span>
          ))}
        </Space>
        请您仔细阅读以上协议，其中有对您权利义务的特别约定等重要条款，同意后方可使用本软件
      </div>
      <iframe src={href} className={styles.iframe} />
    </div>
  );
}

export default function openAgreementsDeclaring(onOk?: () => void) {
  popup.open({
    title: '协议声明',
    width: '80rem',
    content: <AgreementsDeclaring />,
    okText: '同意',
    cancelText: '不同意',
    closeOnOk: true,
    onOk
  });
}
