import { useQuery } from '@tanstack/react-query'
import cn from 'clsx'
import { useRouter } from 'next/router'
import { Dispatch, FC, MutableRefObject, SetStateAction } from 'react'
import { createPortal } from 'react-dom'

import style from './search.module.scss'
import SearchIcon from './svg/search.svg'
import { ProductService } from '@/services/product/product.service'

type SearchType = {
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
	headerRef: MutableRefObject<null | HTMLElement>
}

const Search: FC<SearchType> = ({ isShow, setIsShow, headerRef }) => {
	const { query } = useRouter()

	const { data } = useQuery(['search products', query.term], () =>
		ProductService.getAll({
			searchTerm: query.term as string
		})
	)
	const header = document.querySelector('header') as HTMLElement
	return (
		<>
			<div className='flex'>
				<SearchIcon
					onClick={() => {
						setIsShow(!isShow)
					}}
				/>
				<span className='pt-0.5 pl-2'>search</span>
			</div>
			{isShow &&
				createPortal(
					<>
						<div
							className={cn(
								`${style.searchMenu}`,
								isShow ? `${style.openSearch}` : `${style.closeSearch}`
							)}
						>
							hi my name is
						</div>
						<div
							onClick={() => setIsShow(!isShow)}
							className={cn(
								`${style.popupWrapper}`,
								isShow ? 'dark-bg' : 'off-dark-bg '
							)}
						></div>
					</>,
					header
				)}
		</>
	)
}

export default Search
