import { createFromIconfontCN } from '@ant-design/icons';
import AlipayCircle from './AlipayCircle.tsx';
import EyeClose from './EyeClose.tsx';
import EyeOpen from './EyeOpen.tsx';
import QQCircle from './QQCircle.tsx';
import WechatCircle from './WechatCircle.tsx';
import WeiboCircle from './WeiboCircle.tsx';

const Iconfont = createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/c/font_3838132_wlejf7v2m99.js'
});

export default Iconfont;

export { QQCircle, WechatCircle, WeiboCircle, AlipayCircle, EyeOpen, EyeClose };
