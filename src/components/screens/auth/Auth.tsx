import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
	welcomeLogin,
	welcomeMessage,
	welcomeRegister
} from '@/components/common'

import Meta from '@/ui/Meta'
import Heading from '@/ui/common/heading/Heading'
import Field from '@/ui/common/input/Field'
import Loader from '@/ui/common/loader/Loader'

import { IEmailPassword } from '@/store/user/user.interface'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import style from './auth.module.scss'
import { useAuthRedirect } from './useAuthRedirect'
import { validEmail } from './valid-email'
import AuthButton from '@/screens/auth/authButton/authButton'

const Auth: FC = () => {
	useAuthRedirect()
	const { isLoading } = useAuth()
	const { login, register } = useActions()

	const [type, setType] = useState<welcomeMessage>(welcomeLogin)
	const [showUsername, setShowUsername] = useState<boolean>(false) // New state
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
			login(data)
		} else {
			const registrationData = showUsername
				? { ...data, name: data.name }
				: data
			register(registrationData)
		}

		reset()
	}

	const switchRegisterLogin = () => {
		setType(type === welcomeLogin ? welcomeRegister : welcomeLogin)
		setShowUsername(type === welcomeLogin) // Show username field only for registration
	}
	return (
		<Meta title='Auth'>
			<section className='flex h-screen container-f'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={`'rounded-lg bg-white  m-auto w-full', ${style.form}`}
				>
					<Heading variant='auth'>{type}</Heading>

					{isLoading ? (
						<Loader />
					) : (
						<>
							{showUsername && ( // Show username field conditionally
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
						</>
					)}
				</form>
			</section>
		</Meta>
	)
}

export default Auth
