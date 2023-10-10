import cn from 'clsx'
import Link from 'next/link'
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

import AddToCartButton from '@/ui/catalog/product-item/addToCardButton/AddToCartButton'

import { IProduct } from '@/types/product.interface'

import styleHeader from '../header.module.scss'

import { emitCustomEvent } from '@/utils/emitCustomEvent'
import style from './search.module.scss'
import SearchIcon from './svg/search.svg'

type SearchType = {
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
	headerRef: MutableRefObject<null | HTMLElement>
	searchData: string
	allProducts: IProduct[]
	closeSearch?: LegacyRef<HTMLDivElement> | undefined
	wrapperRef?: MutableRefObject<null | HTMLElement>
}

const Search: FC<SearchType> = ({
	isShow,
	setIsShow,
	headerRef,
	searchData,
	allProducts,
	wrapperRef
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

	const clickHandler = () => {
		setIsShow(false)
	}
	useEffect(() => {
		document.addEventListener('clickMenuhOpener', clickHandler)
		return () => {
			document.removeEventListener('clickMenuhOpener', clickHandler)
		}
	}, [])
	if (isShow) {
		if (wrapperRef && wrapperRef.current) {
			wrapperRef.current.style.backgroundColor = 'white'
		}
	} else {
		if (wrapperRef && wrapperRef.current) {
			wrapperRef.current.style.backgroundColor = ''
		}
	}
	return (
		<div className={styleHeader.search}>
			<div
				className={style.searchBtn}
				onClick={() => {
					setIsShow(!isShow)
					emitCustomEvent('clickSearchOpener')
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
												<div>
													<Link
														onClick={() => {
															setIsShow(!isShow)
														}}
														href={`/catalog/products/${product.slug}`}
													>
														<img
															className={style.searchItemImage}
															src={product.images[0]}
															alt={product.name}
														/>
													</Link>
												</div>

												<div className={style.searchItemInfo}>
													<div className='flex flex-col justify-between'>
														<div className={style.searchItemNameWr}>
															<span className={style.searchItemName}>
																{product.name}
															</span>
														</div>

														<Link
															onClick={() => {
																setIsShow(!isShow)
															}}
															href={`/products/${product.slug}`}
														>
															<span className={style.addToFav}>More info</span>
														</Link>
													</div>
													<div className={style.price}>
														${product.price}
														<div className={style.addToBag}>
															<AddToCartButton product={product}>
																Add to bag
															</AddToCartButton>
														</div>
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
