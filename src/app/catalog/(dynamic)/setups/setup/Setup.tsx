'use client'
import { motion } from 'framer-motion'
import { FC, useEffect } from 'react'

import Button from '@/ui/common/buttons/Button'

import { IProduct } from '@/types/product.interface'
import { ISetups } from '@/types/setups.interface'

import { shimmer, toBase64 } from '@/components/common'
import { useLayout } from '@/components/context/LayoutContext'
import useCustomMediaQuery from '@/hooks/useCustomMediaQuery'
import SetupList from '@/ui/catalog/setupsList/SetupsList'
import Image from 'next/image'
import NotFound from '../../categories/not-found'
import style from './setup.module.scss'
import SetupProductItem from './setupProductItem/SetupProductItem'

type props = {
	products: IProduct[]
	setups: ISetups
	allSetups: ISetups[]
}

const Setup: FC<props> = ({ products, setups, allSetups }) => {
	const { updateLayout } = useLayout()
	useEffect(() => {
		updateLayout(false)
	}, [])
	const device = useCustomMediaQuery()

	if (device === null) {
		return <div>Loading...</div>
	}

	const introAnimation = {
		hidden: {
			height: 0
		},
		visible: (custom: number) => ({
			height: device === 'mobile_m' ? '40vh' : '35vw',
			transition: { duration: 0.8, delay: custom * 0.2 }
		})
	}
	const imageAnimation = {
		hidden: {
			scale: 1.2
		},
		visible: (custom: number) => ({
			scale: 1,
			transition: { duration: 0.8, delay: custom * 0.2 }
		})
	}
	const prodAnimation = {
		hidden: {
			y: 300,
			opacity: 0
		},
		visible: (custom: number) => ({
			y: 0,
			opacity: 1,
			transition: { duration: 0.8, delay: custom * 0.2 }
		})
	}
	if (!setups.products) {
		return <NotFound></NotFound>
	}
	return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			className={style.setup}
		>
			<div className={style.introWrapper}>
				<motion.div variants={introAnimation} className={style.intro}>
					<motion.div variants={imageAnimation}>
						<Image
							width={1000}
							height={1000}
							className={style.image}
							src={setups.image}
							alt={setups.name}
							placeholder={`data:image/svg+xml;base64,${toBase64(
								shimmer(700, 475)
							)}`}
							style={{
								maxWidth: '100%',
								height: 'auto'
							}}
						/>
					</motion.div>
					<div className={`${style.name} container-f`}>{setups.name}</div>
				</motion.div>
			</div>
			<motion.div custom={2} variants={prodAnimation} className='container-f'>
				<div className={style.content}>
					<div className={style.btnWrapper}>
						<span className={style.numdot}>01</span>
						<Button data-hover='ready setup' variant='grey'>
							ready setup
						</Button>
					</div>
					<div className={style.categoryName}>
						<h2>{setups.name}</h2>
						<h3>{setups.description}</h3>
					</div>

					<SetupProductItem products={setups.products} />
				</div>
				<div>
					<div className={style.intrested}>
						<div className={style.btnWrapper}>
							<span className={style.numdot}>02</span>
							<Button data-hover='intrested' variant='grey'>
								intrested
							</Button>
						</div>
						<div className={style.title}>
							YOU MAY ALSO BE <br /> INTERESTED IN:
						</div>
					</div>
					<SetupList setups={allSetups} />
				</div>
			</motion.div>
		</motion.div>
	)
}

export default Setup
