import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReelPremium from '@/components/ProductReelPremium'
import Carrucel from '@/components/Carrucel'
import {
  Button,
  buttonVariants,
} from '@/components/ui/button'
import {
  ArrowDownToLine,
} from 'lucide-react'
import Link from 'next/link'
import { Icons } from '@/components/Icons'
import CarrucelAdvert from '@/components/CarrucelAdvert'
import ProductReelBusiness from '@/components/ProductReelBusiness'
import ProductReelProduct from '@/components/ProductReelProduct'

const perks = [
  {
    name: 'Soporte Constante',
    Icon: ArrowDownToLine,
    description:
      'Experimenta un apoyo inquebrantable de nuestra comunidad y equipo dedicado, asegurándote de tener asistencia en cada paso de tu viaje emprendedor.',
  },
  {
    name: 'Mejoras Continuas',
    Icon: ArrowDownToLine,
    description:
      'Benefíciate de actualizaciones y mejoras regulares en nuestro marketplace, asegurando que se mantenga a la vanguardia y cumpla con tus necesidades en constante evolución.',
  },
  {
    name: 'Seguridad Garantizada',
    Icon: ArrowDownToLine,
    description:
      'Descansa tranquilo sabiendo que priorizamos la seguridad de tu información, brindando un entorno seguro y confiable para tus transacciones.',
  },
  {
    name: 'Visibilidad en el Marketplace',
    Icon: ArrowDownToLine,
    description:
      'Aumenta la visibilidad de tus productos o servicios a través de listados destacados, campañas promocionales y alianzas estratégicas dentro de nuestro marketplace.',
  },

  {
    name: 'Oportunidades de Cross-Promoción',
    Icon: ArrowDownToLine,
    description:
      'Explora oportunidades de cross-promoción con otros vendedores, ampliando tu alcance y atrayendo a una audiencia más amplia interesada en productos o servicios relacionados.',
  },
  {
    name: 'Interfaz Amigable para Dispositivos Móviles',
    Icon: ArrowDownToLine,
    description:
      'Administra tus actividades en el mercado sin esfuerzo desde cualquier lugar con una interfaz amigable para dispositivos móviles, brindando comodidad y flexibilidad para emprendedores ocupados.',
  },


];




export default function Home() {
  return (
    <>
      <MaxWidthWrapper className=''>
        <CarrucelAdvert />
      </MaxWidthWrapper>
      <MaxWidthWrapper className='px-2.5 md:px-20'>

        <div className=' mx-auto text-center flex flex-col items-center max-w-3xl'>

          <h1 className='text-4xl font-bold tracking-tight text-secondary-foreground sm:text-6xl'>
            Tu plataforma exclusiva para {' '}
            <span className='text-primary'>
              emprendedores universitarios
            </span>
            .
          </h1>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
            Libera tu potencial emprendedor con nosotros. Proporcionamos recursos, conexiones y eventos exclusivos para estudiantes como usted. ¡Haz crecer tus ideas con nuestra comunidad!
          </p>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
            Tenemos Envios a distintas sedes de la Universidad.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            {/* <Link
              href='/products'
              className={buttonVariants()}
              aria-label="Ver Productos"
            >

              Ver Productos
            </Link> */}
            <a className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" aria-label="Ver Productos" href="/products">Ver Productos</a>
            <a aria-label="¿Quieres vender?" href="/seller-plan" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-2 sm:mt-0">
              ¿Quieres vender? &rarr;
            </a>

            <a aria-label="Ver Trabaja con nosotros" href='https://api.whatsapp.com/send/?phone=5930983537312' className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-2 sm:mt-0">
              Trabaja con nosotros&rarr;
            </a>



          </div>
        </div>

        <Carrucel query={{ limit: 100 }}
          href='/products?sort=recent'
        />

        <ProductReelPremium
          query={{ limit: 4 }}
          href='/products?sort=recent'
          title='Productos Nuevos'
        />
        <ProductReelBusiness
          query={{ limit: 6 }}
          href='/products?category=business'
          title='Negocios'
        />
        {/* <ProductReelProduct
          query={{ limit: 8 }}
          href='/products?sort=recent'
          title='Nuevos'
          productExcept={['business', 'international']} // Añade esta línea
        /> */}
        <ProductReelProduct
          query={{ limit: 4 }}
          href='/products?category=international'
          title='Internacional'
          productExcept={['business', 'rentals', 'tasks', 'art_and_accessories', 'beverages', 'sports', 'services', 'fashion_and_beauty', 'food', 'technology']} // Añade esta línea
        />


        <div className='flex flex-col  gap-4 my-6'>
          {/* <Link
            href='/products'
            aria-label="Explorar mas productos"
            className={buttonVariants()}>
            Explorar mas productos
          </Link> */}
          <a aria-label="Explorar mas productos" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" href="/products">Explorar mas productos</a>
        </div>

      </MaxWidthWrapper>

    </>
  )
}
