import { Dispatch, FC, SetStateAction } from 'react'

import style from './sortDropdown.module.scss'
import { EnumProductSort } from '@/services/product/product.types'

interface ISortDropdown {
	sortType: EnumProductSort
	setSortType: Dispatch<SetStateAction<EnumProductSort>>
}

const SortDropdown: FC<ISortDropdown> = ({ setSortType, sortType }) => {
	return (
		<div className={style.sortDropdown}>
			<select
				value={sortType}
				onChange={e => setSortType(e.target.value as any)}
				className={style.select}
			>
				{(
					Object.keys(EnumProductSort) as Array<keyof typeof EnumProductSort>
				).map(key => {
					return (
						<option
							key={EnumProductSort[key]}
							onChange={() => setSortType(EnumProductSort[key])}
							value={EnumProductSort[key]}
							className={style.x}
						>
							{EnumProductSort[key].charAt(0).toUpperCase() +
								EnumProductSort[key].slice(1)}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default SortDropdown
