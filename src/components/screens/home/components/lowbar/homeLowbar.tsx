import { FC } from 'react'

import style from './homelowbar.module.scss'
import LowbarBtn from './svg/lowbar.svg'

const LowBar: FC = () => {
	return (
		<>
			<div className={`${style.lowbar} container-f`}>
				<div className={style.select}>Select a ready setup</div>
				<div className={style.btn}>
					<LowbarBtn />
				</div>
			</div>
		</>
	)
}
export default LowBar
