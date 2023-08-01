import { FC } from 'react'

import Button from '@/ui/common/buttons/Button'

import { TypePaginationSetup } from '@/types/product.interface'

import style from './homesetup.module.scss'

const HomeSetup: FC<TypePaginationSetup> = ({ setups, setupsLength }) => {
	// Создаем новый массив, содержащий только первые два сетапа
	const firstTwoSetups = setups.slice(0, setupsLength)

	return (
		<>
			<div className={style.category}>
				<div className={`${style.setup} container-f`}>
					<div className={style.btnWrapper}>
						<span className={style.numdot}>01</span>
						<Button data-hover='ready setup' variant='grey'>
							ready setup
						</Button>
					</div>
					<div className={style.categoryName}>
						<h2>Ready setup</h2>
						<h3>
							Upgrade your workspace with our collection of desk accessories! We
							offer a wide range of stylish and functional products, including
							organizers, pen holders, phone stands, desk lamps, portable
							chargers, and much more.
						</h3>
					</div>
					{firstTwoSetups.map(setup => (
						<div key={setup.id} className={style.item}>
							<div className={style.imageWrapper}>
								<img
									src={setup.image}
									alt={setup.name}
									className={style.image}
								/>
							</div>
							<div className={style.descr}>
								<h3>{setup.name}</h3>
								<h4>{setup.description}</h4>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default HomeSetup
