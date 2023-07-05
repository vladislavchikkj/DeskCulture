import { Dispatch, FC, SetStateAction } from 'react'

import { EnumProductSort } from '@/services/product/product.types'

interface ISortDropdown {
	sortType: EnumProductSort
	setSortType: Dispatch<SetStateAction<EnumProductSort>>
}

const SortDropdown: FC<ISortDropdown> = ({ setSortType, sortType }) => {
	return (
		<div className='text-right'>
			<select
				value={sortType}
				onChange={e => setSortType(e.target.value as any)}
			>
				{(
					Object.keys(EnumProductSort) as Array<keyof typeof EnumProductSort>
				).map(key => {
					return (
						<option
							key={key}
							onChange={() => setSortType(EnumProductSort[key])}
							value={EnumProductSort[key]}
						>
							{EnumProductSort[key]}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default SortDropdown
