import { motion } from 'framer-motion'
import { FC } from 'react'

import SetupList from '@/ui/catalog/setupsList/SetupsList'
import Button from '@/ui/common/buttons/Button'

import { IProduct } from '@/types/product.interface'
import { ISetups } from '@/types/setups.interface'

import style from './setup.module.scss'

type props = {
	products: IProduct[]
	setups: ISetups
	allSetups: ISetups[]
}

const Setup: FC<props> = ({ products, setups, allSetups }) => {
	const introAnimation = {
		hidden: {
			height: 0
		},
		visible: (custom: number) => ({
			height: '35vw',
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
	return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			className={style.setup}
		>
			<div className={style.introWrapper}>
				<motion.div variants={introAnimation} className={style.intro}>
					<motion.img
						variants={imageAnimation}
						className={style.image}
						src={setups.image}
						alt={setups.name}
					/>
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

					<div className={style.setupItems}>
						<div className={style.setupItem}>
							<div className={style.prodName}>product 1</div>
							<div className={style.arr}>›</div>
						</div>
						<div className={style.setupItem}>
							<div className={style.prodName}>product 2</div>
							<div className={style.arr}>›</div>
						</div>
						<div className={style.setupItem}>
							<div className={style.prodName}>product 3</div>
							<div className={style.arr}>›</div>
						</div>
						<div className={style.setupItem}>
							<div className={style.prodName}>product 4</div>
							<div className={style.arr}>›</div>
						</div>
					</div>
				</div>
				<div>
					<div className={style.buttons}>
						<Button data-hover='See more' variant={'grey'}>
							See more
						</Button>
						<Button data-hover='ready setup' variant={'black'}>
							ready setup
						</Button>
					</div>
				</div>
				<div>
					<div className={style.intrested}>
						<div className={style.btnWrapper}>
							<span className={style.numdot}>01</span>
							<Button data-hover='ready setup' variant='grey'>
								ready setup
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
