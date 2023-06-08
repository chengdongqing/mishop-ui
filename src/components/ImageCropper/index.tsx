import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styles from './index.module.less';

export interface ImageCropperHandle {
  crop(): Promise<File | void>;
}

interface ImageCropperProps {
  file: File;
}

const ImageCropper = forwardRef<ImageCropperHandle, ImageCropperProps>(
  ({ file }, forwardedRef) => {
    const [src, setSrc] = useState<string>();
    useEffect(() => {
      const url = URL.createObjectURL(file);
      setSrc(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }, [file]);

    const maskCanvasRef = useRef<HTMLCanvasElement>(null);
    const cropBoxRef = useRef<HTMLDivElement>(null);
    const [cropBoxPosition, setCropBoxPosition] = useState({ x: 0, y: 0 });
    const [cropBoxSize, setCropBoxSize] = useState({ width: 200, height: 200 });

    useEffect(() => {
      if (cropBoxRef.current && src) {
        const containerRect =
          maskCanvasRef.current?.getBoundingClientRect() as DOMRect;
        const x = (containerRect.width - cropBoxSize.width) / 2;
        const y = (containerRect.height - cropBoxSize.height) / 2;
        setCropBoxPosition({ x, y });
      }
    }, [src]);

    useEffect(() => {
      if (!maskCanvasRef.current) return;
      const { width, height } = maskCanvasRef.current;

      const ctx = maskCanvasRef.current.getContext(
        '2d'
      ) as CanvasRenderingContext2D;
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0, 0, width, height);
      ctx.clearRect(
        cropBoxPosition.x,
        cropBoxPosition.y,
        cropBoxSize.width,
        cropBoxSize.height
      );

      return () => {
        ctx.clearRect(0, 0, width, height);
      };
    }, [cropBoxPosition, cropBoxSize]);

    const handleCropBoxDrag = (e: React.MouseEvent<HTMLDivElement>) => {
      let startX = e.clientX;
      let startY = e.clientY;
      const containerRect =
        maskCanvasRef.current?.getBoundingClientRect() as DOMRect;
      const boxRect = cropBoxRef.current?.getBoundingClientRect() as DOMRect;

      const handleMouseMove = (event: MouseEvent) => {
        const offsetX = event.clientX - startX;
        const offsetY = event.clientY - startY;

        setCropBoxPosition((prevPosition) => {
          let x = prevPosition.x + offsetX;
          let y = prevPosition.y + offsetY;
          if (x < 0 || x > containerRect.width - boxRect.width) {
            x = prevPosition.x;
          }
          if (y < 0 || y > containerRect.height - boxRect.height) {
            y = prevPosition.y;
          }
          return { x, y };
        });

        startX = event.clientX;
        startY = event.clientY;
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleResizeStart = (
      e: React.MouseEvent<HTMLSpanElement>,
      direction: string
    ) => {
      e.stopPropagation();
      const startX = e.clientX;
      const startY = e.clientY;
      const containerRect =
        maskCanvasRef.current?.getBoundingClientRect() as DOMRect;

      const handleMouseMove = (event: MouseEvent) => {
        const offsetX = event.clientX - startX;
        const offsetY = event.clientY - startY;

        const newSize = { ...cropBoxSize };
        const newPosition = { ...cropBoxPosition };

        if (direction.includes('e')) {
          newSize.width += offsetX;
        }
        if (direction.includes('w')) {
          newSize.width -= offsetX;
          newPosition.x += offsetX;
        }
        if (direction.includes('s')) {
          newSize.height += offsetY;
        }
        if (direction.includes('n')) {
          newSize.height -= offsetY;
          newPosition.y += offsetY;
        }

        if (newSize.width < 100 || newSize.height < 100) return;
        if (
          newSize.width + newPosition.x > containerRect.width ||
          newSize.height + newPosition.y > containerRect.height
        )
          return;

        setCropBoxSize(newSize);
        setCropBoxPosition(newPosition);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const imageRef = useRef<HTMLImageElement>(null);
    useImperativeHandle(forwardedRef, () => ({
      crop() {
        return new Promise((resolve) => {
          const canvas = document.createElement('canvas');
          canvas.width = cropBoxSize.width;
          canvas.height = cropBoxSize.height;
          const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
          ctx.drawImage(
            imageRef.current as HTMLImageElement,
            0,
            0,
            cropBoxSize.width,
            cropBoxSize.height,

          );
          canvas.toBlob((blob) => {
            if (blob) {
              const croppedFile = new File([blob], file.name, {
                type: blob.type
              });
              resolve(croppedFile);
            }
          }, 'image/jpeg');
        });
      }
    }));

    return (
      <div className={styles.crop_content}>
        <img ref={imageRef} src={src} alt={''} className={styles.background} />
        <canvas
          width={'360rem'}
          height={'360rem'}
          ref={maskCanvasRef}
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
                  handleResizeStart(e, direction);
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
                  handleResizeStart(e, direction);
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
