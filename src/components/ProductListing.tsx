'use client'

import { Product } from '@/payload-types'
import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import { PRODUCT_CATEGORIES } from '@/config'
import ImageSlider from './ImageSlider'

interface ProductListingProps {
  product: Product | null
  index: number
}

const ProductListing = ({
  product,
  index,
}: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!product || !isVisible) return <ProductPlaceholder />

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label

  const validUrls = product.images
    .map(({ image }) =>
      typeof image === 'string' ? image : image.url
    )
    .filter(Boolean) as string[]


  if (isVisible && product) {
    const isOutOfStock = product.stock === 0;
    return (
      <Link
        className={cn(
          'invisible h-full w-full cursor-pointer group/main',
          {
            'visible animate-in fade-in-5': isVisible,
          },
        )}
        href={`/product/${product.id}`}
      >
        
        <div className={`relative flex flex-col w-full `}>
          {isOutOfStock && (
              <div className="absolute  top-0 left-0 text-3xl max-sm:text-sm  text-red-500 font-bold z-10">
                AGOTADO
              </div>
          )}

          <ImageSlider urls={validUrls} />

          <h3 className='mt-4 font-medium text-sm '>
            {product.name}
          </h3>
          <p className='mt-1 text-sm text-gray-500'>
            {label}
          </p>
          {typeof product.user === 'object' && product.user !== null ? (
            <div className='mt-1 flex text-sm'>
              <p className='text-muted-foreground'>
                Vendedor: {product.user.firstName} {product.user.lastName}
              </p>
            </div>
          ) : (
            <p>No hay información del vendedor disponible.</p>
          )}
          <p className='mt-1 font-medium text-sm '>
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }
}

const ProductPlaceholder = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
        <Skeleton className='h-full w-full' />
      </div>
      <Skeleton className='mt-4 w-2/3 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-16 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-12 h-4 rounded-lg' />
    </div>
  )
}

export default ProductListing
