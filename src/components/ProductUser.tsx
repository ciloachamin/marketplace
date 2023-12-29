'use client'
import React, { useState } from 'react';
import { TQueryValidator } from '@/lib/validators/query-validator'
import { Product } from '@/payload-types'
import { trpc } from '@/trpc/client'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'


interface ProductReelProps {
    title: string
    subtitle?: string
    href?: string
    userId: string
    query: TQueryValidator
}

const FALLBACK_LIMIT = 5

const ProductReel = (props: ProductReelProps) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { title, subtitle, href, query, userId } = props
    const { data: queryResults, isLoading } =
        trpc.getProductUserId.useInfiniteQuery(
            {
                limit: query.limit ?? FALLBACK_LIMIT,
                query,
                userId,
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

    return (
        <section className='py-12'>
            <div className='md:flex md:items-center md:justify-between mb-4'>
                <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
                    {title ? (
                        <h1 className='text-2xl font-bold text-secondary-foreground sm:text-3xl'>
                            {title}
                        </h1>
                    ) : null}
                    {subtitle ? (
                        <p className='mt-2 text-sm text-muted-foreground'>
                            {subtitle}
                        </p>
                    ) : null}

                </div>

                {href ? (
                    <Link
                        href={href}
                        className='hidden text-sm font-medium text-primary hover:text-green-400 md:block'>
                        Shop the collection{' '}
                        <span aria-hidden='true'>&rarr;</span>
                    </Link>
                ) : null}
            </div>

            <div className='relative'>
                <div className='mt-6 flex items-center w-full'>
                    <div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
                        {map.map((product, i) => (
                            <div
                                key={`product-${i}`}
                                className={`mb-4 cursor-pointer ${selectedProduct === product ? 'border-2 border-blue-500' : ''
                                    }`}
                                onClick={() => setSelectedProduct(product)}
                            >
                                {product ? (
                                    <>
                                        {/* Renderizar la primera imagen del array */}
                                        {product.images.length > 0 && (
                                            <img
                                                src={typeof product.images[0]?.image === 'string' ? product.images[0]?.image : product.images[0]?.image?.url || undefined}
                                                alt={product.name}
                                                className='w-full h-40 object-cover mb-2'
                                            />
                                        )}


                                        <p className='text-lg font-semibold'>{product.name}</p>
                                        <p className='text-sm text-gray-500'>{product.description}</p>
                                        <p className='mt-1 font-medium text-sm text-gray-900'>
                                            {formatPrice(product.price)}
                                        </p>
                                    </>
                                ) : (
                                    <div className='animate-pulse'>
                                        <div className='h-8 bg-gray-300 mb-2'></div>
                                        <div className='h-4 bg-gray-300'></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductReel
