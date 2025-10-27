"use client";

import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// базовые стили
import "swiper/css";
import "swiper/css/pagination";

type Props = {
    images: string[];
    modalTarget: string;
    className?: string;
    onClick?: () => void;
    ariaLabel?: string;
};

const FALLBACK =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'>
      <defs><linearGradient id='g' x1='0' x2='1'>
        <stop stop-color='#0ea5e9' offset='0'/><stop stop-color='#a78bfa' offset='1'/>
      </linearGradient></defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
    </svg>`
    );

function CardMediaSwiper({ images, modalTarget, className, onClick, ariaLabel }: Props) {
    const slides = (images ?? []).filter(Boolean);
    const list = slides.length ? slides : [FALLBACK];

    return (
        <button
            type="button"
            aria-label={ariaLabel}
            className={`project-media btn-reset ${className ?? ""}`}
            onClick={onClick}
            data-bs-toggle="modal"
            data-bs-target={modalTarget}
        >
            <Swiper
                className="project-swiper"
                modules={[Autoplay, Pagination]}
                loop
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                style={{ width: "100%", height: "100%" }}   // <- гарантированная высота
            >
                {list.map((src) => (
                    <SwiperSlide key={src}>
                        <img
                            src={src}
                            alt=""
                            className="project-media-img"
                            onError={(e) => ((e.currentTarget as HTMLImageElement).src = FALLBACK)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </button>
    );
}

export default memo(CardMediaSwiper);
