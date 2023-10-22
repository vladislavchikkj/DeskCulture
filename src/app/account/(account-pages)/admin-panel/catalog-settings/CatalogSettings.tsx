'use client'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import style from './catalogsettings.module.scss'
type Props = {
	children?: React.ReactNode
}

const CatalogSettings: FC<Props> = ({ children }) => {
	const pathname = usePathname()
	return (
		<div className={style.catalogSettings}>
			<div className={style.content}>{children}</div>
		</div>
	)
}
export default CatalogSettings
