import { FC } from 'react'
import { IconType } from 'react-icons'

import style from './bagbtn.module.scss'
import Bag from './svg/bag.svg'

interface ISquareButton {
	icon?: IconType
	onClick?: () => void
	number?: number
}

const BagBtn: FC<ISquareButton> = ({ icon, onClick, number }) => {
	return (
		<button onClick={onClick} className={style.bag}>
			{!!number && (
				<span className='flex h-4 w-4 items-center justify-center rounded-full  p-0.5 text-[0.8rem] text-black absolute top-[0.5vw] right-[0.5vw]'>
					{number}
				</span>
			)}
			<Bag />
		</button>
	)
}

export default BagBtn
