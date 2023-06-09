import { blobToFile } from '@/utils';
import React, { RefObject, useEffect, useState } from 'react';

export function useFileSrc(file: File) {
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setSrc(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return src;
}

export function useCropperInitial(
  src: string | undefined,
  imageCanvasRef: RefObject<HTMLCanvasElement>,
  containerRect: DOMRect | undefined,
  cropBoxSize: { width: number; height: number },
  setCropBoxPosition: (value: { x: number; y: number }) => void
) {
  useEffect(() => {
    if (!src || !containerRect) return;
    const { width, height } = containerRect;

    // 设置裁剪框位置
    const x = (containerRect.width - cropBoxSize.width) / 2;
    const y = (containerRect.height - cropBoxSize.height) / 2;
    setCropBoxPosition({ x, y });

    // 初始化图片画布渲染
    const ctx = imageCanvasRef.current?.getContext(
      '2d'
    ) as CanvasRenderingContext2D;
    const image = new Image();
    image.src = src;
    image.onload = () => {
      const dw = width;
      const dh = (image.height / image.width) * width;
      const dx = 0;
      const dy = (dw - dh) / 2;
      ctx.drawImage(image, dx, dy, dw, dh);
    };

    return () => {
      ctx.clearRect(0, 0, width, height);
    };
  }, [src, containerRect]);
}

export function useMaskDrawing(
  maskCanvasRef: RefObject<HTMLCanvasElement>,
  containerRect: DOMRect | undefined,
  cropBoxPosition: { x: number; y: number },
  cropBoxSize: { width: number; height: number }
) {
  useEffect(() => {
    if (!maskCanvasRef.current || !containerRect) return;
    const { width, height } = containerRect;

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
}

export function useCropBoxDrag(
  containerRect: DOMRect | undefined,
  cropBoxRef: RefObject<HTMLDivElement>,
  setCropBoxPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >
) {
  return (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRect) return;
    let startX = e.clientX;
    let startY = e.clientY;
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
}

export function useCropBoxResize(
  containerRect: DOMRect | undefined,
  cropBoxPosition: { x: number; y: number },
  cropBoxSize: { width: number; height: number },
  setCropBoxSize: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >,
  setCropBoxPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >
) {
  return (e: React.MouseEvent<HTMLSpanElement>, direction: string) => {
    e.stopPropagation();
    if (!containerRect) return;
    const startX = e.clientX;
    const startY = e.clientY;

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

      if (
        newSize.width < 100 ||
        newSize.height < 100 ||
        newPosition.x < 0 ||
        newPosition.y < 0 ||
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
}

export function useCropImage({
  filename,
  imageCanvasRef,
  cropBoxPosition,
  cropBoxSize
}: {
  filename: string;
  imageCanvasRef: RefObject<HTMLCanvasElement>;
  cropBoxPosition: { x: number; y: number };
  cropBoxSize: { width: number; height: number };
}): () => Promise<[File, string]> {
  return () => {
    return new Promise((resolve) => {
      // 创建新的离屏canvas截取旧canvas的指定区域并转为新的图片文件
      const canvas = document.createElement('canvas');
      canvas.width = cropBoxSize.width;
      canvas.height = cropBoxSize.height;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      ctx.drawImage(
        imageCanvasRef.current as HTMLCanvasElement,
        cropBoxPosition.x,
        cropBoxPosition.y,
        cropBoxSize.width,
        cropBoxSize.height,
        0,
        0,
        cropBoxSize.width,
        cropBoxSize.height
      );
      canvas.toBlob((blob) => {
        if (blob) {
          const croppedFile = blobToFile(blob, filename);
          resolve([croppedFile, canvas.toDataURL('image/png')]);
        }
      }, 'image/png');
    });
  };
}
