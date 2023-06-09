import useElementRect from '@/hooks/useElementRect.ts';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
  useCropBoxDrag,
  useCropBoxResize,
  useCropImage,
  useCropperInitial,
  useFileSrc,
  useMaskDrawing
} from './helpers.ts';
import styles from './index.module.less';

export interface ImageCropperHandle {
  crop(): Promise<[File, string]>;
}

interface ImageCropperProps {
  file: File;
}

const ImageCropper = forwardRef<ImageCropperHandle, ImageCropperProps>(
  ({ file }, forwardedRef) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageCanvasRef = useRef<HTMLCanvasElement>(null);
    const maskCanvasRef = useRef<HTMLCanvasElement>(null);
    const cropBoxRef = useRef<HTMLDivElement>(null);

    const [cropBoxPosition, setCropBoxPosition] = useState({ x: 0, y: 0 });
    const [cropBoxSize, setCropBoxSize] = useState({ width: 200, height: 200 });
    const [containerRect] = useElementRect(containerRef);
    const src = useFileSrc(file);

    useCropperInitial(
      src,
      imageCanvasRef,
      containerRect,
      cropBoxSize,
      setCropBoxPosition
    );
    useMaskDrawing(maskCanvasRef, containerRect, cropBoxPosition, cropBoxSize);

    const handleCropBoxDrag = useCropBoxDrag(
      containerRect,
      cropBoxRef,
      setCropBoxPosition
    );
    const handleDropBoxResize = useCropBoxResize(
      containerRect,
      cropBoxPosition,
      cropBoxSize,
      setCropBoxSize,
      setCropBoxPosition
    );

    const crop = useCropImage({
      filename: file.name,
      imageCanvasRef,
      cropBoxSize,
      cropBoxPosition
    });
    useImperativeHandle(forwardedRef, () => ({
      crop
    }));

    return (
      <div ref={containerRef} className={styles.crop_content}>
        <canvas
          ref={imageCanvasRef}
          width={containerRect?.width}
          height={containerRect?.height}
          style={{ width: '100%', height: '100%' }}
        />
        <canvas
          ref={maskCanvasRef}
          width={containerRect?.width}
          height={containerRect?.height}
          className={styles.mask}
        />

        <div
          ref={cropBoxRef}
          className={styles.crop_box}
          style={{
            ...cropBoxSize,
            transform: `translate3d(${cropBoxPosition.x}px, ${cropBoxPosition.y}px, 0)`
          }}
          onMouseDown={handleCropBoxDrag}
        >
          <div className={styles.grid}>
            <div className={styles.grid_h} />
            <div className={styles.grid_v} />
          </div>
          <div className={styles.borders}>
            {['e', 's', 'w', 'n'].map((direction) => (
              <span
                key={direction}
                className={styles.border_item}
                onMouseDown={(e) => {
                  handleDropBoxResize(e, direction);
                }}
              />
            ))}
          </div>
          <div className={styles.points}>
            {['ne', 'e', 'se', 's', 'sw', 'w', 'nw', 'n'].map((direction) => (
              <span
                key={direction}
                className={styles.point_item}
                onMouseDown={(e) => {
                  handleDropBoxResize(e, direction);
                }}
              />
            ))}
          </div>
          <div className={styles.center_point} />
        </div>
      </div>
    );
  }
);

export default ImageCropper;
