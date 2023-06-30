import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'

interface IHeading {
	className?: string
}

const Heading: FC<PropsWithChildren<IHeading>> = ({ className, children }) => {
	return (
		<>
			<h1
				className={cn(
					'text-3x1 uppercase text-center mb-10 text-secondary text-25 font-medium leading-9 tracking-wider',
					className
				)}
			>
				{children}
			</h1>
			<h2
				className={cn(
					'text-center mb-4 text-greySub text-10 font-medium',
					className
				)}
			>
				Sign In with your email
			</h2>
		</>
	)
}

export default Heading
