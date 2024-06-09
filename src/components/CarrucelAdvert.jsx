"use client"

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './carrucelAdvert.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function App() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  // const onAutoplayTimeLeft = (s, time, progress) => {
  //   progressCircle.current.style.setProperty('--progress', 1 - progress);
  //   progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  // };
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
        <SwiperSlide >
          <Image
            height={680}
            width={1920}
            src={process.env.NEXT_PUBLIC_SERVER_URL + '/logos.gif'}
            loading='eager'
            unoptimized
            alt='Product image'
          /></SwiperSlide>
        {/* <SwiperSlide >
          <Image
            height={680}
            width={1920}
            src={process.env.NEXT_PUBLIC_SERVER_URL + '/thumbnail.jpg'}
            loading='eager'
            alt='Product image'
          /></SwiperSlide> */}
        <SwiperSlide >
          <Image
            height={680}
            width={1920}
            loading='eager'
            src={process.env.NEXT_PUBLIC_SERVER_URL + '/Los-secos-del-gordo-banner.png'}
            alt='Product image'
          /></SwiperSlide>
        <SwiperSlide>
          <Image
            height={680}
            width={1920}
            loading='eager'
            src={process.env.NEXT_PUBLIC_SERVER_URL + '/zaruma-london.png'}
            alt='Product image'
          /></SwiperSlide>
        <SwiperSlide>
          <Image
            height={680}
            width={1920}
            loading='eager'
            src={process.env.NEXT_PUBLIC_SERVER_URL + '/delta-med-banner.png'}
            alt='Product image'
          /></SwiperSlide>
        <SwiperSlide>
          <Link href={process.env.NEXT_PUBLIC_SERVER_URL + '/product/65fa26c72ff1b68aa13c187d'}>   <Image
            height={680}
            width={1920}
            loading='eager'
            src={process.env.NEXT_PUBLIC_SERVER_URL + '/gimnasio.gif'}
            unoptimized
            alt='Product image'
          />
          </Link>
        </SwiperSlide>
        {/* 
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div> */}
      </Swiper>
    </>
  );
}
