import { PRODUCT_CATEGORIES } from '@/config'
import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/payload-types'
import { ImageIcon, X } from 'lucide-react'
import Image from 'next/image'

const CartItem = ({ product }: { product: Product }) => {
  const { image } = product.images[0]
  const { removeItem, items, addItem } = useCart()

  const MAX_QUANTITY = 10000;


  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label

  const foundItem = items.find((item) => item.product.id === product.id);
  const quantity = foundItem ? foundItem.quantity : 0;
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= MAX_QUANTITY) {
      addItem({ product, quantity: newQuantity });
    }
  };

  const handleIncrement = () => {
    handleQuantityChange((quantity || 0) + 1);
  };

  const handleDecrement = () => {
    if (quantity && quantity > 1) {
      handleQuantityChange(quantity - 1);
    }
  };


  const itemTotal = quantity ? product.price * quantity : 0;
  return (
    <div className='space-y-3 py-2'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex items-center space-x-4'>
          <div className='relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded'>
            {typeof image !== 'string' && image.url ? (
              <Image
                src={image.url}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className='absolute object-cover'
              />
            ) : (
              <div className='flex h-full items-center justify-center bg-secondary'>
                <ImageIcon
                  aria-hidden='true'
                  className='h-4 w-4 text-muted-foreground'
                />
              </div>
            )}
          </div>

          <div className='flex flex-col self-start'>
            <span className='line-clamp-1 text-sm font-medium mb-1'>
              {product.name}
            </span>

            <span className='line-clamp-1 text-xs capitalize text-muted-foreground'>
              {label}
            </span>
            <span className='line-clamp-1 text-xs capitalize text-muted-foreground'>
              {typeof product.user === 'object' && product.user !== null ? (
                <div className='mt-1 flex text-sm'>
                  <p className='text-muted-foreground'>
                    Vendedor: {product.user.firstName} {product.user.lastName}
                  </p>
                </div>
              ) : (
                <p>No hay información del vendedor disponible.</p>
              )}
            </span>
            <div className='mt-4 text-xs text-muted-foreground'>
              <button
                onClick={() => removeItem(product.id)}
                className='flex items-center gap-0.5'>
                <X className='w-3 h-4' />
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className='flex flex-col space-y-1 font-medium'>
          <div className=" flex justify-between ">
            <span className="cursor-pointer rounded-l bg-secondary py-1 px-3.5 duration-100 hover:bg-primary hover:text-blue-50"
              onClick={handleDecrement}
            > - </span>
            <input
              type='number'
              min='1'
              max={MAX_QUANTITY}
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
              className="h-8 w-8 border  text-center text-xs outline-none"
              style={{
                WebkitAppearance: 'none',
                margin: 0,
              }}

            />
            <span className="cursor-pointer rounded-r bg-secondary py-1 px-3.5 duration-100 hover:bg-primary hover:text-blue-50"
              onClick={handleIncrement}
            > + </span>
          </div>
          <span className='ml-auto line-clamp-1 text-sm'>
            {formatPrice(itemTotal)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartItem
