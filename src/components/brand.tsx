"use client";
import { useState } from "react";
import Image from "next/image";
import { brandAssets } from "@/lib/brand";
export function Brand() {
  const [failed, setFailed] = useState(false);
  const asset = brandAssets.wordmark;
  return asset && !failed ? (
    <Image
      src={asset.src}
      alt="BOTIX"
      width={asset.width}
      height={asset.height}
      className="brand-image"
      onError={() => setFailed(true)}
      unoptimized
    />
  ) : (
    <>
      BOTI<span className="brand-x">X</span>
    </>
  );
}
