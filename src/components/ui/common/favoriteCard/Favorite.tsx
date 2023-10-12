import { useOutside } from '@/hooks/useOutside'

import { FC } from 'react'
import AsidePanel from '../asidePanel/PopUp'
import style from './favorite.module.scss'
import FavoriteContent from './favoriteContent/FavoriteContent'
import FavoriteBtn from './svg/Heart.svg.svg'

const Favorite: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	return (
		<div className={style.favoriteWrapper}>
			<div className={style.favorites} onClick={() => setIsShow(!isShow)}>
				<FavoriteBtn />
			</div>
			<AsidePanel isOpen={isShow} closeAsidePanel={() => setIsShow(!isShow)}>
				<FavoriteContent
					favRef={ref}
					setIsShow={() => setIsShow(!isShow)}
				></FavoriteContent>
			</AsidePanel>
		</div>
	)
}

export default Favorite
