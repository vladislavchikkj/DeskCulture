'use client'
import AuthButton from '@/app/auth/authButton/authButton'
import { baseAnimation } from '@/components/animations/baseAnimation'
import { useLayout } from '@/components/context/LayoutContext'
import { useActions } from '@/hooks/useActions'
import { IEmailPassword } from '@/store/user/user.interface'
import Heading from '@/ui/common/heading/Heading'
import Field from '@/ui/common/input/Field'
import Loader from '@/ui/common/loader/Loader'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import style from '../auth.module.scss'
import { useAuthRedirect } from '../useAuthRedirect'
import { validEmail } from '../valid-email'

interface State {
	user: {
		isLoading: boolean
		error: string | null
	}
}

const Login: FC = () => {
	const { updateLayout } = useLayout()
	useEffect(() => {
		updateLayout(false)
	}, [])
	useAuthRedirect()
	const { isLoading, error } = useSelector((state: State) => state.user)
	const { login } = useActions()

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors }
	} = useForm<IEmailPassword>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IEmailPassword> = async data => {
		const loginData = {
			email: data.email,
			password: data.password
		}
		login(loginData)
	}

	return (
		<motion.section
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			variants={baseAnimation}
			className='flex h-screen container-f relative justify-center items-center bg-white flex-col'
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={`'rounded-lg bg-white  m-auto w-full', ${style.form}`}
			>
				<Heading variant='auth' className={style.heading}>
					Log In
				</Heading>
				{!isLoading && error && (
					<div className={style.error}>Invalid email or password.</div>
				)}
				<Field
					{...formRegister('email', {
						required: 'Email is required',
						pattern: {
							value: validEmail,
							message: 'Please enter a valid email address'
						}
					})}
					placeholder='E-mail'
					error={errors.email?.message}
				/>
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
				<AuthButton variant='grey' className={style.authBtn}>
					Sign In
				</AuthButton>
				<Link className={style.text} href={'/auth/recovery'}>
					forgot your password?
				</Link>
			</form>
			{isLoading && <Loader />}
		</motion.section>
	)
}

export default Login
