import { getServerSideUser } from '@/lib/payload-utils'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/get-payload'
import { notFound, redirect } from 'next/navigation'
import { Product, ProductFile, User } from '@/payload-types'
import { PRODUCT_CATEGORIES } from '@/config'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import PaymentStatus from '@/components/PaymentStatus'
import WhatsAppButton from '@/components/WhatsAppButton';


interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const ThankYouPage = async ({
  searchParams,
}: PageProps) => {
  const orderId = searchParams.orderId;

  const nextCookies = cookies()

  const { user } = await getServerSideUser(nextCookies)
  const payload = await getPayloadClient()

  const { docs: orders } = await payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  })

  const [order] = orders

  if (!order) return notFound()

  const orderUserId =
    typeof order.user === 'string'
      ? order.user
      : order.user.id

  if (orderUserId !== user?.id) {
    return redirect(
      `/sign-in?origin=thank-you?orderId=${order.id}`
    )
  }

  const fee=0
  const products = order.products as Product[]

  const orderTotal = products.reduce((total, product) => {
    return total + product.price
  }, 0)

  // Agrupar productos por vendedor
  const productsBySeller: Record<string, Product[]> = {};
  products.forEach((product) => {
    const sellerId = typeof product.user === 'object' && product.user !== null ? product.user.id : 'unknown';
    if (!productsBySeller[sellerId]) {
      productsBySeller[sellerId] = [];
    }
    productsBySeller[sellerId].push(product);
  });




  return (
    <main className='relative lg:min-h-full'>
      <div className='hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12'>
        <Image
          fill
          src={process.env.NEXT_PUBLIC_SERVER_URL + '/checkout-thank-you.jpg'}
          className='h-full w-full object-cover object-center'
          alt='thank you for your order'
        />
      </div>

      <div>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24'>
          <div className='lg:col-start-2'>
            <p className='text-sm font-medium text-blue-600'>
              Orden exitosa
            </p>
            <h1 className='mt-2 text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl'>
              Gracias por tu pedido
            </h1>
            {order._isPaid ? (
              <p className='mt-2 text-base text-muted-foreground'>
                Tu pedido ha sido procesado y tus activos están
                disponibles para descargar a continuación. Hemos enviado
                tu recibo y detalles del pedido a{' '}
                {typeof order.user !== 'string' ? (
                  <span className='font-medium text-blue-600'>
                    {order.user.email}
                  </span>
                ) : null}
                .
              </p>
            ) : (
              <p className='mt-2 text-base text-muted-foreground'>
                 Para confirmar el lugar de entrega contacta al vendedor con el botón de <b>Confirmar pedido.</b>
              </p>
            )}

            <div className='mt-16 text-sm font-medium'>
              <div className='text-muted-foreground'>
                Order nr.
              </div>
              <div className='mt-2 '>
                {order.id}
              </div>


              <ul className='mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground'>
                {/* Renderizar botón de WhatsApp para el vendedor */}
                {Object.entries(productsBySeller).map(([sellerId, sellerProducts]) => (
                  <div key={sellerId} className='mt-6'>
                    <h2 className='text-lg font-medium '>
                      Productos de {typeof sellerProducts[0]?.user === 'object' ? sellerProducts[0]?.user?.firstName : ''}{' '}
                      {typeof sellerProducts[0]?.user === 'object' ? sellerProducts[0]?.user?.lastName : ''}
                    </h2>
                    <ul className='mt-2 divide-y divide-gray-200 text-sm font-medium text-muted-foreground'>
                      {sellerProducts.map((product) => (

                        <li key={product.id} className='flex space-x-6 py-6'>
                          <div className='relative h-24 w-24'>
                            {typeof product.images[0]?.image !== 'string' &&
                              product.images[0]?.image?.url ? (
                              <Image
                                fill
                                src={product.images[0]?.image.url}
                                alt={`${product.name} image`}
                                className='flex-none rounded-md bg-gray-100 object-cover object-center'
                              />
                            ) : null}
                          </div>
                          <div className='flex-auto flex flex-col justify-between'>
                            <div className='space-y-1'>
                              <h3 className='text-secondary-foreground'>{product.name}</h3>
                                <p className='my-1'>Categoría: {PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label}</p>
                              {typeof product.user === 'object' && product.user !== null ? (
                                <div className='mt-1 flex text-sm'>
                                  <p className='text-muted-foreground'>
                                    Vendedor: {product.user.firstName} {product.user.lastName}
                                  </p>
                                  {/* Otros detalles del usuario que desees mostrar */}
                                </div>
                              ) : (
                                <p>No hay información del vendedor disponible.</p>
                              )}
                            </div>
                            {order._isPaid ? (
                              product.product_files && typeof product.product_files === 'object' ? (
                                <a
                                  href={typeof product.product_files === 'object' ? product.product_files?.url ?? undefined : undefined}
                                  download={product.name}
                                  className='text-blue-600 hover:underline underline-offset-2'
                                >
                                  Descargar el archivo
                                </a>
                              ) : (
                                <p>No hay archivos para descargar</p>
                              )
                            ) : null}

                          </div>
                          <p className='flex-none font-medium text-secondary-foreground'>
                            {formatPrice(product.price)}
                          </p>
                        </li>
                      ))}
                    </ul>
                    {/* Verificar si el vendedor tiene información antes de renderizar el botón */}
                    {sellerProducts[0]?.user && (
                      <WhatsAppButton
                        phoneNumber={typeof sellerProducts[0]?.user === 'object' ? sellerProducts[0]?.user.phone : ''}
                         message = {`Hola, soy ${(user as User)?.firstName}.\nY deseo Adquirir:\n${sellerProducts.map((product) => `${product.name} (${formatPrice(product.price)})`).join('\n')}.\nESPE SHOP.`}
                        text={`Confirmar pedido`}
                        autoSend={true}
                      />
                    )}

                  </div>
                ))}
              </ul>

              <div className='space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground'>
                <div className='flex justify-between'>
                  <p>Subtotal</p>
                  <p className='text-secondary-foreground'>
                    {formatPrice(orderTotal)}
                  </p>
                </div>

                <div className='flex justify-between'>
                  <p>Costo de Transacción</p>
                  <p className='text-secondary-foreground'>
                    {formatPrice(fee)}
                  </p>
                </div>

                <div className='flex items-center justify-between border-t border-gray-200 pt-6 text-secondary-foreground'>
                  <p className='text-base'>Total</p>
                  <p className='text-base'>
                    {formatPrice(orderTotal + fee)}
                  </p>
                </div>
              </div>

              <PaymentStatus
                isPaid={order._isPaid}
                orderEmail={(order.user as User).email}
                orderId={order.id}
              />

              <div className='mt-16 border-t border-gray-200 py-6 text-right'>
                <Link
                  href='/products'
                  aria-label="Continuar comprando"
                  className='text-sm font-medium text-blue-600 hover:text-blue-500'>
                 Continue comprando &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ThankYouPage
