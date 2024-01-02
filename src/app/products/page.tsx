import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import ProductReelPremium from '@/components/ProductReelPremium'
import { PRODUCT_CATEGORIES } from '@/config'

type Param = string | string[] | undefined

interface ProductsPageProps {
  searchParams: { [key: string]: Param }
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}

const ProductsPage = ({
  searchParams,
}: ProductsPageProps) => {
  const sort = parse(searchParams.sort)
  const category = parse(searchParams.category)

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category
  )?.label

  return (
    <MaxWidthWrapper className='px-2.5 md:px-20'>
      <ProductReelPremium
        query={{ sort: 'desc', limit: 4 }}
        href='/products?sort=recent'
        title='Productos Populares'
      />
      <ProductReel
        title={label ?? 'Explorar productos'}
        query={{
          category,
          limit: 40,
          sort:
            sort === 'desc' || sort === 'asc'
              ? sort
              : undefined,
        }}
      />
    </MaxWidthWrapper>
  )
}

export default ProductsPage
