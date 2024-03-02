import AddToCartButton from '@/components/AddToCartButton';
import CarrucelProgress from '@/components/CarrucelProgress';
import ImageSlider from '@/components/ImageSlider';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ProductListing from '@/components/ProductListing';
import ProductUser from '@/components/ProductUser';
import { PRODUCT_CATEGORIES } from '@/config';
import { getPayloadClient } from '@/get-payload';
import { formatPrice } from '@/lib/utils';
import { Check, Shield } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
    params: {
        userId: string;
    };
}

const Page = async ({ params }: PageProps) => {
    const { userId } = params;

    const payload = await getPayloadClient();

    const { docs: userProducts } = await payload.find({
        collection: 'products',
        where: {
            user: {
                equals: userId,
            },
            approvedForSale: {
                equals: 'approved',
            },
        },
    });
    const [product] = userProducts

    if (!product) return notFound()


    if (!userProducts || userProducts.length === 0) {
        return notFound();
    }

    return (
        <>
            <MaxWidthWrapper className=''>
                <CarrucelProgress />
            </MaxWidthWrapper>

            <MaxWidthWrapper className='px-2.5 md:px-20'>
                <ProductUser
                    query={{ sort: 'desc', limit: 10 }}
                    title='Products me'
                    userId={userId}
                />
            </MaxWidthWrapper>
        </>
    );
};

export default Page;