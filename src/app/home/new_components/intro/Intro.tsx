import Image from 'next/image'
import { FC } from 'react'

import Link from 'next/link'
import introImg from './img/intro.jpg'
import style from './intro.module.scss'
import Dlogo from './svg/data.svg'
import Wlogo from './svg/intro.svg'

const Intro: FC = () => {
	return (
		<>
			<div className={style.intro}>
				<Image
					src={introImg}
					alt={'intro'}
					width={4096}
					height={1787}
					className={style.img}
				/>
				<div className={style.wrapper}>
					<div className='flex justify-between'>
						<div className={style.l_icon}>
							<Dlogo />
						</div>
						<div className={style.r_icon}>
							<Wlogo />
						</div>
					</div>
					<div className={style.infos}>
						<div className={style.info}>
							<div className={style.article}>table accessories</div>
							<h1 className={style.title}>
								<p>DESK</p>
								<p className='pl-10'>
									<div className={style.glitch}>CULTURE</div>
								</p>
							</h1>
							<div className={style.subtitle}>
								Upgrade Your Desk: Stylish Accessories for a Perfect Workspace.
							</div>
						</div>
						<Link scroll={false} className={style.btn} href={'/catalog'}>
							Catalog
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}
export default Intro
