import cn from 'clsx'
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

import style from './authButton.module.scss'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'grey' | 'black' | 'authChanger'
}
const AuthButton: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	variant,
	...rest
}) => {
	return (
		<button
			{...rest}
			className={cn(
				`font-semibold ${style.button}`,
				{
					'text-white bg-primary': variant === 'grey',
					'text-white bg-black': variant === 'black',
					'text-black ': variant === 'authChanger'
				},
				className
			)}
		>
			{children}
		</button>
	)
}

export default AuthButton
