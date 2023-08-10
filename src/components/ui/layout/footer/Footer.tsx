import cn from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

import Button from '@/ui/common/buttons/Button'

import style from './footer.module.scss'

type PageProps = {
	home?: boolean
}

const Footer: FC<PageProps> = ({ home }) => {
	return (
		<>
			<div
				className={cn(
					`${style.footer} container-f`,
					!home ? '' : style.footerHome
				)}
			>
				<div className={style.info}>
					<div className={style.logo}>
						<span>
							<Link translate='no' href={`/`}>
								DeskCulture
							</Link>
						</span>
					</div>
					<div translate='no' className={style.links}>
						<div className={style.link}>Facebook</div>
						<div className={style.link}>Instagram</div>
						<div className={style.link}>Behance</div>
						<div className={style.link}>Dribbble</div>
					</div>
					<div>
						<div className={style.buttons}>
							<Button data-hover='About us' variant={'grey'}>
								About us
							</Button>
							<Button data-hover='Get in touch' variant={'black'}>
								Get in touch
							</Button>
						</div>
					</div>
				</div>
				<div className={style.row}>
					<div className={style.data}>© 2018–2023</div>
					<div className={style.policy}>Privacy Policy</div>
				</div>
			</div>
		</>
	)
}

export default Footer
