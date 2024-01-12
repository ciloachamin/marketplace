import AddToCartButton from '@/components/AddToCartButton'
import ImageSlider from '@/components/ImageSlider'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import { PRODUCT_CATEGORIES } from '@/config'
import { getPayloadClient } from '@/get-payload'
import { formatPrice } from '@/lib/utils'
import { User } from '@/payload-types'
import { Check, Shield, XIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    productId: string
  }
}

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Productos', href: '/products' },
]

const Page = async ({ params }: PageProps) => {
  const { productId } = params

  const payload = await getPayloadClient()

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: 'approved',
      },
    },
  })


  function estaDentroDelHorario() {
    const ahora = new Date();
    const inicio = new Date((product.user as User)?.timeStart ?? '');
    const fin = new Date((product.user as User)?.timeEnd ?? '');
    return ahora >= inicio && ahora <= fin;
  }


  function formatarHora(fechaString: string) {
    const fecha = new Date(fechaString);
    const hora = fecha.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true , timeZone: "America/Guayaquil" });
    return hora;
  }



  const [product] = products

  if (!product) return notFound()

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label

  const validUrls = product.images
    .map(({ image }) =>
      typeof image === 'string' ? image : image.url
    )
    .filter(Boolean) as string[]

  return (
    <MaxWidthWrapper className='px-2.5 md:px-20'>
      <div className=''>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          {/* Product Details */}
          <div className='lg:max-w-lg lg:self-end'>
            <ol className='flex items-center space-x-2'>
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className='flex items-center text-sm'>
                    <Link
                      href={breadcrumb.href}
                      className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                        <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className='mt-4'>
              <h1 className='text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl'>
                {product.name}
              </h1>
            </div>

            <section className='mt-4'>
              <div className='flex items-center'>
                <p className='font-medium text-secondary-foreground0'>
                  {formatPrice(product.price)}
                </p>

                <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                  {label}
                </div>
              </div>
              <div className='mt-4 space-y-6'>
                {typeof product.user === 'object' && product.user !== null ? (
                  <div className='mt-1 flex text-sm'>
                    <p className='text-muted-foreground'>
                      Vendedor: {product.user.firstName} {product.user.lastName}
                    </p>
                  </div>
                ) : (
                  <p>No hay información del vendedor disponible.</p>
                )}
              </div>

              <div className='mt-4 space-y-6'>
                <div className='mt-1 flex text-sm'>
                  {typeof product.stock !== 'undefined' && product.stock !== null ? (
                    <p className='text-muted-foreground'>
                      En stock: {product.stock}
                    </p>
                  ) : (null
                  )}
                </div>
              </div>


              <div className='mt-4 space-y-6'>
                <p className='text-base text-muted-foreground'>
                  {product.description}
                </p>
              </div>

              <div className='mt-6 flex items-center'>
                {typeof product.user === 'object' && product.user !== null && product.user.timeStart && product.user.timeEnd ? (
                  <>
                    {estaDentroDelHorario() ? (
                      <>
                        <Check aria-hidden='true' className='h-5 w-5 flex-shrink-0 text-green-500' />
                        <p className='ml-2 text-sm text-muted-foreground'>
                          &nbsp;Disponible de: {formatarHora(product.user.timeStart)} - {formatarHora(product.user.timeEnd)}
                        </p>
                      </>

                    ) : (
                      <>
                        <XIcon aria-hidden='true' className='h-5 w-5 flex-shrink-0 text-red-500' />
                        <p className='ml-2 text-sm text-muted-foreground'>
                          &nbsp;Disponible de: {formatarHora(product.user.timeStart)} - {formatarHora(product.user.timeEnd)}
                        </p>

                      </>
                    )}

                  </>
                ) : (
                  <>
                    <Check aria-hidden='true' className='h-5 w-5 flex-shrink-0 text-green-500' />
                    <p className='ml-2 text-sm text-muted-foreground'>
                      &nbsp;Elegible para entrega instantánea
                    </p>
                  </>
                )}
              </div>


            </section>
          </div>

          {/* Product images */}
          <div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
            <div className='aspect-square rounded-lg'>
              <ImageSlider urls={validUrls} />
            </div>
          </div>

          {/* add to cart part */}
          <div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
            <div>
              <div className='mt-10'>
                <AddToCartButton product={product} />
              </div>
              <div className='mt-6 text-center'>
                <div className='group inline-flex text-sm text-medium'>
                  <Shield
                    aria-hidden='true'
                    className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'
                  />
                  <span className='text-muted-foreground hover:text-gray-700'>
                    Pago seguro
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReel
        href='/products'
        query={{ category: product.category, limit: 4 }}
        title={`Similar ${label}`}
        subtitle={`Browse similar high-quality ${label} just like '${product.name}'`}
      />



    </MaxWidthWrapper>
  )
}

export default Page
