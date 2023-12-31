import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import ProductReelPremium from '@/components/ProductReelPremium'
import Carrucel from '@/components/Carrucel'
import {
  Button,
  buttonVariants,
} from '@/components/ui/button'
import {
  ArrowDownToLine,
  Car,
  CheckCircle,
  Leaf,
} from 'lucide-react'
import Link from 'next/link'
import { Icons } from '@/components/Icons'

const perks = [
  {
    name: 'Expert Guidance',
    Icon: ArrowDownToLine,
    description:
      'Receive mentorship from experienced entrepreneurs and industry experts who can provide valuable insights and guidance.',
  },
  {
    name: 'Funding Opportunities',
    Icon: ArrowDownToLine,
    description:
      'Explore diverse funding options and grants tailored to support the unique projects and ideas of university entrepreneurs.',
  },
  {
    name: 'Skill Development',
    Icon: ArrowDownToLine,
    description:
      'Enhance your entrepreneurial skills through specialized courses, workshops, and training programs available on our platform.',
  },
];

const qualityPromisePoints = [
  {
    name: 'User-Friendly Interface',
    Icon: ArrowDownToLine,
    description:
      'Enjoy a seamless experience with our intuitive and user-friendly platform design.',
  },
  {
    name: 'Responsive Support',
    Icon: CheckCircle,
    description:
      'Our dedicated support team is ready to assist you with any questions or issues promptly.',
  },
  {
    name: 'Security First',
    Icon: Leaf,
    description:
      'We prioritize the security of your data and transactions to ensure a safe environment.',
  },
];


export default function Home() {
  return (
    <>
      <MaxWidthWrapper className='px-2.5 md:px-20'>

        <div className=' mx-auto text-center flex flex-col items-center max-w-3xl'>
          <Icons.logo className='h-50 w-80 ' />
          <h1 className='text-4xl font-bold tracking-tight text-secondary-foreground sm:text-6xl'>
            Your platform exclusive for  {' '}
            <span className='text-primary'>
              university entrepreneurs
            </span>
            .
          </h1>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
            Unlock your entrepreneurial potential with us. We provide resources, connections, and exclusive events for students like you. Grow your ideas with our community!
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            <Link
              href='/products'
              className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant='ghost'>
              <a href='#quality-section'>Our quality promise &rarr;</a>
            </Button>
          </div>
        </div>

        <Carrucel query={{ sort: 'desc', limit: 8 }}
          href='/products?sort=recent'
        />
        <ProductReelPremium
          query={{ sort: 'desc', limit: 4 }}
          href='/products?sort=recent'
          title='Productos Populares'
        />
        <ProductReel
          query={{ sort: 'desc', limit: 4 }}
          href='/products?sort=recent'
          title='Brand new'
        />

      </MaxWidthWrapper>

      <MaxWidthWrapper className='py-0  md:px-20 '>
        <section id="quality-section" className="py-20 flex items-center bg-stone-100 xl:h-screen font-poppins dark:bg-secondary">

          <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
            <div className="flex flex-wrap ">
              <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                <div className="relative lg:max-w-md">
                  <Icons.logo className='h-50 w-80 ' />
                  <div
                    className="absolute bottom-0 right-0 z-10 p-8 bg-white border-4 border-primary rounded shadow dark:border-primary lg:-mb-8 lg:-mr-11 sm:p-8 dark:text-gray-300 dark:bg-gray-700 ">
                    <p className="text-lg font-semibold md:w-72">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        className="absolute top-0 left-0 w-16 h-16 text-primary dark:text-gray-300 opacity-10"
                        viewBox="0 0 16 16">
                        <path
                          d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z">
                        </path>
                      </svg> Successfully Providing business solutions from 1999
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full px-6 mb-10 lg:w-1/2 lg:mb-0 ">
                <div className="pl-4 mb-6 border-l-4 border-primary ">
                  <span className="text-sm text-gray-600 uppercase dark:text-gray-400">Who we are?</span>
                  <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl dark:text-gray-300">
                    About Us
                  </h1>
                </div>
                <p className="mb-6 text-base leading-7 text-gray-500 dark:text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam Lorem ipsum dolor sit
                  amet. labore et dolore magna aliqua. Ut enim ad minim veniam Lorem ipsum dolor sit
                  amet. amet. labore et dolore magna aliqua. Ut enim ad minim veniam Lorem ipsum dolor sit
                  amet.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  Lorem ipsum dolor sit amet.
                </p>
                <a href="#"
                  className={buttonVariants()}>
                  Learn more
                </a>
              </div>
            </div>
          </div>
          
        </section>


      </MaxWidthWrapper>

      <MaxWidthWrapper className='py-20  md:px-20 '>
        <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
          {perks.map((perk) => (
            <div
              key={perk.name}
              className='text-center md:flex md:items-start md:text-left lg:block lg:text-center mt-3'>
              <div className='md:flex-shrink-0 flex justify-center'>
                <div className='h-16 w-16 flex items-center justify-center rounded-full bg-green-100 text-primary'>
                  {<perk.Icon className='w-1/3 h-1/3' />}
                </div>
              </div>

              <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                <h3 className='text-base font-medium text-primary'>
                  {perk.name}
                </h3>
                <p className='mt-3 text-sm text-muted-foreground'>
                  {perk.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>

    </>
  )
}
