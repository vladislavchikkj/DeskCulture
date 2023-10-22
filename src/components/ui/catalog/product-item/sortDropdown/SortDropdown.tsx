import { EnumProductSort } from '@/services/product/product.types'
import { makeStyles, MenuItem, Select } from '@material-ui/core'
import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import style from './sortDropdown.module.scss'

const useStyle = makeStyles({
	select: {
		border: 'none',
		'& .MuiOutlinedInput-input': {
			padding: '8px 40px 8px 10px'
		}
	}
})

interface ISortDropdown {
	sortType: EnumProductSort
	setSortType: Dispatch<SetStateAction<EnumProductSort>>
}

const SortDropdown: FC<ISortDropdown> = ({ setSortType, sortType }) => {
	const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
		setSortType(event.target.value as EnumProductSort)
	}

	const classes = useStyle()

	return (
		<div className={style.sortDropdown}>
			<Select
				className={classes.select}
				value={sortType}
				onChange={handleChange}
			>
				{(
					Object.keys(EnumProductSort) as Array<keyof typeof EnumProductSort>
				).map(key => {
					return (
						<MenuItem key={EnumProductSort[key]} value={EnumProductSort[key]}>
							{EnumProductSort[key].charAt(0).toUpperCase() +
								EnumProductSort[key].slice(1)}
						</MenuItem>
					)
				})}
			</Select>
		</div>
	)
}

export default SortDropdown
