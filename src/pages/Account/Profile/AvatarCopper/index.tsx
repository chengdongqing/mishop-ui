import Button from '@/components/Button';
import Grid from '@/components/Grid';
import ImageCropper, { ImageCropperHandle } from '@/components/ImageCropper';
import popup from '@/components/Popup';
import toast from '@/components/Toast';
import { checkFileFormat } from '@/utils';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import styles from './index.module.less';

export default function AvatarCopper() {
  const [file, setFile] = useState<File>();
  const copperRef = useRef<ImageCropperHandle>(null);

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
                copperRef.current?.crop().then((res) => {
                  const src = URL.createObjectURL(res as File);

                  popup.open({
                    width: '36rem',
                    content: <img src={src} style={{ width: '36rem' }} />
                  });
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
                  newFile &&
                  checkFileFormat(newFile.name, ['jpg', 'png', 'jpeg'])
                ) {
                  setFile(newFile);
                } else {
                  toast.warning('图片格式不符合要求！');
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
