import { FC } from 'react'

import style from './homelowbar.module.scss'
import LowbarBtn from './svg/lowbar.svg'

type Props = {
	children: React.ReactNode
	lowbarState?: boolean
}

const LowBar: FC<Props> = ({ children, lowbarState }) => {
	return (
		<>
			<div
				className={
					lowbarState
						? `${style.lowbar} container-f`
						: `${style.lowbar} container-f ${style.off}`
				}
			>
				<div className={style.select}>{children}</div>
				<div className={style.btn}>
					<LowbarBtn />
				</div>
			</div>
		</>
	)
}
export default LowBar
