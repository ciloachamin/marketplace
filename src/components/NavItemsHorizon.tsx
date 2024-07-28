'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const NavItems = () => {
  return (
    <div className='flex h-full w-full'>
      <div className='relative flex items-center w-full'>
        <div className="absolute top-0 left-0  w-full bg-secondary overflow-hidden">
          <div className="flex overflow-x-auto whitespace-nowrap ">
            {PRODUCT_CATEGORIES.map((category, i) => (
              <Link href={category.href} className='w-full h-full' aria-label={category.label} key={i}>
                <div
                  className='gap-1.5 hover:bg-primary w-full h-full hover:text-white py-2 px-4 flex justify-between'
                >
                  {category.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavItems;
