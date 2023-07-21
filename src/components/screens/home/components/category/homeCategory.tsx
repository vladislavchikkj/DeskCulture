import Image from 'next/image'
import { FC } from 'react'

import Button from '@/ui/common/buttons/Button'

import style from './homecategory.module.scss'
import testImg3 from './img/category-1.png'
import testImg4 from './img/category-2.png'

const HomeCategory: FC = () => {
	return (
		<>
			<div className={style.category}>
				<div className={`${style.setup} container-f`}>
					<div className={style.btnWrapper}>
						<span className={style.numdot}>02</span>
						<Button data-hover='categories' variant='grey'>
							categories
						</Button>
					</div>
					<div className={style.categoryName}>
						<h2>Product categories</h2>
						<h3>
							Upgrade your workspace with our collection of desk accessories! We
							offer a wide range of stylish and functional products, including
							organizers, pen holders, phone stands, desk lamps, portable
							chargers, and much more.
						</h3>
					</div>
					<div className={style.item}>
						<Image src={testImg3} alt={'img'}></Image>
						<div className={style.descr}>
							<h3>Desk Mats</h3>
							<h4>
								Elevate your workspace with our premium mouse pads, designed to
								enhance your productivity and declutter your setup.
							</h4>
						</div>
					</div>
					<div className={style.item}>
						<Image src={testImg4} alt={'img'}></Image>
						<h3>Stands</h3>
						<h4>
							Ideal for crafting a versatile workstation, catering to laptops,
							smartphones, and tablets alike.
						</h4>
					</div>
				</div>
			</div>
		</>
	)
}
export default HomeCategory
