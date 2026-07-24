import { useState } from 'react';

import styles from './Gallery.module.css';

interface GalleryProps {
  images: string[];
}

const Gallery = ({ images }: GalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <div className={styles.mainImg}>
        <img src={images[currentIndex]} alt="main image" />

        <div
          className={`${styles.arrow} ${styles.left}`}
          onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
        >
          ‹
        </div>

        <div
          className={`${styles.arrow} ${styles.right}`}
          onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        >
          ›
        </div>
      </div>

      <div className={styles.subImg}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className={i === currentIndex ? styles.activeThumb : ''}
            onClick={() => setCurrentIndex(i)}
            alt="thumb"
          />
        ))}
      </div>
    </>
  );
};

export default Gallery;
