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

import { useAuthRedirect } from './useAuthRedirect'
import { validEmail } from './valid-email'
import AuthButton from '@/screens/auth/authButton/authButton'

const Auth: FC = () => {
	useAuthRedirect()
	const { isLoading } = useAuth()
	const { login, register } = useActions()

	const [type, setType] = useState<welcomeMessage>(welcomeLogin)
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IEmailPassword>({
		mode: 'onChange'
	})
	const onSubmit: SubmitHandler<IEmailPassword> = data => {
		if (type === welcomeLogin) login(data)
		else register(data)

		reset()
	}
	const swithRegisterLogin = () =>
		setType(type === welcomeLogin ? welcomeRegister : welcomeLogin)

	return (
		<Meta title='Auth'>
			<section className='flex h-screen'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='rounded-lg bg-white p-10 m-auto'
				>
					<Heading variant='auth'>{type}</Heading>

					{isLoading ? (
						<Loader />
					) : (
						<>
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
							></Field>
							<Field
								{...formRegister('password', {
									required: 'Password is required',
									minLength: {
										value: 6,
										message: 'Min length shold more 6 symbols'
									}
								})}
								type='password'
								placeholder='Password'
								error={errors.password?.message}
							></Field>
							<AuthButton variant='grey'>
								{type === welcomeLogin ? 'Sign In' : 'Register'}
							</AuthButton>{' '}
							<AuthButton
								type='button'
								variant='authChanger'
								className='block mt-3 text-center mx-auto'
								onClick={swithRegisterLogin}
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
