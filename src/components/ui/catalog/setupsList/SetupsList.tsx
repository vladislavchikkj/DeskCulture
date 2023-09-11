'use client'
import Link from 'next/link'
import React, { useState } from 'react'

import Loader from '@/ui/common/loader/Loader'

import { ISetups } from '@/types/setups.interface'

import { baseAnimation } from '@/components/animations/baseAnimation'
import { motion } from 'framer-motion'
import setupStyle from '../catalogSetups.module.scss'

interface SetupProps {
	setups: ISetups[] // Заменить на соответствующий тип
}

const SetupList: React.FC<SetupProps> = ({ setups }) => {
	const [isLoading, setIsLoading] = useState(false) // Добавляем стейт для загрузки
	return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			variants={baseAnimation}
			className={setupStyle.itemWrapper}
		>
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
		</motion.div>
	)
}

export default SetupList
