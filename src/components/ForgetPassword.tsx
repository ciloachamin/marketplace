"use client"
import { trpc } from '@/trpc/client'
import { Loader2, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { useRouter } from 'next/navigation'
interface ResetPasswordProps {
  token: string
  password: string
}

const ResetPassword = ({ token , password }: ResetPasswordProps) => {

    const router = useRouter()
  const { data, isLoading, isError } =
    trpc.auth.resetPassword.useQuery({
        token,
        password,
    })

  if (isError) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <XCircle className='h-8 w-8 text-red-600' />
        <h3 className='font-semibold text-xl'>
            Hubo un problema
        </h3>
        <p className='text-muted-foreground text-sm'>
          Este token no es válido o podría haber expirado.
          Por favor, inténtalo de nuevo.
        </p>
        <Link
          className={buttonVariants({ className: 'mt-4' })}
          aria-label="Cambiar contraseña"
          href='/forget-password'>
          Cambiar contraseña
        </Link>
      </div>
    )
  }

  if (data?.success) {
    return (
      <div className='flex h-full flex-col items-center justify-center'>
        <div className='relative mb-4 h-60 w-60 text-muted-foreground'>  
          <Image
            src={process.env.NEXT_PUBLIC_SERVER_URL + '/cocodrilo-espe-carta.png'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt='el correo electrónico fue enviado'
          />
        </div>

        <h3 className='font-semibold text-2xl'>
          ¡Listo!
        </h3>
        <p className='text-muted-foreground text-center mt-1'>
          Tu contraseña ha sido restablecida exitosamente.
        </p>
        <Link
          className={buttonVariants({ className: 'mt-4' })}
          aria-label="Iniciar sesión"
          href='/sign-in'>
          Iniciar sesión
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='animate-spin h-8 w-8 text-zinc-300' />
        <h3 className='font-semibold text-xl'>
          Verificando...
        </h3>
        <p className='text-muted-foreground text-sm'>
          Esto no tomará mucho tiempo.
        </p>
      </div>
    )
  }
}

export default ResetPassword