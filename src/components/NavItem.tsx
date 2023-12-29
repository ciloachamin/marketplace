'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

type Category = (typeof PRODUCT_CATEGORIES)[number]

interface NavItemProps {
  category: Category
  handleOpen: () => void
  close: () => void
  isOpen: boolean
  isAnyOpen: boolean
}

const NavItem = ({
  isAnyOpen,
  category,
  handleOpen,
  close,
  isOpen,
}: NavItemProps) => {
  return (
    <div className='flex'>
      <div className='relative flex items-center w-full '>
        <Link href={category.href} className='w-full'>
            <Button
              className='gap-1.5 hover:bg-primary w-full flex  justify-between'
              onClick={handleOpen}
              variant={isOpen ? 'secondary' : 'ghost'}
            >
              {category.label}
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-all text-secondary-foreground',
                  {
                    '-rotate-180': isOpen,
                  }
                )}
              />
            </Button>
        </Link>
      </div>
    </div>
  )
}

export default NavItem
