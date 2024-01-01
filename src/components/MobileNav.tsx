'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import { Menu, X, LogIn, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { User } from '@/payload-types'
import { useAuth } from '@/hooks/use-auth'
// ... (importaciones anteriores)

const MobileNav = ({ user }: { user: User | null }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { signOut } = useAuth()

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };


  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  if (!isOpen)
    return (
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
      >
        <Menu className='h-6 w-6' aria-hidden='true' />
      </button>
    );

  return (
    <div>
      <div className='relative z-40 lg:hidden'>
        <div className='fixed inset-0 bg-black bg-opacity-25' />
      </div>

      <div className='fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex lg:hidden'>
        <div className='w-4/5 flex flex-col h-full bg-background border '>
          {/* Botón "X" siempre arriba */}
          <div className='flex px-4 pb-2 pt-5'>
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
            >
              <X className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>

          {/* Contenido en el medio */}
          <div className='flex-1 overflow-y-auto'>
      			<span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">Category</span>

            <div className='mt-2'>
              <ul>
                {PRODUCT_CATEGORIES.map((category) => (
                  <Link key={category.label} href={category.href}>
                    <li
                      onClick={() => setIsOpen(false)}
                      className='border-b border hover:bg-secondary hover:bg-opacity-10 cursor-pointer'
                    >
                      <div className='py-4 px-6 flex'>
                        <p className='border-transparent flex-1 whitespace-nowrap border-b-2 text-base font-medium'>
                          {category.label}
                        </p>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>

          {/* Enlaces "Sign In" y "Sign Up" siempre abajo */}
          <div className='space-y-1 border-t border py-6'>
          <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">ACCOUNT</span>
            <div className='flow-root'>
              {user ? (
                <>
                  <p className='flex gap-2 py-4 px-6  text-gray-400 font-medium'>
                    {user.email}
                  </p>
                  {['sell', 'admin' ,'sellbasic', 'sellpremium'].includes(user.role) ? (
                    <p className='flex gap-2 py-4 px-6 font-medium hover:bg-secondary'>

                      <Link href='/sell'>Seller Dashboard</Link>
                    </p>
                  ) : null}

                </>
              ) : (
                <Link
                  onClick={() => {
                    // Acciones al hacer clic en "Sign In"
                    closeOnCurrent('/sign-in');
                    setIsOpen(false);
                  }}
                  href='/sign-in'
                  className='flex gap-2 py-4 px-6 justify-between font-medium hover:bg-secondary'
                >
                  Sign In <LogIn />
                </Link>
              )}
            </div>
            <div className='flow-root'>
              {user ? (
                <Link
                  onClick={() => {
                    signOut()
                    setIsOpen(false);
                  }}
                  href={"/"}
                  className='flex gap-2 py-4 px-6 justify-between font-medium hover:bg-secondary'
                >
                  Log Out <LogOut />
                </Link>
              ) : (
                <Link
                  onClick={() => {
                    // Acciones al hacer clic en "Sign Up"
                    closeOnCurrent('/sign-up');
                    setIsOpen(false);
                  }}
                  href='/sign-up'
                  className='flex gap-2 py-4 px-6 justify-between font-medium hover:bg-secondary'
                >
                  Sign Up <LogIn />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
