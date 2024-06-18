import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import ProductReelBusiness from '@/components/ProductReelBusiness'
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

  const isBusinessCategory = category === 'business';
  // console.log(isBusinessCategory);
  

  return (
    <MaxWidthWrapper className='px-2.5 md:px-20'>
      {isBusinessCategory ? (
        <ProductReelBusiness
          title={label ?? 'Explorar productos'}
          query={{
            category,
            limit: 100,
            sort:'name'
          }}
        />
      ) : (
        <ProductReel
          title={label ?? 'Explorar productos'}
          query={{
            category,
            limit: 300,
            sort: 'name',
          }}
        />
      )}
    </MaxWidthWrapper>
  )
}

export default ProductsPage
