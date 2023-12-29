"use client"

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

import type SwiperType from 'swiper'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './carrucel.css'


import { TQueryValidator } from '@/lib/validators/query-validator'
import { Product } from '@/payload-types'
import { trpc } from '@/trpc/client'
import Link from 'next/link'
import ProductListing from './ProductListing'
import Card from './Cards'


interface ProductReelProps {
  title: string
  subtitle?: string
  href?: string
  query: TQueryValidator
}

const FALLBACK_LIMIT = 6

const ImageSlider = (props: ProductReelProps) => {
  const { title, subtitle, href, query } = props
  const { data: queryResults, isLoading } =
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    )

  const products = queryResults?.pages.flatMap(
    (page) => page.items
  )

  let map: (Product | null)[] = []
  if (products && products.length) {
    map = products
  } else if (isLoading) {
    map = new Array<null>(
      query.limit ?? FALLBACK_LIMIT
    ).fill(null)
  }

  console.log('map', map)



  return (
    <div id="container-carrucel">
      <h1 id="heading-carrucel">{title}</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',

        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay,EffectCoverflow, Pagination, Navigation]}
        id="swiper_container-carrucel"

      >

        {map.map((product, i) => (
          <SwiperSlide
            key={i}
            id='swiper-slide-carrucel'
          >
            <Card
              key={`product-${i}`}
              product={product}
              index={i}

            />
          </SwiperSlide>
        ))}
        <div id="slider-controler-carrucel">
          <div className="swiper-pagination"></div>
          <div className="swiper-button-prev slider-arrow-carrucel"></div>
          <div className="swiper-button-next slider-arrow-carrucel"></div>
        </div>


      </Swiper>

    </div>
  )
}

export default ImageSlider
