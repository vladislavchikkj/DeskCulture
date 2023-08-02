import { useQuery } from '@tanstack/react-query'
import cn from 'clsx'
import { useRouter } from 'next/router'
import { Dispatch, FC, MutableRefObject, SetStateAction } from 'react'
import { createPortal } from 'react-dom'

import Button from '../buttons/Button'

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
			<div
				className='flex gap-1'
				onClick={() => {
					setIsShow(!isShow)
				}}
			>
				<SearchIcon />
				<span className={style.searchl}>search</span>
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
							<div className={style.searchItems}>
								<div className='container-f'>
									<div className={`${style.searchItemsWrapper} `}>
										<img
											className={style.searchItemImage}
											src={
												'https://i.pinimg.com/originals/c3/4d/14/c34d14cad61cf42ce70cb2dcbd4bb0a8.jpg'
											}
											alt={'test'}
										/>
										<div className={style.searchItemInfo}>
											<div className='flex flex-col justify-between'>
												<div className={style.searchItemNameWr}>
													<span className={style.searchItemName}>
														Grey desc mats
													</span>
													<span className={style.searchItemSlug}>
														Desc mats
													</span>
												</div>
												<span className={style.addToFav}>Save for later</span>
											</div>
											<div className={style.price}>
												$7,700
												<div className={style.addToBag}>add to bag</div>
											</div>
										</div>
									</div>
									<div className='flex justify-end pt-4'>
										<Button variant={'black'}>See more</Button>
									</div>
								</div>
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
					header
				)}
		</>
	)
}

export default Search
