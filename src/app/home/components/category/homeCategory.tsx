import Link from 'next/link'
import { FC } from 'react'

import Button from '@/ui/common/buttons/Button'

import { TypePaginationCategories } from '@/types/product.interface'

import { shimmer, toBase64 } from '@/components/common'
import Image from 'next/image'
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
						<div className={style.setupBtn}>
							<Link href={'/catalog/categories'}>
								<Button data-hover='categories' variant='grey'>
									categories
								</Button>
							</Link>
						</div>
					</div>
					<div className={style.categoryName}>
						<h2>Product categories</h2>
						<h3>
							Elevate your workspace with our handpicked selection of desk
							accessories. Whether you're looking to boost productivity or add a
							touch of style to your desk, we've got you covered. Discover a
							wide range of categories, including ergonomic mice, premium
							keyboards, desk mats, innovative lighting solutions, and more.
						</h3>
					</div>
					{firstTwoSetups.map(categories => (
						<div key={categories.id} className={style.item}>
							<div className={style.imageWrapper}>
								<Link href={`/catalog/categories/${categories.slug}`}>
									<Image
										width={1000}
										height={1000}
										src={categories.image}
										alt={categories.name}
										className={style.image}
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
							<div className={style.descr}>
								<h3>{categories.name}</h3>
								<h4>{categories.description}</h4>
							</div>
						</div>
					))}
					<Link href={'/catalog'} className={style.btnWrapper}>
						<Button data-hover='See all category' variant='grey'>
							See all category
						</Button>
					</Link>
				</div>
			</div>
		</>
	)
}
export default HomeCategory
