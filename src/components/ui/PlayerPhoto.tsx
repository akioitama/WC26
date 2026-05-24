"use client";

import { useState } from "react";
import { photoFor, portraitUrl } from "@/data/playerPhotos";

/**
 * PlayerPhoto — full-frame registered player photo from Wikimedia Commons
 * (or /public/players/ override). Returns null on missing / error.
 */
export function PlayerPhoto({
  name,
  alt,
  className,
  style,
  width = 480,
}: {
  name: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
}) {
  const config = photoFor(name);
  const [useRemote, setUseRemote] = useState(false);
  const [errored, setErrored] = useState(false);

  if (!config || errored) return null;

  const src = useRemote ? config.remoteUrl : portraitUrl(config);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? name}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (!useRemote) setUseRemote(true);
        else setErrored(true);
      }}
      className={className}
      style={style}
    />
  );
}

export function hasPlayerPhoto(name: string): boolean {
  return photoFor(name) !== undefined;
}
