'Use client'
import cn from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FC, useEffect, useRef, useState } from 'react'

import Favorite from '@/ui/common/favoriteCard/Favorite'
import Search from '@/ui/layout/header/search/Search'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/useProfile'

import { IProduct } from '@/types/product.interface'

import Cart from '../../common/cart/Cart'

import { ProductService } from '@/services/product/product.service'
import style from './header.module.scss'
import Menu from './menu/Menu'

type Props = {
	inView?: boolean
}
const Header: FC<Props> = ({ inView }) => {
	const { user } = useAuth()
	const { logout } = useActions()
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
	const headerAnimation = {
		hidden: {
			y: -100
		},
		visible: {
			y: 0,

			transition: { duration: 0.6 }
		}
	}
	return (
		<motion.header
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			className={cn(style.header)}
			ref={headerRef}
		>
			<motion.div
				ref={wrapperRef}
				variants={headerAnimation}
				className={cn(style.headerWrapper, !inView && `${style.headerWhite}`)}
			>
				<div className={style.leftBtnHeader}>
					<Menu headerRef={headerRef} wrapperRef={wrapperRef} />
					<div className='grid grid-flow-col'>
						<Link href={`/contacts`}>
							<div className={`${style.headerButton} ${style.hideBtn}`}>
								<div data-hover='Contacts' className={style.textBtn}>
									<div className='flex gap-2'>Contacts</div>
								</div>
							</div>
						</Link>
						<Link href={`/catalog`}>
							<div className={`${style.headerButton} ${style.hideBtn}`}>
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
							<div>
								<Link translate='no' href={`/`}>
									<span>DeskCulture</span>
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
						<Link href={`/auth`}>
							<div className={style.headerButton}>
								<span className='pl-6 pr-6'>
									<div data-hover='Register' className={style.textBtn}>
										<div>Register</div>
									</div>
								</span>
							</div>
						</Link>
					)}
					<div>
						{!!user ? (
							<Link href={`/account`}>
								<button className={style.headerButton}>
									<span className='pl-6 pr-6'>
										<div data-hover={profile?.name} className={style.textBtn}>
											<div>{profile?.name}</div>
										</div>
									</span>
								</button>
							</Link>
						) : (
							<Link href={`/auth`}>
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
					<Favorite />
					<Cart />
				</div>
			</motion.div>
		</motion.header>
	)
}

export default Header
