"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type Props = {
  images: string[];
  ariaLabel: string;
  onClick: () => void;
  className?: string;
  modalTarget?: string; // legacy (bootstrap). теперь не нужен, но пусть будет optional чтобы не ломать вызовы
};

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'>
      <defs><linearGradient id='g' x1='0' x2='1'>
        <stop stop-color='#0ea5e9' offset='0'/><stop stop-color='#a78bfa' offset='1'/>
      </linearGradient></defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
            fill='white' opacity='0.85' font-family='system-ui,ui-sans-serif'
            font-size='48'>Preview</text>
    </svg>`
  );

export default function CardMediaSwiper({
  images,
  ariaLabel,
  onClick,
  className,
}: Props) {
  const slides = useMemo(() => (images?.length ? images : [FALLBACK]), [images]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      className={className}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      style={{ cursor: "pointer" }}
    >
      <Swiper
        modules={[Pagination, Keyboard]}
        pagination={{ clickable: true }}
        keyboard={{ enabled: true, onlyInViewport: true, pageUpDown: false }}
        style={{ width: "100%", height: "100%" }}
      >
        {slides.map((src) => (
          <SwiperSlide key={src}>
            <div style={{ position: "relative", width: "100%", height: "220px" }}>
              <Image
                src={src}
                alt=""
                fill
                style={{ objectFit: "cover", display: "block" }}
                onError={(e) => ((e.currentTarget as HTMLImageElement).src = FALLBACK)}
                unoptimized={src.startsWith("data:")}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
