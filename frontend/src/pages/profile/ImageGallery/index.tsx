import React, { useRef } from 'react';

import styles from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: string[];
  onRemove?: (index: number) => void;
  onAddFiles?: (files: File[]) => void;
  multiple?: boolean;
  maxImages?: number;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onRemove,
  onAddFiles,
  multiple = true,
  maxImages,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && onAddFiles) {
      onAddFiles(Array.from(files));
    }
    // 同じファイルを連続で選択できるようにリセット
    e.target.value = '';
  };

  const isMaxReached = maxImages !== undefined && images.length >= maxImages;

  return (
    <div className={styles.gallery}>
      {/* 隠しファイルインプット */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple={multiple}
        style={{ display: 'none' }}
      />

      {/* 登録済み画像リスト */}
      {images.map((image, index) => (
        <div key={`${image}-${index}`} className={styles.imageCard}>
          <img src={image} alt={`Gallery ${index}`} className={styles.image} />
          {onRemove && (
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => onRemove(index)}
              aria-label="画像を削除"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      {/* 追加カード（上限に達していない場合のみ表示） */}
      {!isMaxReached && onAddFiles && (
        <button type="button" className={styles.addButton} onClick={handleAddClick}>
          <span className={styles.addIcon}>＋</span>
          <span className={styles.addText}>追加</span>
        </button>
      )}
    </div>
  );
};

export default ImageGallery;
