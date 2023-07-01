import {
	welcomeLogin,
	welcomeMessage,
	welcomeRegister
} from '@components/common'
import Loader from '@ui/Loader'
import Meta from '@ui/Meta'
import Button from '@ui/button/button'
import Heading from '@ui/heading'
import Field from '@ui/input/Field'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IEmailPassword } from '@/store/user/user.interface'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import { validEmail } from './valid-email'

const Auth: FC = () => {
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
					<Heading>{type}</Heading>

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
							<Button variant='grey'>Register</Button>{' '}
							<Button
								type='button'
								variant='changer'
								className='block mt-3 text-center mx-auto'
								onClick={swithRegisterLogin}
							>
								{type === welcomeLogin
									? 'Create an account'
									: 'Already have an account? Sign In'}
							</Button>
						</>
					)}
				</form>
			</section>
		</Meta>
	)
}

export default Auth
