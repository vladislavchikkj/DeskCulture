import { FC } from 'react'

import style from './favoritebtn.module.scss'
import Favorite from './svg/Heart.svg.svg'

const FavoriteBtn: FC = () => {
	return (
		<div className={style.favorites}>
			<Favorite />
		</div>
	)
}

export default FavoriteBtn
