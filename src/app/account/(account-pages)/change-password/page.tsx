'use client'
import { AuthService } from '@/services/auth/auth.service'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Account from '../Account'
import style from '../account-settings/account-settings.module.scss'
import accountStyle from '../account.module.scss'

type PasswordFormData = {
	currentPassword: string
	newPassword: string
	confirmNewPassword: string
}

const ChangePasswordPage: FC = () => {
	const [message, setMessage] = useState<string>('')
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch
	} = useForm<PasswordFormData>()

	const onSubmit: SubmitHandler<PasswordFormData> = async data => {
		try {
			const response = await AuthService.changePassword({
				oldPassword: data.currentPassword,
				newPassword: data.newPassword
			})

			if (response) {
				setMessage('Password successfully changed.')
			}
		} catch (error) {
			setMessage('Current password is incorrect.')
		}
	}

	return (
		<Account>
			<div>
				<h1 className={accountStyle.title}>Change Password</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={style.info}>
						<div className={style.group}>
							<label className={style.label}>Current Password</label>
							<input
								className={style.input}
								type='password'
								{...register('currentPassword', { required: true })}
							/>
							<span className={style.highlight}></span>
							<span className={style.bar}></span>
							{errors.currentPassword && <span>This field is required</span>}
						</div>
						<div className={style.group}>
							<label className={style.label}>New Password</label>
							<input
								className={style.input}
								type='password'
								{...register('newPassword', { required: true })}
							/>
							<span className={style.highlight}></span>
							<span className={style.bar}></span>
							{errors.newPassword && <span>This field is required</span>}
						</div>
						<div className={style.group}>
							<label className={style.label}>Confirm New Password</label>
							<input
								className={style.input}
								type='password'
								{...register('confirmNewPassword', {
									required: true,
									validate: value => value === watch('newPassword')
								})}
							/>
							<span className={style.highlight}></span>
							<span className={style.bar}></span>
							{errors.confirmNewPassword && <span>Passwords must match</span>}
						</div>
						<span className={style.message}>{message}</span>
						<button className={style.btn} type='submit'>
							Change Password
						</button>
					</div>
				</form>
			</div>
		</Account>
	)
}

export default ChangePasswordPage
