import cn from 'clsx'
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

import style from '@/ui/button/button.module.scss'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'grey' | 'black'
}
const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	variant,
	...rest
}) => {
	return (
		<button
			{...rest}
			className={cn(
				`font-semibold px-20 py-4 ${style.button}`,
				{
					'text-white bg-primary': variant === 'grey',
					'text-white bg-black': variant === 'black'
				},
				className
			)}
		>
			{children}
		</button>
	)
}

export default Button
