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
      <MaxWidthWrapper className='px-2.5 md:px-20'>

        <div className=' mx-auto text-center flex flex-col items-center max-w-3xl'>
          <Icons.logo className='h-50 w-80 ' />
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
          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            <Link
              href='/products'
              className={buttonVariants()}>
              Ver Productos
            </Link>
            <Button variant='ghost'>
              <a href='#quality-section'>¿Quiénes somos? &rarr;</a>
            </Button>
          </div>
        </div>

        <Carrucel query={{ limit: 100 }}
          href='/products?sort=recent'
        />
        <ProductReelPremium
          query={{limit: 4 }}
          href='/products?sort=recent'
          title='Productos Populares'
        />
        <ProductReel
          query={{ limit: 8 }}
          href='/products?sort=recent'
          title='Nuevos'
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
                      </svg>
                      Proveemos soluciones empresariales exitosamente desde 1999
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full px-6 mb-10 lg:w-1/2 lg:mb-0 ">
                <div className="pl-4 mb-6 border-l-4 border-primary ">
                  <span className="text-sm text-gray-600 uppercase dark:text-gray-400">¿Quiénes somos?</span>
                  <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl dark:text-gray-300">
                    Acerca de nosotros
                  </h1>
                </div>
                <p className="mb-6 text-base leading-7 text-gray-500 dark:text-gray-400">
                  En ESPE SHOP, nuestro compromiso es impulsar tus ambiciones comerciales ofreciendo una plataforma fácil de usar, conexiones clave en la industria y eventos exclusivos para fortalecer tu red. Desde productos hechos a mano hasta servicios únicos, ESPE SHOP es el lugar donde los emprendedores estudiantiles pueden destacar y prosperar.
                </p>
                <a href="/seller-plan"
                  className={buttonVariants()}>
                  Comenzar
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
