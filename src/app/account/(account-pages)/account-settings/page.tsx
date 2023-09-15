'use client' // Импортируйте ваш сервис пользователя
import { useProfile } from '@/hooks/useProfile'
import { UserService } from '@/services/user.service'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Account from '../Account'
import accountStyle from '../account.module.scss'
import style from './account-settings.module.scss'

type FormData = {
	name: string
	email: string
}

const AccountSettingsPage: FC = () => {
	const { profile } = useProfile()
	const [isNameEmpty, setIsNameEmpty] = useState(false)
	const [isEmailEmpty, setIsEmailEmpty] = useState(false)
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<FormData>({
		defaultValues: {
			name: profile?.name || '',
			email: profile?.email || ''
		}
	})

	const onSubmit: SubmitHandler<FormData> = async data => {
		try {
			if (!data.name) {
				setIsNameEmpty(true)
				return
			}

			if (!data.email) {
				setIsEmailEmpty(true)
				return
			}

			await UserService.updateProfile(data)
			alert('The profile has been successfully updated!')
			window.location.reload()
		} catch (error) {
			console.error('Error updating profile:', error)
		}
	}

	return (
		<Account>
			<div>
				<h1 className={accountStyle.title}>PERSONAL INFORMATION</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={style.info}>
						<div className={style.group}>
							<label className={style.label} htmlFor='name'>
								Name:
							</label>
							<input
								className={`${style.input} ${isNameEmpty ? style.empty : ''}`}
								type='text'
								id='name'
								{...register('name')}
							/>
							<span className={style.highlight}></span>
							<span className={style.bar}></span>
						</div>
						<div className={style.group}>
							<label className={style.label} htmlFor='email'>
								Email:
							</label>
							<input
								className={`${style.input} ${isEmailEmpty ? style.empty : ''}`}
								type='email'
								id='email'
								{...register('email')}
							/>
							<span className={style.highlight}></span>
							<span className={style.bar}></span>
						</div>
						<button className={style.btn} type='submit'>
							SAVE CHANGES
						</button>
					</div>
				</form>
			</div>
		</Account>
	)
}

export default AccountSettingsPage
