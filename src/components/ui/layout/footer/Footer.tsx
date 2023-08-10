import { FC } from 'react'

import Button from '@/ui/common/buttons/Button'

import style from './footer.module.scss'

const Footer: FC = () => {
	return (
		<>
			<div className={`${style.footer} container-f`}>
				<div className={style.info}>
					<div className={style.logo}>DeskCulture</div>
					<div className={style.links}>
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
