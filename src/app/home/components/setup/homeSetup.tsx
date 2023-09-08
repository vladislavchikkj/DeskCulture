import Link from 'next/link'
import { FC, LegacyRef } from 'react'

import Button from '@/ui/common/buttons/Button'

import { TypePaginationSetup } from '@/types/product.interface'

import style from './homesetup.module.scss'

type HomeSetupProps = {
	homeRef?: LegacyRef<HTMLDivElement> | undefined
}
type prop = HomeSetupProps & TypePaginationSetup

const HomeSetup: FC<prop> = ({ setups, setupsLength, homeRef }) => {
	// Создаем новый массив, содержащий только первые два сетапа
	const firstTwoSetups = setups.slice(0, setupsLength)

	return (
		<>
			<div ref={homeRef} className={style.category}>
				<div className={`${style.setup} container-f`}>
					<div className={style.btnWrapper}>
						<span className={style.numdot}>01</span>
						<Link href={'/catalog/setups'}>
							<Button data-hover='ready setup' variant='grey'>
								ready setup
							</Button>
						</Link>
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
								<Link href={`/catalog/setups/${setup.id}`}>
									<img
										src={setup.image}
										alt={setup.name}
										className={style.image}
									/>
								</Link>

								<div className={style.plusBtn}>
									<Button data-hover='+' variant='btnPlusWhite'>
										+
									</Button>
								</div>
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
