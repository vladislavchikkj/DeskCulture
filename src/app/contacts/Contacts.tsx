'use client'

import { motion } from 'framer-motion'
import { FC, useEffect, useRef, useState } from 'react'
import 'react-html5video/dist/styles.css'

import { baseAnimation } from '@/components/animations/baseAnimation'

import { headingAnimation } from '@/components/animations/headingAnimation'
import { useLayout } from '@/components/context/LayoutContext'
import Button from '@/ui/common/buttons/Button'
import Footer from '@/ui/layout/footer/Footer'
import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import style from './contacts.module.scss'

const Contacts: FC = () => {
	const { updateLayout } = useLayout()
	useEffect(() => {
		updateLayout(true)
	})
	const parallax = useRef<IParallax>(null)
	const [isNameEmpty, setIsNameEmpty] = useState(false)
	const [isEmailEmpty, setIsEmailEmpty] = useState(false)
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<FormData>({})
	const handleEmailClick = (email: string) => {
		navigator.clipboard
			.writeText(email)
			.then(() => alert('Email copied to clipboard'))
			.catch(() => alert('Failed to copy email to clipboard'))
	}
	return (
		<motion.section
			initial='hidden'
			whileInView='visible'
			variants={baseAnimation}
			className={style.contacts}
		>
			<Parallax
				ref={parallax}
				pages={2.2}
				style={{ top: '0', left: '0', background: '#fff' }}
			>
				<ParallaxLayer speed={0.2} style={{ background: '#cdcecf' }}>
					<div className={`container-f ${style.preview}`}>
						<div className={style.title}>
							<h1 translate='no'>
								<div className='overflow-hidden'>
									{/* <motion.div variants={textAnimation}> */}
									<a className='text-white block'>Get In Touch</a>
									{/* </motion.div> */}
								</div>
								<div className='overflow-hidden'>
									{/* <motion.div variants={textAnimation}> */}
									<a
										translate='no'
										className={style.email}
										onClick={() =>
											handleEmailClick('desk.culture.official@gmail.com')
										}
									>
										desk.culture.official@gmail.com
									</a>
									{/* </motion.div> */}
								</div>
							</h1>
							<div className={style.btn}>
								<Button
									data-hover='↓'
									variant={'btnArrowMenu'}
									onClick={() => parallax.current?.scrollTo(0.75)}
								>
									↓
								</Button>
							</div>
							<motion.div
								custom={1.2}
								variants={headingAnimation}
								className={style.social}
							>
								<span>Social links : </span>
								<div className={style.links}>
									<Link href={'https://www.facebook.com/'}>
										<span className='text-black'>Facebook</span>
									</Link>
									<Link href={'https://www.instagram.com/'}>
										<span>Instagram</span>
									</Link>
									<Link href={'https://www.tiktok.com/'}>
										<span>TikTok</span>
									</Link>
									<Link href={'https://www.pinterest.com/'}>
										<span>Pinterest</span>
									</Link>
								</div>
							</motion.div>
						</div>
					</div>
				</ParallaxLayer>
				<ParallaxLayer
					speed={0.5}
					offset={1}
					style={{ top: '-40vh', left: '0', background: '#fff' }}
				>
					<div className={`container-f ${style.formContent}`}>
						<span className={style.formTitle}>Write to Us</span>
						<div className={style.contactForm}>
							<form>
								<div className={style.info}>
									<div className={style.group}>
										<label className={style.label} htmlFor='name'>
											Name:
										</label>
										<input
											className={`${style.input} ${
												isNameEmpty ? style.empty : ''
											}`}
											type='text'
											id='name'
										/>
										<span className={style.highlight}></span>
										<span className={style.bar}></span>
									</div>
									<div className={style.group}>
										<label className={style.label} htmlFor='email'>
											Email:
										</label>
										<input
											className={`${style.input} ${
												isEmailEmpty ? style.empty : ''
											}`}
											type='email'
											id='email'
										/>
										<span className={style.highlight}></span>
										<span className={style.bar}></span>
									</div>
									<div className={style.group}>
										<label className={style.label} htmlFor='email'>
											Phone number:
										</label>
										<input
											className={`${style.input} ${
												isEmailEmpty ? style.empty : ''
											}`}
											type='tel'
											id='tel'
										/>
										<span className={style.highlight}></span>
										<span className={style.bar}></span>
									</div>
									<div className={style.group}>
										<label className={style.label} htmlFor='email'>
											Comment (optional)
										</label>
										<input
											className={`${style.input} ${
												isEmailEmpty ? style.empty : ''
											}`}
											type='tel'
											id='tel'
										/>
										<span className={style.highlight}></span>
										<span className={style.bar}></span>
									</div>
									<span className={style.policy}>
										By clicking the Submit button you agree to our{' '}
										<Link href={'/policy'} className={style.btnPolicy}>
											<b>Privacy Policy </b>
										</Link>
										terms
									</span>
									<button className={style.btnForm} type='submit'>
										SAVE CHANGES
									</button>
								</div>
							</form>
						</div>
					</div>
				</ParallaxLayer>
				<ParallaxLayer
					offset={1.8}
					speed={0.1}
					style={{ zIndex: '1', overflow: 'hidden' }}
				>
					<Footer />
				</ParallaxLayer>
			</Parallax>
		</motion.section>
	)
}

export default Contacts
