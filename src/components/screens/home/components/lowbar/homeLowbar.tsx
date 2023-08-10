import { FC, PropsWithChildren } from 'react'

import style from './homelowbar.module.scss'
import LowbarBtn from './svg/lowbar.svg'

const LowBar: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<>
			<div className={`${style.lowbar} container-f`}>
				<div className={style.select}>{children}</div>
				<div className={style.btn}>
					<LowbarBtn />
				</div>
			</div>
		</>
	)
}
export default LowBar
