"use client";

import { useEffect, useState } from "react";
import { IAppImage } from "./interface/IImage";
import Image from "next/image";

export default function AppImage(props: IAppImage) {
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    props.src && (
      <Image
        {...props}
        className={`${props.className} ${imageError && "hidden"}`}
        onError={() => setImageError(true)}
      />
    )
  );
}
