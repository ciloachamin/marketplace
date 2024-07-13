"use client"
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        // onAutoplayTimeLeft={onAutoplayTimeLeft}
        className=""
      >
        <SwiperSlide>
          <video
            autoPlay
            loop
            muted
            playsInline
            width="1920"
            height="680"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          >
            <source src={process.env.NEXT_PUBLIC_SERVER_URL + '/logos.webm'} type="video/webm" />
            Tu navegador no soporta el formato de vídeo.
          </video>
        </SwiperSlide>
        <SwiperSlide >
          <Link aria-label="Mas informacion del producto" href={process.env.NEXT_PUBLIC_SERVER_URL + '/user/665755a1726102b284a68cf2'}>
            <Image
              height={680}
              width={1920}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading='eager'
              src={process.env.NEXT_PUBLIC_SERVER_URL + '/Los-secos-del-gordo-banner.webp'}
              alt='Product image'
            />
          </Link>

        </SwiperSlide>
        <SwiperSlide>
          <Link aria-label="Mas informacion del producto" href={process.env.NEXT_PUBLIC_SERVER_URL + '/user/6657550f726102b284a68c5a'}>
            <Image
              height={680}
              width={1920}
              loading='eager'
              src={process.env.NEXT_PUBLIC_SERVER_URL + '/zaruma-london.webp'}
              alt='Product image'
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link aria-label="Mas informacion del producto" href={process.env.NEXT_PUBLIC_SERVER_URL + '/user/66576690726102b284a6921d'}>
            <Image
              height={680}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              width={1920}
              loading='eager'
              src={process.env.NEXT_PUBLIC_SERVER_URL + '/delta-med-banner.webp'}
              alt='Product image'
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            height={680}
            width={1920}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading='eager'
            src={process.env.NEXT_PUBLIC_SERVER_URL + '/fast-food-banner.webp'}
            unoptimized
            alt='Product image'
          />

        </SwiperSlide>
      </Swiper>
    </>
  );
}
