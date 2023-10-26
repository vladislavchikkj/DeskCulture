import Link from 'next/link'
import { FC, LegacyRef } from 'react'

import Button from '@/ui/common/buttons/Button'

import { shimmer, toBase64 } from '@/components/common'
import { TypePaginationSetup } from '@/types/product.interface'
import Image from 'next/image'
import style from './homesetup.module.scss'

type HomeSetupProps = {
	homeRef?: LegacyRef<HTMLDivElement> | undefined
}
type prop = HomeSetupProps & TypePaginationSetup

const HomeSetup: FC<prop> = ({ setups, setupsLength, homeRef }) => {
	const firstTwoSetups = setups.slice(0, setupsLength)

	return (
		<>
			<div ref={homeRef} className={style.category}>
				<div className={`${style.setup} container-f`}>
					<div className={style.btnWrapper}>
						<span className={style.numdot}>01</span>
						<div className={style.setupBtn}>
							<Link href={'/catalog/setups'}>
								<Button data-hover='ready setup' variant='grey'>
									ready setup
								</Button>
							</Link>
						</div>
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
									<Image
										width={1000}
										height={1000}
										src={setup.image}
										alt={setup.name}
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
