'use client'
import ForgetPassword from '@/components/ForgetPassword'
import Image from 'next/image'
import {
    Button,
    buttonVariants,
} from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    ResetPasswordCredentialsValidator,
    TResetPasswordCredentialsValidator,
} from '@/lib/validators/reset-password'
import { useState } from 'react'
interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const ResetPasswordPage = ({ searchParams }: PageProps) => {
    const token = searchParams.token
    const toEmail = searchParams.to

    const [newPassword, setNewPassword] = useState<string>(''); // Update the type of newPassword to string
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TResetPasswordCredentialsValidator>({
        resolver: zodResolver(ResetPasswordCredentialsValidator),
    })



    const onSubmit = ({
        password,
    }: TResetPasswordCredentialsValidator) => {
        setNewPassword(password)
    }

    return (
        <div className='container relative flex pt-20 pb-10 flex-col items-center justify-center lg:px-0'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                {token && typeof token === 'string' ? (
                    <div className='grid gap-6'>
                        {!newPassword && ( // No renderizar el formulario si newPassword no está vacío
                            <div className='grid gap-6'>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='grid gap-2'>
                                        <div className='relative mb-4 h-60 w-60 text-muted-foreground'>

                                            <Image
                                                src={process.env.NEXT_PUBLIC_SERVER_URL + '/cocodrilo-espe-carta.png'}
                                                fill
                                                alt='ESPE SHOP email sent image'
                                            />
                                        </div>
                                        <h3 className='font-semibold text-2xl'>
                                            Ingresa tu nueva contraseña
                                        </h3>
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
                                        <Button>Registrarse</Button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Renderizar ForgetPassword solo si newPassword no está vacío */}
                        {newPassword && (
                            <ForgetPassword token={token} password={newPassword} />
                        )}
                    </div>
                ) : (
                    <div className='flex h-full flex-col items-center justify-center space-y-1'>
                        <div className='relative mb-4 h-60 w-60 text-muted-foreground'>

                            <Image
                                src={process.env.NEXT_PUBLIC_SERVER_URL + '/cocodrilo-espe-carta.png'}
                                fill
                                alt='ESPE SHOP email sent image'
                            />
                        </div>

                        <h3 className='font-semibold text-2xl'>
                            Revisa Tu Correo
                        </h3>

                        {toEmail ? (
                            <p className='text-muted-foreground text-center'>
                                Hemos enviado un enlace para restablecer la contraseña a {' '}
                                <span className='font-semibold'>
                                    {toEmail}
                                </span>
                                .
                            </p>
                        ) : (
                            <p className='text-muted-foreground text-center'>
                                Hemos enviado un enlace de cambio de contraseña a tu correo electrónico.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ResetPasswordPage
