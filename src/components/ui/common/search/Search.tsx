import cn from 'clsx'
import { useRouter } from 'next/router'
import {
	Dispatch,
	FC,
	MutableRefObject,
	SetStateAction,
	useEffect,
	useState
} from 'react'
import { createPortal } from 'react-dom'

import { IProduct } from '@/types/product.interface'

import style from './search.module.scss'
import SearchIcon from './svg/search.svg'

type SearchType = {
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
	headerRef: MutableRefObject<null | HTMLElement>
	searchData: string
	allProducts: IProduct[]
}

const Search: FC<SearchType> = ({
	isShow,
	setIsShow,
	headerRef,
	searchData,
	allProducts
}) => {
	const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])

	const { query } = useRouter()

	// const { data } = useQuery(['search products', query.term], () =>
	// 	ProductService.getAll({
	// 		searchTerm: query.term as string
	// 	})
	// )

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
		<>
			<div
				className='flex gap-1'
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
		</>
	)
}

export default Search
