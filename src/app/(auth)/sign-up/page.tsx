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
            'Este correo electrónico ya está en uso. ¿Prefieres iniciar sesión?'
          )

          return
        }

        if (err instanceof ZodError) {
          toast.error(err.issues[0].message)

          return
        }

        toast.error(
          'Algo salió mal. Por favor, vuelva a intentarlo.'
        )
      },
      onSuccess: ({ sentToEmail }) => {
        toast.success(
          `Correo electrónico de verificación enviado a ${sentToEmail}.`
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
    campus,

  }: TUserCredentialsValidator) => {
    mutate({ email, password, firstName, lastName, phone, campus })
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
              aria-label='¿Ya tienes una cuenta? Iniciar sesión'
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
                  <Label htmlFor='campus'>Campus</Label>
                  <select
                    {...register('campus')}
                    className={cn('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-red-50', {
                      'focus-visible:ring-red-500': errors.campus,
                    })}
                  >
                    <option value=''>Seleccione un campus</option>
                    <option value='matriz'>Matriz</option>
                    <option value='iasa'>IASA</option>
                    <option value='latacunga'>Latacunga</option>
                  </select>
                  {errors?.campus && (
                    <p className='text-sm text-red-500'>
                      {errors.campus.message}
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
                    name="phone"
                    type='number'
                    maxLength={10}
                    onKeyDown={(e) => {
                      // Permitir solo números, Backspace, Delete, flechas, tab y enter
                      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];
                      const regex = /[0-9]/;
                      
                      if (!regex.test(e.key) && !allowedKeys.includes(e.key)) {
                        e.preventDefault();
                      }
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
