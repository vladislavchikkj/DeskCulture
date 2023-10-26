'use client'
import Link from 'next/link'
import React, { useState } from 'react'

import Loader from '@/ui/common/loader/Loader'

import { ISetups } from '@/types/setups.interface'

import { baseAnimation } from '@/components/animations/baseAnimation'
import { shimmer, toBase64 } from '@/components/common'
import { motion } from 'framer-motion'
import Image from 'next/image'
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
								<Image
									width={500}
									height={500}
									src={setup.image}
									alt={setup.name}
									className={setupStyle.image}
									placeholder={`data:image/svg+xml;base64,${toBase64(
										shimmer(700, 475)
									)}`}
									style={{
										maxWidth: '100%',
										height: 'auto'
									}}
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
