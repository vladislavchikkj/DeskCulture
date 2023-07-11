import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'

import headingStyle from './heading.module.scss'

interface IHeading {
	className?: string
	variant?: string
}

const Heading: FC<PropsWithChildren<IHeading>> = ({
	className,
	children,
	variant
}) => {
	return (
		<h1
			className={cn(
				'',
				{
					[headingStyle.heading]: variant === 'catalog',
					'text-3x1 uppercase text-center mb-10 text-secondary text-25 font-medium leading-9 tracking-wider':
						variant === 'auth'
				}, // вынести в файл стилей
				className
			)}
		>
			{children}
		</h1>
	)
}

export default Heading
