import Button from '@/components/Button';
import Grid from '@/components/Grid';
import ImageCropper, { ImageCropperRef } from '@/components/ImageCropper';
import popup from '@/components/Popup';
import toast from '@/components/Toast';
import { checkFileFormat } from '@/utils';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import styles from './index.module.css';

function AvatarCopper({ onChange }: { onChange(value: string): void }) {
  const [file, setFile] = useState<File>();
  const copperRef = useRef<ImageCropperRef>(null);

  return (
    <div className={styles.container}>
      <div className={styles.title}>设置头像</div>

      {file ? (
        <div>
          <ImageCropper ref={copperRef} file={file} />
          <Grid columns={2} gap={'2rem'} className={styles.actions}>
            <Button
              gray
              className={classNames(styles.btn, styles.gray)}
              onClick={() => {
                setFile(undefined);
              }}
            >
              重新上传
            </Button>
            <Button
              className={styles.btn}
              onClick={() => {
                copperRef.current?.crop().then(([file, dataUrl]) => {
                  console.log(file);
                  onChange(dataUrl);
                });
              }}
            >
              确定
            </Button>
          </Grid>
        </div>
      ) : (
        <div className={styles.upload_content}>
          <label>
            <input
              type={'file'}
              accept={'image/*'}
              className={styles.file_input}
              onChange={(e) => {
                const newFile = e.target.files?.[0];
                if (
                  !newFile ||
                  !checkFileFormat(newFile.name, ['jpg', 'png', 'jpeg'])
                ) {
                  toast.warning('图片格式不符合要求！');
                } else if (newFile.size > 1024 * 1024 * 10) {
                  toast.warning('图片大小不能超过10MB！');
                } else {
                  setFile(newFile);
                }
              }}
            />
            <Button className={styles.btn}>上传头像</Button>
          </label>
          <div className={styles.tips}>
            图片格式jpg、png、jpeg，大小不超过10MB
          </div>
        </div>
      )}
    </div>
  );
}

export default function toCropImage(onChange: (value: string) => void) {
  const close = popup.open({
    width: '45rem',
    footer: null,
    content: (
      <AvatarCopper
        onChange={(value) => {
          onChange(value);
          close();
        }}
      />
    )
  });
}
