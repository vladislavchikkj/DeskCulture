'use client'
import Link from 'next/link'
import React, { useState } from 'react'

import Loader from '@/ui/common/loader/Loader'

import { ISetups } from '@/types/setups.interface'

import setupStyle from '../catalogSetups.module.scss'

interface SetupProps {
	setups: ISetups[] // Заменить на соответствующий тип
}

const SetupList: React.FC<SetupProps> = ({ setups }) => {
	const [isLoading, setIsLoading] = useState(false) // Добавляем стейт для загрузки
	return (
		<div className={setupStyle.itemWrapper}>
			{isLoading ? ( // Если isLoading === true, показываем лоадер
				<Loader />
			) : (
				setups.map(setup => (
					<div key={setup.id} className={setupStyle.item}>
						<div className={setupStyle.imageWrapper}>
							<Link href={`/catalog/setups/${setup.id}`}>
								<img
									src={setup.image}
									alt={setup.name}
									className={setupStyle.image}
								/>
							</Link>
						</div>
						<div className={setupStyle.descr}>
							<h3>{setup.name}</h3>
							<h4>{setup.description}</h4>
						</div>
					</div>
				))
			)}
		</div>
	)
}

export default SetupList
