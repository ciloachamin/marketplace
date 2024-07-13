import React from 'react';
import { Product } from '@/payload-types'
import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import { PRODUCT_CATEGORIES } from '@/config'
import Image from 'next/image';


interface ProductListingProps {
    product: Product | null
    index: number
}

const Card = ({
    product,
    index,
}: ProductListingProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, index * 1)

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
        return (
            <Link
                className={cn(
                    'invisible h-full w-full  cursor-pointer group/main',
                    {
                        'visible animate-in fade-in-5': isVisible,
                    }
                )}
                href={`/product/${product.id}`}
                aria-label="Productos"
                >


                <div className="max-w-sm  h-full bg-secondary overflow-hidden shadow-lg">

                    <div className="h-4/6 relative max-sm:h-3/5">
                        <Image
                            fill
                            loading='eager'
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            src={validUrls[0]}
                            alt='Product image'
                            className="h-full w-full"
                        />
                        <div className="px-2  pb-1 absolute bottom-0 left-0  " >
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Precio: {formatPrice(product.price)}</span>
                        </div>
                    </div>

                    <div className="px-6 pt-4  max-sm:py-0 ">
                        <div className="font-bold text-xl mb-2">{product.name}</div>
                        <p className="text-secondary-foreground text-base overflow-y-auto h-16" tabIndex={0} role="region" aria-label="Scrollable content" >
                            {product.description}
                        </p>
                    </div>
                    <div className="px-6 pt-2 pb-2" >
                        {typeof product.user === 'object' && product.user !== null ? (
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">

                                Vendedor: {product.user.firstName} {product.user.lastName}
                            </span>
                        ) : (
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">No hay información del vendedor disponible.</span>
                        )}

                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{label}</span>
                    </div>
                </div>
            </Link>
        )
    }
}

const ProductPlaceholder = () => {
    return (
        <div className='max-w-sm  h-full bg-secondary overflow-hidden shadow-lg'>
            <Skeleton className='h-full w-full' />

        </div>
    )
}

export default Card;
