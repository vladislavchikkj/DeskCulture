'use client'

import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Field from '@/ui/common/input/Field'

import { IEmailPassword } from '@/store/user/user.interface'

import AuthButton from '@/app/auth/authButton/authButton'
import { baseAnimation } from '@/components/animations/baseAnimation'
import { AuthService } from '@/services/auth/auth.service'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { validEmail } from '../valid-email'
import style from './recovery.module.scss'

const Recovery: FC = () => {
	// Create a state variable for successful email sending
	const [emailSent, setEmailSent] = useState(false)
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset,
		setError
	} = useForm<IEmailPassword>({
		mode: 'onChange'
	})
	const onSubmit: SubmitHandler<IEmailPassword> = async data => {
		try {
			const message = await AuthService.resetPassword(data)
			setEmailSent(true)
			reset()
		} catch (error: any) {
			setError('email', {
				type: 'manual',
				message: 'Error sending reset password email, please try again'
			})
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
			{/* Check if email has been sent, if so, display message, if not, render form */}
			{emailSent ? (
				<div className={` ${style.form}`}>
					<p>Successfully sent. Please, check your email.</p>
				</div>
			) : (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={`'rounded-lg bg-white m-auto w-full', ${style.form}`}
				>
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
					<AuthButton variant='grey'>Send</AuthButton>
					<Link className={style.text} href={'/auth'}>
						Sing In
					</Link>
				</form>
			)}
		</motion.section>
	)
}

export default Recovery
