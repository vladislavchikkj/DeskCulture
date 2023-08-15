import { FC } from 'react'

import style from './loader.module.scss'
import LoaderSvg from './svg/loader-1.svg'

const Loader: FC = () => {
	return (
		<div className={style.loader}>
			<LoaderSvg />
		</div>
	)
}

export default Loader
