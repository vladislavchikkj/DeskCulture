'use client'
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
						<Link href={'https://www.instagram.com/'} target='_blank'>
							<div className={style.link}>Instagram</div>
						</Link>
						<Link href={'https://www.facebook.com/'} target='_blank'>
							<div className={style.link}>Facebook</div>
						</Link>
						<Link href={'https://www.tiktok.com/'} target='_blank'>
							<div className={style.link}>TikTok</div>
						</Link>
						<Link href={'https://www.pinterest.com/'} target='_blank'>
							<div className={style.link}>Pinterest</div>
						</Link>
					</div>
					<div>
						<Link href={'/contacts'}>
							<div className={style.buttons}>
								<Button data-hover='About us' variant={'grey'}>
									About us
								</Button>
								<Button data-hover='Get in touch' variant={'black'}>
									Get in touch
								</Button>
							</div>
						</Link>
					</div>
				</div>
				<div className={style.row}>
					<div className={style.data}>© 2018–2023</div>
					<Link href={'/policy'}>
						<div className={style.policy}>Privacy Policy</div>
					</Link>
				</div>
			</div>
		</>
	)
}

export default Footer
