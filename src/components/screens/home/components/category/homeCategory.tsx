import { FC } from 'react'

import Button from '@/ui/common/buttons/Button'

import { TypePaginationCategories } from '@/types/product.interface'

import style from './homecategory.module.scss'

const HomeCategory: FC<TypePaginationCategories> = ({
	categories,
	categoriesLength
}) => {
	// Создаем новый массив, содержащий только первые два сетапа
	const firstTwoSetups = categories.slice(0, categoriesLength)
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
					{firstTwoSetups.map(categories => (
						<div key={categories.id} className={style.item}>
							<div className={style.imageWrapper}>
								<img
									src={categories.image}
									alt={categories.name}
									className={style.image}
								/>
								<div className={style.plusBtn}>
									<Button data-hover='+' variant='btnPlusWhite'>
										+
									</Button>
								</div>
							</div>
							<div className={style.descr}>
								<h3>{categories.name}</h3>
								<h4>{categories.description}</h4>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}
export default HomeCategory
