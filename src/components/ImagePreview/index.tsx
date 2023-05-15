import Iconfont from '@/components/Iconfont';
import Space from '@/components/Space';
import useSetState, { PatchStateAction } from '@/hooks/useSetState.ts';
import { downloadFile } from '@/utils';
import {
  DownloadOutlined,
  LeftOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  RightOutlined,
  RotateLeftOutlined,
  RotateRightOutlined
} from '@ant-design/icons';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import styles from './index.module.less';

interface ImagePreviewProps {
  // 图片源地址
  urls: string[];
  // 默认选中的图片索引
  index?: number;
  // 关闭事件
  onClose: () => void;
}

function ImagePreview({ urls = [], index = 0, onClose }: ImagePreviewProps) {
  const [current, setCurrent] = useState(index);
  const [transform, setTransform] = useSetState({
    scale: 1,
    rotate: 0
  });
  const isFirst = useMemo(() => current === 0, [current]);
  const isLast = useMemo(() => {
    return current === urls.length - 1;
  }, [current, urls.length]);

  useEffect(() => {
    setCurrent(index);
  }, [urls, index]);

  return (
    <div className={styles.container}>
      <div className={styles.btn_close} onClick={onClose}>
        <Iconfont type={'i-close'} />
      </div>

      <div className={styles.image_wrapper}>
        <img
          src={urls[current]}
          alt={''}
          style={{
            transform: `scale(${transform.scale}) rotate(${transform.rotate}deg)`
          }}
        />
      </div>

      <div
        className={classNames(
          styles.btn_switch,
          styles.left,
          isFirst && styles.disabled
        )}
        title={isFirst ? '已是第一张' : ''}
        onClick={() => {
          if (!isFirst) {
            setCurrent(current - 1);
          }
        }}
      >
        <LeftOutlined />
      </div>
      <div
        className={classNames(
          styles.btn_switch,
          styles.right,
          isLast && styles.disabled
        )}
        title={isLast ? '已是最后一张' : ''}
        onClick={() => {
          if (!isLast) {
            setCurrent(current + 1);
          }
        }}
      >
        <RightOutlined />
      </div>

      <FooterBar src={urls[current]} onChange={setTransform} />
    </div>
  );
}

function FooterBar({
  src,
  onChange
}: {
  src: string;
  onChange: (patch: PatchStateAction<number>) => void;
}) {
  return (
    <div className={styles.footer}>
      <Space split={'|'} size={'3rem'}>
        <Space size={'2rem'}>
          <MinusCircleOutlined
            title={'缩小图片'}
            onClick={() => {
              onChange((value) => ({
                scale: value.scale - 0.3
              }));
            }}
          />
          <PlusCircleOutlined
            title={'放大图片'}
            onClick={() => {
              onChange((value) => ({
                scale: value.scale + 0.3
              }));
            }}
          />
        </Space>
        <DownloadOutlined
          title={'下载到本地'}
          onClick={() => {
            downloadFile(src, '');
          }}
        />
        <Space size={'2rem'}>
          <RotateLeftOutlined
            title={'向左旋转'}
            onClick={() => {
              onChange((value) => ({
                rotate: value.rotate + 90
              }));
            }}
          />
          <RotateRightOutlined
            title={'向右旋转'}
            onClick={() => {
              onChange((value) => ({
                rotate: value.rotate - 90
              }));
            }}
          />
        </Space>
      </Space>
    </div>
  );
}

let popup: Root | undefined;
export default function previewImages(urls: string[], index?: number) {
  popup?.unmount();
  popup = createRoot(document.getElementById('popup') as HTMLElement);
  popup.render(
    <ImagePreview
      urls={urls}
      index={index}
      onClose={() => {
        popup?.unmount();
      }}
    />
  );
}

export function previewImage(url: string) {
  previewImages([url]);
}
