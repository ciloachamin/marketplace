
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ProductUser from '@/components/ProductUser';
import { getPayloadClient } from '@/get-payload';
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
            {/* <MaxWidthWrapper className=''>
                <CarrucelProgress />
            </MaxWidthWrapper> */}

            <MaxWidthWrapper className='px-2.5 md:px-20'>
                <ProductUser
                    query={{ sort: 'desc', limit: 10 }}
                    title='Menú y Promociones '
                    userId={userId}
                />
            </MaxWidthWrapper>
        </>
    );
};

export default Page;