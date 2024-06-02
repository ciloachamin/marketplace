import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Icons } from './Icons'
import NavItems from './NavItems'
import { buttonVariants } from './ui/button'
import Cart from './Cart'
import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'
import { ModeToggle } from './ModeToggle'
import Search from './Search'
import { Plus, Upload } from 'lucide-react'


const Navbar = async () => {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return (
    <div className='sticky z-50 top-0 inset-x-0 h-16  bg-background'>
      <header className='relative '>
        <MaxWidthWrapper className='px-2.5 md:px-20'>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
              <MobileNav user={user} />

              <div className='ml-4  max-sm:mx-2 flex lg:ml-0 h-15 w-20  max-sm:w-15'>
                <Link href='/'>
                  <Icons.logo className='w-full ' />
                </Link>
              </div>

              <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                <NavItems />
              </div>
              <div className='ml-auto flex items-center'>
                <Search />
                {/* <Search userId={"65945511053c95a8d160025d"} /> */}
              </div>

              <div className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  {user ? null : (
                    <Link
                      href='/sign-in'
                      className={buttonVariants({
                        variant: 'ghost',
                      })}>
                      Inicia sesión
                    </Link>
                  )}

                  {user ? null : (
                    <span
                      className='h-6 w-px bg-gray-200'
                      aria-hidden='true'
                    />
                  )}

                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Link
                      href='/sign-up'
                      className={buttonVariants({
                        variant: 'ghost',
                      })}>
                      Crear una cuenta
                    </Link>
                  )}

                  {user ? (
                    <span
                      className='h-6 w-px bg-gray-200'
                      aria-hidden='true'
                    />
                  ) : null}

                  {user ? null : (
                    <div className='flex lg:ml-6'>
                      <span
                        className='h-6 w-px bg-gray-200'
                        aria-hidden='true'
                      />
                    </div>
                  )}
                </div>
                {user && ['sell', 'admin', 'sellbasic', 'sellpremium', 'business'].includes(user.role) ? (
                  <>
                    <div className='ml-4 flow-root lg:ml-6 '>
                      <div className='max-lg:hidden rounded-md bg-[#208215] h-8 w-20  justify-center items-center flex'>
                        <Link href='/sell/collections/products/create' className=" text-white flex justify-center items-center gap-2" target='_blank'>Subir  <Upload size={20} /></Link>
                      </div>
                      <div className='lg:hidden rounded-md bg-[#208215] h-8 w-10 justify-center items-center flex'>
                        <Link href='/sell/collections/products/create' target='_blank'><Plus size={20} color='white' strokeWidth={5} /></Link>
                      </div>
                    </div>
                  </>
                ) : null}
                <div className='ml-4 flow-root lg:ml-6'>
                  <Cart />
                </div>
                <div className='ml-4 flow-root lg:ml-6 '>
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar
