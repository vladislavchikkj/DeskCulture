import { FC, useRef } from 'react'
import ReactDOM from 'react-dom'

import style from './homelowbar.module.scss'
import LowbarBtn from './svg/lowbar.svg'

type Props = {
	children: React.ReactNode
	lowbarState?: boolean
}

const LowBar: FC<Props> = ({ children, lowbarState }) => {
	const lowbarRef = useRef<HTMLElement | null>(
		document.getElementById('lowbar')
	)
	if (!lowbarRef.current) {
		return null
	}

	return ReactDOM.createPortal(
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
		</>,
		lowbarRef.current
	)
}
export default LowBar
