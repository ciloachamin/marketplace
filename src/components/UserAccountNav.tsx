'use client'

import { User } from '@/payload-types'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'

const UserAccountNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='overflow-visible'>
        <Button
          variant='ghost'
          size='sm'
          className='relative'>
          Mi cuenta
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className=' w-60'
        align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            <p className='font-medium text-sm '>
              {user.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {['sell', 'admin', 'sellbasic', 'sellpremium', 'business'].includes(user.role) ? (
          <>
            <DropdownMenuItem asChild>
              <Link aria-label="Panel de vendedor" href='/sell' target='_blank'>Panel de vendedor</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link aria-label="Subir productos" href='/sell/collections/products/create' target='_blank'>Subir Producto</Link>
            </DropdownMenuItem>
          </>
        ) : null}

        <DropdownMenuItem
          onClick={signOut}
          className='cursor-pointer'>
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav
