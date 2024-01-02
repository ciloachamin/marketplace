'use client'

import { Icons } from '@/components/Icons'
import {
  Button,
  buttonVariants,
} from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import {
  UserCredentialsValidator,
  TUserCredentialsValidator,
} from '@/lib/validators/user-create'
import { trpc } from '@/trpc/client'
import { toast } from 'sonner'
import { ZodError } from 'zod'
import { useRouter } from 'next/navigation'

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserCredentialsValidator>({
    resolver: zodResolver(UserCredentialsValidator),
  })

  const router = useRouter()

  const { mutate, isLoading } =
    trpc.auth.createPayloadUser.useMutation({
      onError: (err) => {
        if (err.data?.code === 'CONFLICT') {
          toast.error(
            'This email is already in use. Sign in instead?'
          )

          return
        }

        if (err instanceof ZodError) {
          toast.error(err.issues[0].message)

          return
        }

        toast.error(
          'Something went wrong. Please try again.'
        )
      },
      onSuccess: ({ sentToEmail }) => {
        toast.success(
          `Verification email sent to ${sentToEmail}.`
        )
        router.push('/verify-email?to=' + sentToEmail)
      },
    })

  const onSubmit = ({
    email,
    password,
    firstName,
    lastName,
    phone,

  }: TUserCredentialsValidator) => {
    mutate({ email, password, firstName, lastName, phone})
  }

  return (
    <>
      <div className='container relative flex  flex-col items-center justify-center p-20 lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <Icons.logo className='h-20 w-20' />
            <h1 className='text-2xl font-semibold tracking-tight'>
              Crear una cuenta
            </h1>

            <Link
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
              href='/sign-in'>
              ¿Ya tienes una cuenta? Iniciar sesión
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>

          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='email'>Correo</Label>
                  <Input
                    {...register('email')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.email,
                    })}
                    placeholder='tu@ejemplo.com'
                    maxLength={50}
                  />
                  {errors?.email && (
                    <p className='text-sm text-red-500'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className='grid gap-1 py-2'>
                  <Label htmlFor='password'>Contraseña</Label>
                  <Input
                    {...register('password')}
                    type='password'
                    className={cn({
                      'focus-visible:ring-red-500': errors.password,
                    })}
                    placeholder='******'
                    maxLength={50}
                  />
                  {errors?.password && (
                    <p className='text-sm text-red-500'>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className='grid gap-1 py-2'>
                  <Label htmlFor='firstName'>Nombre</Label>
                  <Input
                    {...register('firstName')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.firstName,
                    })}
                    placeholder='Nombre'
                    maxLength={50}
                  />
                  {errors?.firstName && (
                    <p className='text-sm text-red-500'>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className='grid gap-1 py-2'>
                  <Label htmlFor='lastName'>Apellido</Label>
                  <Input
                    {...register('lastName')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.lastName,
                    })}
                    placeholder='Apellido'
                    maxLength={50}
                  />
                  {errors?.lastName && (
                    <p className='text-sm text-red-500'>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div className='grid gap-1 py-2'>
                    <Label htmlFor='phone'>Teléfono</Label>
                  <Input
                    {...register('phone')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.phone,
                    })}
                    placeholder='0955555555'
                    maxLength={10}
                    name="phone"
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const numericValue = inputValue.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
                      e.target.value = numericValue;
                    }}
                  />
                  {errors?.phone && (
                    <p className='text-sm text-red-500'>
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <Button>Registrarse</Button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default Page
