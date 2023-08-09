import { FC } from 'react'

import style from './homeintro.module.scss'
import Logo from './svg/newlogo.svg'

const HomeIntro: FC = () => {
	return (
		<>
			<div className={`${style.homeIntro} container-f`}>
				<div className={style.title}>
					<h1>
						Create. Your.
						<span className='text-white block'>Workspace.</span>
					</h1>
				</div>
				<div className={style.lowSide}>
					<div className={style.logo}>
						<Logo />
					</div>
					<div className={style.info}>
						Create a workspace that epitomizes your refined preferences while
						igniting your drive for productivity.
					</div>
				</div>
			</div>
		</>
	)
}
export default HomeIntro
