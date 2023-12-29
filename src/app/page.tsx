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

const perks = [
  {
    name: 'Instant Delivery',
    Icon: ArrowDownToLine,
    description:
      'Get your assets delivered to your email in seconds and download them right away.',
  },
  {
    name: 'Guaranteed Quality',
    Icon: CheckCircle,
    description:
      'Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.',
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
]

const validUrls = [
  'https://picsum.photos/id/237/200/300',
  'https://picsum.photos/id/5/200/300',
  'https://picsum.photos/id/8/200/300',
  'https://picsum.photos/id/6/200/300',
  'https://picsum.photos/id/5/200/300',
  'https://picsum.photos/id/4/200/300',
  'https://picsum.photos/id/27/200/300',
  'https://picsum.photos/id/52/200/300',
  'https://picsum.photos/id/125/200/300',

]

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className='px-2.5 md:px-20'>
        <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
          <h1 className='text-4xl font-bold tracking-tight text-secondary-foreground sm:text-6xl'>
            Your marketplace for high-quality{' '}
            <span className='text-primary'>
              digital assets
            </span>
            .
          </h1>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
            Welcome to srTUC. Every asset on our
            platform is verified by our team to ensure our
            highest quality standards.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            <Link
              href='/products'
              className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant='ghost'>
              Our quality promise &rarr;
            </Button>
          </div>
        </div>


        <ProductReel
          query={{ sort: 'desc', limit: 4 }}
          href='/products?sort=recent'
          title='Brand new'
        />
        <ProductReelPremium
          query={{ sort: 'desc', limit: 4 }}
          href='/products?sort=recent'
          title='Productos Populares'
        />
      </MaxWidthWrapper>

        <Carrucel query={{ sort: 'desc', limit: 8 }}
          href='/products?sort=recent'
          title='Brand new' />

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
