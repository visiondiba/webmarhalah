import { useState } from "react";

type AutoImageProps = {
  src: string;
  alt?: string;
};

export default function ImageFrame({ src, alt }: AutoImageProps) {
  const [size, setSize] = useState({
    width: 0,
    height: 0
  });

  function handleLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;

    setSize({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
  }

  return (
    <img
      src={src}
      alt={alt}
      width={size.width}
      height={size.height}
      onLoad={handleLoad}
    />
  );
}