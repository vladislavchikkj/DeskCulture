import cn from 'clsx'
import {
	Dispatch,
	FC,
	LegacyRef,
	MutableRefObject,
	SetStateAction,
	useEffect,
	useState
} from 'react'
import { createPortal } from 'react-dom'

import { IProduct } from '@/types/product.interface'

import styleHeader from '../header.module.scss'

import style from './search.module.scss'
import SearchIcon from './svg/search.svg'

type SearchType = {
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
	headerRef: MutableRefObject<null | HTMLElement>
	searchData: string
	allProducts: IProduct[]
	closeSearch: LegacyRef<HTMLDivElement> | undefined
}

const Search: FC<SearchType> = ({
	isShow,
	setIsShow,
	headerRef,
	searchData,
	allProducts,
	closeSearch
}) => {
	const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])

	const filterProducts = () => {
		if (allProducts && searchData.trim() !== '') {
			const filtered = allProducts.filter(product =>
				product.name.toLowerCase().includes(searchData.toLowerCase())
			)
			setFilteredProducts(filtered)
		} else {
			setFilteredProducts([])
		}
	}

	useEffect(() => {
		filterProducts()
	}, [searchData])
	return (
		<div className={styleHeader.search}>
			<div
				className={style.searchBtn}
				onClick={() => {
					setIsShow(!isShow)
				}}
			>
				<SearchIcon />
				<span className={style.searchl}>Search</span>
			</div>
			{headerRef.current &&
				isShow &&
				createPortal(
					<>
						<div
							className={cn(
								`${style.searchMenu}`,
								isShow ? `${style.openSearch}` : `${style.closeSearch}`
							)}
						>
							<div className={`${style.searchItems} container-f`}>
								{searchData.trim() !== '' ? (
									filteredProducts.length > 0 ? (
										filteredProducts.map(product => (
											<div key={product.id} className={`${style.searchItem}`}>
												<img
													className={style.searchItemImage}
													src={product.images[0]}
													alt={product.name}
												/>
												<div className={style.searchItemInfo}>
													<div className='flex flex-col justify-between'>
														<div className={style.searchItemNameWr}>
															<span className={style.searchItemName}>
																{product.name}
															</span>
														</div>
														<span className={style.addToFav}>
															Save for later
														</span>
													</div>
													<div className={style.price}>
														$7,700
														<div className={style.addToBag}>add to bag</div>
													</div>
												</div>
											</div>
										))
									) : (
										<div className={style.noResults}>
											No matching products found.
										</div>
									)
								) : (
									<div className={style.noResults}>
										Enter a name to find the product.
									</div>
								)}
							</div>
						</div>
						<div
							onClick={() => setIsShow(!isShow)}
							className={cn(
								`${style.popupWrapper}`,
								isShow ? 'dark-bg' : 'off-dark-bg '
							)}
						></div>
					</>,
					headerRef.current
				)}
		</div>
	)
}

export default Search
