'use client'

import { ShoppingCart } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Separator } from './ui/separator'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { useCart } from '@/hooks/use-cart'
import { ScrollArea } from './ui/scroll-area'
import CartItem from './CartItem'
import { useEffect, useState } from 'react'
import { Icons } from './Icons'
import { User } from '@/payload-types'


const Cart = ({ user }: { user: User | null }) => {
  const { items } = useCart()

  const [itemCount, setItemCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, [])


  useEffect(() => {
    if (isMounted && items.length > 0) {
      setItemCount(items.length);
      setIsBlinking(true);
      // Desactiva la animación después de 1 segundo
      const blinkTimeout = setTimeout(() => {
        setIsBlinking(false);
      }, 1000);

      return () => clearTimeout(blinkTimeout);
    } else {
      setItemCount(0)
    }
  }, [isMounted, items]);


  const cartTotal = items.reduce(
    (total, { product, quantity }) => {
      if (quantity !== undefined) {
        return total + product.price * quantity;
      }
      return total;
    },
    0
  );

  console.log(items);

  // const shippingCosts = items.map(({ product }) => {
  //   if ((product.user as User)?.campus === (user as User)?.campus) {
  //     return 0;
  //   } else {
  //     return 1.50;
  //   }
  // });

  
  const fee = 0

  return (
    <Sheet>
      <SheetTrigger className='group -m-2 flex items-center p-2'>
        <ShoppingCart
          aria-hidden='true'
          className={`h-6 w-6 flex-shrink-0 text-gray-400 ${isBlinking ? 'animate-blink text-green-500' : 'group-hover:text-gray-500'
            }`}
        />
        <span className={`font-medium text-gray-400  rounded-full px-2 '`}>
          {isMounted ? itemCount : 0}
        </span>

      </SheetTrigger>
      <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle>Carrito ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className='flex w-full flex-col pr-6'>
              <ScrollArea>
                {items.map(({ product }) => (
                  <CartItem
                    product={product}
                    key={product.id}
                  />
                ))}
              </ScrollArea>
            </div>
            <div className='space-y-4 pr-6'>
              <Separator />
              <div className='space-y-1.5 text-sm'>
                <div className='flex'>
                  <span className='flex-1'>Envío</span>
                  <span>{formatPrice(0.00)}</span>
                </div>
                <div className='flex'>
                  <span className='flex-1'>
                    Tarifa de transacción
                  </span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className='flex'>
                  <span className='flex-1'>Total</span>
                  <span>
                    {formatPrice(cartTotal + fee +0)}
                  </span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href='/cart'
                    className={buttonVariants({
                      className: 'w-full',
                    })}>
                    Continuar con el pedido
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div
              aria-hidden='true'
              className='relative mb-4 h-60 w-60 text-muted-foreground'>
              <Icons.cocodrilo_espe_cesta className='h-60 w-60 ' />

            </div>
            <div className='text-xl font-semibold'>
              Tu carrito está vacío
            </div>
            <SheetTrigger asChild>
              <Link
                href='/products'
                className={buttonVariants({
                  variant: 'link',
                  size: 'sm',
                  className:
                    'text-sm text-muted-foreground',
                })}>
                Agrega productos a tu carrito para realizar el pago
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default Cart
