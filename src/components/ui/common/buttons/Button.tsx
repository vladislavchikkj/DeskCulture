import cn from 'clsx'
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

import style from './button.module.scss'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'grey' | 'black' | 'btnArrow' | 'btnPlus' | 'btnArrowMenu'
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
				``,
				{
					[style.greyTypeBtn]: variant === 'grey',
					[style.blackTypeBtn]: variant === 'black',
					[style.btnArrow]: variant === 'btnArrow',
					[style.btnArrowMenu]: variant === 'btnArrowMenu',
					[style.btnPlus]: variant === 'btnPlus'
				},
				className
			)}
		>
			<span className={style.text}>{children}</span>
		</button>
	)
}

export default Button
