'use client'

import AuthButton from '@/app/auth/authButton/authButton'
import { baseAnimation } from '@/components/animations/baseAnimation'
import {
	welcomeLogin,
	welcomeMessage,
	welcomeRegister
} from '@/components/common'
import { useLayout } from '@/components/context/LayoutContext'
import { useActions } from '@/hooks/useActions'
import { IEmailPassword } from '@/store/user/user.interface'
import Field from '@/ui/common/input/Field'
import Loader from '@/ui/common/loader/Loader'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import style from './auth.module.scss'
import { useAuthRedirect } from './useAuthRedirect'
import { validEmail } from './valid-email'

interface State {
	user: {
		isLoading: boolean
		error: string | null
	}
}

const Auth: FC = () => {
	const { updateLayout } = useLayout()
	useEffect(() => {
		updateLayout(false)
	}, [])
	useAuthRedirect()
	const { isLoading, error } = useSelector((state: State) => state.user)
	const { login, register } = useActions()

	const [type, setType] = useState<welcomeMessage>(welcomeLogin)
	const [showUsername, setShowUsername] = useState<boolean>(false)
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IEmailPassword>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IEmailPassword> = async data => {
		if (type === welcomeLogin) {
			const loginData = {
				email: data.email,
				password: data.password
			}
			login(loginData)
		} else {
			const registrationData = {
				...data,
				name: data.name
			}
			register(registrationData)
		}
	}

	const switchRegisterLogin = () => {
		setType(type === welcomeLogin ? welcomeRegister : welcomeLogin)
		setShowUsername(type === welcomeLogin)
	}

	return (
		<motion.section
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			variants={baseAnimation}
			className='flex h-screen container-f relative justify-center align-middle'
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={`'rounded-lg bg-white  m-auto w-full', ${style.form}`}
			>
				<>
					{!isLoading && error && (
						<div className={style.error}>
							{type === welcomeLogin
								? 'Invalid email or password.'
								: `User with this name or email already exists`}
						</div>
					)}
					{showUsername && (
						<>
							<Field
								className='pb-4'
								{...formRegister('name', {
									required: 'Username is required'
								})}
								placeholder='your name'
								error={errors.name?.message}
							/>
						</>
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
					<AuthButton variant='grey'>
						{type === welcomeLogin ? 'Sign In' : 'Register'}
					</AuthButton>
					<AuthButton
						type='button'
						variant='authChanger'
						className='block mt-3 text-center mx-auto'
						onClick={switchRegisterLogin}
					>
						{type === welcomeLogin
							? 'Create an account'
							: 'Already have an account? Sign In'}
					</AuthButton>
					<Link className={style.text} href={'/auth/recovery'}>
						forgot your password?
					</Link>
				</>
			</form>

			{isLoading && <Loader />}
		</motion.section>
	)
}

export default Auth
