import { IProduct } from '@/types/product.interface'
import ProductList from '@/ui/catalog/productsList/ProductList'
import Button from '@/ui/common/buttons/Button'
import Image from 'next/image'
import { FC } from 'react'
import layout from './img/keycaps.png'
import style from './keycaps.module.scss'
import KeycapsSVG from './svg/keycaps.svg'
const Keycaps: FC<{ products: IProduct[] }> = products => {
	return (
		<>
			<div className={style.keycaps}>
				<Image src={layout} alt={'keykaps'} className={style.img} />
				<div className={`${style.preview} container-f`}>
					<div className={style.icons}>
						<KeycapsSVG />
						<div className={style.icon}>♺</div>
					</div>
					<div className='flex justify-between items-end'>
						<div className={style.title}>KEYCAPS</div>
						<Button
							data-hover='See all'
							variant={'black'}
							className=' h-10 w-40'
						>
							See all
						</Button>
					</div>
				</div>
			</div>
			<div className={`${style.items} container-f`}>
				<ProductList
					initialProducts={products.products}
					loadMoreBtnOff
					DropdownOff
					descr
					needToUpdate={false}
				/>
			</div>
			<div className={style.stick}>
				<div className={style.text}>Some text</div>
			</div>
		</>
	)
}
export default Keycaps
