import cn from 'clsx'
import { forwardRef } from 'react'

import { IField } from './field.interface'
import styleField from './field.module.scss'

const Field = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, className, type = 'text', style, ...rest }, ref) => {
		return (
			<div className={cn('mb-3', className)} style={style}>
				<label>
					<input
						ref={ref}
						type={type}
						placeholder={placeholder}
						className={cn(`mb-3 px-4 py-2 ${styleField.input}`, {
							'border-red': !!error
						})}
						{...rest}
					/>
				</label>
				{error && <div className='text-red mt-1 text-sm'>{error}</div>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
