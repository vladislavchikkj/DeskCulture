import Image from 'next/image'
import { FC } from 'react'

import Button from '@/ui/common/buttons/Button'

import style from './homesetup.module.scss'
import testImg from './img/test-1.png'
import testImg2 from './img/test-2.png'

const HomeSetup: FC = () => {
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
					<div className={style.item}>
						<Image src={testImg2} alt={'img'}></Image>
						<div className={style.descr}>
							<h3>White Style SetUp</h3>
							<h4>
								A white modern workstation epitomizes elegance and
								functionality. It features clean lines and minimalist design,
								with ample space and storage.
							</h4>
						</div>
					</div>
					<div className={style.item}>
						<Image src={testImg} alt={'img'}></Image>
						<h3>Warm Style SetUp</h3>
						<h4>
							A warm, modern workstation with wood tones exudes a cozy and
							inviting atmosphere. It combines sleek contemporary design with
							natural elements, creating a harmonious balance.
						</h4>
					</div>
				</div>
			</div>
		</>
	)
}
export default HomeSetup
