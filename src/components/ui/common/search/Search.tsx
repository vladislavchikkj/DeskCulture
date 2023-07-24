import { useQuery } from '@tanstack/react-query'
import cn from 'clsx'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { useOutside } from '@/hooks/useOutside'

import style from './search.module.scss'
import SearchIcon from './svg/search.svg'
import { ProductService } from '@/services/product/product.service'

const Search: FC = () => {
	const { query } = useRouter()

	const { data } = useQuery(['search products', query.term], () =>
		ProductService.getAll({
			searchTerm: query.term as string
		})
	)
	const { isShow, setIsShow, ref } = useOutside(false)
	return (
		<>
			<div className='flex'>
				<SearchIcon onClick={() => setIsShow(!isShow)} />
				<span className='pt-0.5 pl-2'>search</span>
			</div>
			<div
				className={cn(
					`${style.searchMenu}`,
					isShow ? `${style.openSearch}` : `${style.closeSearch}`
				)}
			>
				hi-may name is
			</div>
			<div
				onClick={() => setIsShow(!isShow)}
				className={cn(
					`${style.popupWrapper}`,
					isShow ? 'dark-bg' : 'off-dark-bg '
				)}
			></div>
		</>
	)
}

export default Search
