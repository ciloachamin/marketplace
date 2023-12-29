import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PricingCard from '@/components/PricingCard'
import Accordion from '@/components/Accordion'

const SellerPlanPage = ({ }) => {



    return (
        <MaxWidthWrapper className='px-2.5 md:px-20'>

            <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
                <h1 className='text-4xl font-bold tracking-tight text-secondary-foreground sm:text-6xl'>
                    The marketplace for great  {' '}
                    <span className='text-primary'>
                        entrepreneurs
                    </span>
                    .
                </h1>
                <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
                    Welcome to EMPRE STORE. Here, we understand that great entrepreneurs like you deserve a platform provides you with the tools to succeed.
                </p>
            </div>
            <div className='w-full flex justify-center items-center self-center flex-col'>

                <Accordion title="What is a Seller Plan?">
                    <p>
                        A seller plan is a subscription that allows you to sell your
                        products on our platform. You can choose between 3 different
                        plans.
                    </p>
                </Accordion>
                <Accordion title="Why do I need a plan?">
                    <p>
                        A seller plan is required to sell your products on our
                        platform. This is to ensure that we can provide a high-quality
                        service to our customers.
                    </p>
                </Accordion>
                <Accordion title="What happens if I cancel my plan?">
                    <p>
                        If you cancel your plan, your products will no longer be
                        available for sale. You can still access your account and
                        download your products.
                    </p>
                </Accordion>
                <h2 className='mt-10 text-3xl font-bold tracking-tight text-secondary-foreground sm:text-5xl'>Purchase one of our plans</h2>
            </div>




            <div className='flex gap-5 my-10  max-lg:flex-col'>

                <PricingCard
                    title="Starter"
                    description="Ideal for publishing and selling your products."
                    price="$2"
                    time='Month'
                    features={[
                        'Seller account for uploading and managing products',
                        'Technical support for platform usage',
                        'Individual product configuration',
                    ]}
                    buttonText="Get started"
                    buttonNumber='5930967149917'
                    buttonMessage='Hola, quiero comprar el plan Empezar '
                />


                <PricingCard
                    title="Basic Seller"
                    description="Perfect for entrepreneurs looking to expand their reach."
                    price="$5"
                    time='Month'
                    features={[
                        'Seller account for uploading and managing products',
                        'Technical support for platform usage',
                        'Individual product configuration',
                        'Priority placement on the main platform',
                    ]}
                    buttonText="Get started"
                    buttonNumber='5930967149917'
                    buttonMessage='Hola, quiero comprar el plan vendedor básico.'
                />


                <PricingCard
                    title="Premium Seller"
                    description="Tailored for sellers who want maximum visibility."
                    price="$30"
                    time='unique'
                    features={[
                        'Seller account for uploading and managing products',
                        'Technical support for platform usage',
                        'Individual product configuration',
                        'Priority placement on the main platform',
                        'Customizable landing page showcasing your products for external customers',
                        
                    ]}
                    buttonText="Get started"
                    buttonNumber='5930967149917'
                    buttonMessage='Hola, quiero comprar el plan vendedor premium. Y que implica este plan?'
                    
                />
                 <div>

    </div>

            </div>

        </MaxWidthWrapper >
    )
}

export default SellerPlanPage
