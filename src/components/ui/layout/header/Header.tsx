'Use client'
import cn from 'clsx'
import Link from 'next/link'
import { FC, useEffect, useRef, useState } from 'react'

import Favorite from '@/ui/common/favoriteCard/Favorite'
import Search from '@/ui/layout/header/search/Search'

import { useAuth } from '@/hooks/useAuth'
import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/useProfile'

import { IProduct } from '@/types/product.interface'

import Cart from '../../common/cart/Cart'

import { ProductService } from '@/services/product/product.service'
import style from './header.module.scss'
import Menu from './menu/Menu'
import CircleLoader from './svg/circle-load.svg'

type Props = {
	inView?: boolean
}
const Header: FC<Props> = ({ inView }) => {
	const { user } = useAuth()
	const { isShow, setIsShow, ref, addRef } = useOutside(false)
	const headerRef = useRef<HTMLElement>(null)
	const wrapperRef = useRef<HTMLDivElement | null>(null)
	const [searchData, setSearchData] = useState('')
	const [products, setProducts] = useState<IProduct[]>([])
	const { profile } = useProfile()
	useEffect(() => {
		const getAllProducts = async () => {
			const result = await ProductService.getAll()
			return result.products
		}
		getAllProducts()
			.then(result => setProducts(result))
			.catch(err => err)
	}, [])
	return (
		<header className={cn(style.header)} ref={headerRef}>
			<div
				ref={wrapperRef}
				className={cn(style.headerWrapper, !inView && `${style.headerWhite}`)}
			>
				<div className={style.leftBtnHeader}>
					<Menu headerRef={headerRef} wrapperRef={wrapperRef} />
					<div className={`grid grid-flow-col ${style.hideBtn}`}>
						<Link href={`/contacts`}>
							<div className={`${style.headerButton} `}>
								<div data-hover='Contacts' className={style.textBtn}>
									<div className='flex gap-2'>Contacts</div>
								</div>
							</div>
						</Link>
						<Link href={`/catalog`}>
							<div className={`${style.headerButton} `}>
								<div data-hover='Catalog' className={style.textBtn}>
									<div>Catalog</div>
								</div>
							</div>
						</Link>
					</div>
				</div>
				<div ref={addRef} className={style.logoPlace}>
					{!isShow ? (
						<div className={style.mainLogo}>
							<div className={style.blink_me}>
								<Link translate='no' href={`/`}>
									<h1>
										DeskCulture<span className={style.flare}></span>
									</h1>
								</Link>
							</div>
							<div className={style.simbol}>®</div>
						</div>
					) : (
						<input
							className={style.searchInput}
							type='text'
							placeholder='Search...'
							value={searchData}
							onChange={e => setSearchData(e.target.value)}
						/>
					)}
				</div>
				<div className='grid grid-flow-col justify-self-end'>
					<Search
						headerRef={headerRef}
						searchData={searchData}
						allProducts={products}
						isShow={isShow}
						setIsShow={setIsShow}
						wrapperRef={wrapperRef}
					/>
					{!user && (
						<div className={style.logIn}>
							<Link href={`/auth/register`}>
								<div className={style.headerButton}>
									<span className='pl-6 pr-6'>
										<div data-hover='Sign Up' className={style.textBtn}>
											<div>Sign Up</div>
										</div>
									</span>
								</div>
							</Link>
						</div>
					)}
					<div className={style.logIn}>
						{!!user ? (
							<Link href={`/account`}>
								<button className={style.headerButton}>
									{profile?.name ? (
										<span className={style.userName}>
											<div data-hover={profile?.name} className={style.textBtn}>
												<div>{profile?.name}</div>
											</div>
										</span>
									) : (
										<div>
											<CircleLoader />
										</div>
									)}
								</button>
							</Link>
						) : (
							<Link href={`/auth/login`}>
								<span className={style.headerButton}>
									<span className='pl-6 pr-6'>
										<div data-hover='Log In' className={style.textBtn}>
											<div>Log In</div>
										</div>
									</span>
								</span>
							</Link>
						)}
					</div>
					<div className={style.favCartBtns}>
						<Favorite />
						<Cart />
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
