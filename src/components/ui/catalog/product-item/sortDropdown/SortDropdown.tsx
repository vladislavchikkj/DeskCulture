import { EnumProductSort } from '@/services/product/product.types'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import * as React from 'react'
import style from './sortDropdown.module.scss'

interface SelectSmallProps {
	selectedSortType: EnumProductSort
	onSortTypeChange: (sortType: EnumProductSort) => void
}

const SelectSmall: React.FC<SelectSmallProps> = ({
	selectedSortType,
	onSortTypeChange
}) => {
	const handleChange = (event: SelectChangeEvent) => {
		const selectedValue = event.target.value as EnumProductSort
		onSortTypeChange(selectedValue)
	}

	return (
		<div className={style.sortDropdown}>
			<FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
				<InputLabel id='demo-select-small-label'>Sort</InputLabel>
				<Select
					labelId='demo-select-small-label'
					id='demo-select-small'
					value={selectedSortType}
					label='Sort'
					onChange={handleChange}
				>
					<MenuItem value={EnumProductSort.NEWEST}>Newest</MenuItem>
					<MenuItem value={EnumProductSort.OLDEST}>Oldest</MenuItem>
					<MenuItem value={EnumProductSort.HIGH_PRICE}>High Price</MenuItem>
					<MenuItem value={EnumProductSort.LOW_PRICE}>Low Price</MenuItem>
				</Select>
			</FormControl>
		</div>
	)
}

export default SelectSmall
