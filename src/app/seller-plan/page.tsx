import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PricingCard from '@/components/PricingCard'
import Accordion from '@/components/Accordion'

const SellerPlanPage = ({ }) => {
    return (
        <MaxWidthWrapper className='px-2.5 md:px-20'>

            <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
                <h1 className='text-4xl font-bold tracking-tight text-secondary-foreground sm:text-6xl'>
                    El mercado para grandes {' '}
                    <span className='text-primary'>
                        emprendedores
                    </span>
                    .
                </h1>
                <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
                    Bienvenido a ESPE SHOP. Aquí entendemos que grandes emprendedores como tú merecen una plataforma que te brinde las herramientas para tener éxito.
                </p>
            </div>
            <div className='w-full flex justify-center items-center self-center flex-col'>

                <Accordion title="¿Qué es un Plan de Vendedor?">
                    <p>
                        Un plan de vendedor es una suscripción que te permite vender tus productos en nuestra plataforma. Puedes elegir entre 3 planes diferentes.
                    </p>
                </Accordion>
                <Accordion title="¿Por qué necesito un plan?">
                    <p>
                        Se requiere un plan de vendedor para vender tus productos en nuestra plataforma. Esto es para garantizar que podamos brindar un servicio de alta calidad a nuestros clientes.
                    </p>
                </Accordion>
                <Accordion title="¿Qué sucede si cancelo mi plan?">
                    <p>
                        Si cancelas tu plan, tus productos ya no estarán disponibles para la venta. Aún podrás acceder a tu cuenta y comprar productos. Tus productos permaneceran en nuestra base de datos, pero no estarán disponibles para la venta. Hasta que vuelvas a comprar un plan.
                    </p>
                </Accordion>
                <h2 className='mt-10 text-3xl font-bold tracking-tight text-secondary-foreground sm:text-5xl'>Compra uno de nuestros planes</h2>
            </div>

            <div className='flex gap-5 my-10  max-lg:flex-col'>
                <PricingCard
                    title="Inicio"
                    description=" Ideal para nuevos vendedores o aquellos con pocos productos y venta no muy frecuente. Una forma económica y efectiva de dar tus primeros pasos en el comercio digital."
                    promo='Gratis 10 Días'
                    price="$1"
                    time='Mes'
                    features={[
                        'Cuenta de vendedor para subir y gestionar productos',
                        'Soporte técnico para el uso de la plataforma',
                        'Configuración individual de productos',
                    ]}
                    buttonText="Comenzar"
                    buttonNumber='0978814129'
                    buttonMessage='Hola, quiero comprar el plan Inicio'
                />
                <PricingCard
                    title="Vendedor Básico"
                    description="Diseñado para vendedores con un mercado ya establecido o que manejan un catálogo variado de productos. Este plan te ayudará a expandir tu presencia y alcanzar a más clientes dentro de ESPE Shop."
                    promo='Gratis 10 Días'
                    price="$3"
                    time='Mes'
                    features={[
                        'Cuenta de vendedor para subir y gestionar productos',
                        'Soporte técnico para el uso de la plataforma',
                        'Configuración individual de productos',
                        'Colocación prioritaria en la plataforma principal',
                        'Publicidad en Redes Sociales de ESPE Shop y Emprendex'
                    ]}
                    buttonText="Comenzar"
                    buttonNumber='0978814129'
                    buttonMessage='Hola, quiero comprar el plan vendedor básico.'
                />
                <PricingCard
                    title="Vendedor Premium"
                    description="La opción definitiva para aquellos que desean llevar su negocio al siguiente nivel. Obtén tu propia página web independiente, gestionada desde ESPE Shop, y vende tus productos más allá de nuestra plataforma."
                    promo='En desarrollo'
                    price="$30"
                    time='Semestral'
                    features={[
                        'Cuenta de vendedor para subir y gestionar productos',
                        'Soporte técnico para el uso de la plataforma',
                        'Configuración individual de productos',
                        'Colocación prioritaria en la plataforma principal',
                        'Página de destino personalizable que muestra tus productos para clientes externos',
                        'Publicidad en Redes Sociales de ESPE Shop y Emprendex'

                    ]}
                    buttonText="Comenzar"
                    buttonNumber='0978814129'
                    buttonMessage='Hola, quiero comprar el plan vendedor premium. ¿Qué implica este plan?'

                />
                <div>
                </div>
            </div>
        </MaxWidthWrapper >
    )
}

export default SellerPlanPage
