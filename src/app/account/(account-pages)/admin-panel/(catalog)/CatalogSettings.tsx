'use client'
import { FC } from 'react'
import style from './catalogsettings.module.scss'

const CatalogSettings: FC = () => {
	return (
		<div className={style.catalogSettings}>
			<div className={style.menu}>
				<div className={style.box}>
					<span className={style.products}>Products</span>
				</div>
				<div className={style.box}>
					<span className={style.category}>Category</span>
				</div>
				<div className={style.box}>
					<span className={style.setups}>Setups</span>
				</div>
			</div>
			<div className={style.content}>Content</div>
		</div>
	)
}

export default CatalogSettings
