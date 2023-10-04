'use client'
import AuthButton from '@/app/auth/authButton/authButton'
import { baseAnimation } from '@/components/animations/baseAnimation'
import { AuthService } from '@/services/auth/auth.service'
import Button from '@/ui/common/buttons/Button'
import Field from '@/ui/common/input/Field'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import style from './reset.module.scss'

interface IPasswordResetForm {
	password: string
}

const Reset: FC = () => {
	const [passwordResetStatus, setPasswordResetStatus] = useState<string | null>(
		null
	)
	const pathName = usePathname()
	const pathParts = pathName.split('/')
	const tokenParam = pathParts[pathParts.length - 1]
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IPasswordResetForm>({
		mode: 'onChange'
	})

	// Декодирование и разделение токена и адреса электронной почты
	const DELIMITER = '<<>>'
	const [email, token] = decodeURIComponent(tokenParam).split(DELIMITER)

	const onSubmit: SubmitHandler<IPasswordResetForm> = async data => {
		try {
			const newPassword = data.password

			if (email && token) {
				await AuthService.applyNewPassword({ email, token, newPassword })
				setPasswordResetStatus('Password successfully reset.')
				reset()
			} else if (!email) {
				setPasswordResetStatus('Could not retrieve email. Please try again.')
			} else if (!token) {
				setPasswordResetStatus('Could not retrieve token. Please try again.')
			}
		} catch (error) {
			setPasswordResetStatus('An error occurred. Please try again.')
		}
	}

	return (
		<motion.section
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			variants={baseAnimation}
			className='flex container-f relative '
		>
			{passwordResetStatus ? (
				<div className={`'rounded-lg bg-white m-auto w-full', ${style.form}`}>
					<p className={style.message}>{passwordResetStatus}</p>
					<Link className={style.btn} href={'/auth'}>
						<Button data-hover='Sing In' variant={'grey'}>
							Sing In
						</Button>
					</Link>
				</div>
			) : (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={`'rounded-lg bg-white m-auto w-full', ${style.form}`}
				>
					<Field
						{...formRegister('password', {
							required: 'Password is required',
							minLength: {
								value: 6,
								message: 'Min length should be at least 6 symbols'
							}
						})}
						type='password'
						placeholder='Password'
						error={errors.password?.message}
					/>

					<AuthButton variant='grey'>Reset</AuthButton>
				</form>
			)}
		</motion.section>
	)
}

export default Reset
