'use client'

import { FC, useEffect } from 'react'
import 'react-html5video/dist/styles.css'

import { baseAnimation } from '@/components/animations/baseAnimation'
import { motion } from 'framer-motion'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import {
	customStyles,
	options,
	phoneCodes
} from '@/constants/checkout.constants'
import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { OrderService, TypeData } from '@/services/order.service'
import { IOptions, IShippingField } from '@/types/checkout.interface'
import Field from '@/ui/common/input/Field'
import { convertPrice } from '@/utils/convertPrice'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import ReactSelect from 'react-select'
import AuthButton from '../auth/authButton/authButton'
import style from './checkout.module.scss'
const Checkout: FC = () => {
	const pathname = usePathname()

	const { reset } = useActions()
	const { push } = useRouter()
	const { items, total } = useCart()
	const { mutate } = useMutation(
		['create order and payment'],
		() =>
			OrderService.place({
				items: items.map(item => ({
					price: item.price,
					quantity: item.quantity,
					productId: item.product.id
				}))
			}),
		{
			onSuccess({ data }) {
				console.log(data)
				//  @ts-ignore
				push(data.confirmationUrl.confirmationUrl.url)
			}
		}
	)
	useEffect(() => {
		if (pathname.startsWith('/confirmation-url/')) {
			reset()
		}
	}, [pathname, reset])

	const {
		register: checkout,
		handleSubmit,
		reset: resetForm,
		formState: { errors },
		control
	} = useForm<IShippingField>({
		mode: 'onChange'
	})
	const onSubmit: SubmitHandler<IShippingField> = async (
		data: IShippingField
	) => {
		try {
			const postData: TypeData = {
				items: items.map(item => ({
					price: item.price,
					quantity: item.quantity,
					productId: item.product.id
				}))
			}

			const response = await OrderService.place(postData)
			console.log('Data was sent successfully: ', response)
			resetForm() // Сброс формы после успешного отправления
			reset() // Очистка корзины после успешного отправления
			push(response.data.confirmationUrl.confirmationUrl)
		} catch (error) {
			console.error('Error sending data: ', error)
		}
	}

	const getValue = (value: string) =>
		value ? options.find(option => option.value === value) : ''
	return (
		<>
			<Parallax pages={1.3} style={{ top: '0', left: '0' }}>
				<ParallaxLayer offset={0} speed={0.2}>
					<motion.div
						initial='hidden'
						whileInView='visible'
						variants={baseAnimation}
						className='container-f'
					>
						<div className={style.wrapper}>
							<div className={style.title}>Checkout</div>
							<div className={style.cartLayout}>
								<div className={style.cart}>
									<div className={style.address}>Address</div>
									<div className={style.formContent}>
										<span className={style.formTitle}>Shipping address</span>
										<form onSubmit={handleSubmit(onSubmit)} className='pt-5'>
											<div className='flex gap-5 justify-between'>
												<Field
													{...checkout('firstName', {
														required: 'First name is required'
													})}
													className=' w-full'
													placeholder='first name *'
													error={errors.firstName?.message}
												/>
												<Field
													{...checkout('lastName', {
														required: 'Last name is required'
													})}
													className=' w-full'
													placeholder='last name *'
													error={errors.lastName?.message}
												/>
											</div>
											<Controller
												control={control}
												name='country'
												rules={{ required: 'Country is required!' }}
												render={({
													field: { onChange, value },
													fieldState: { error }
												}) => (
													<div>
														<ReactSelect
															className='mb-5'
															options={options}
															placeholder='Country'
															styles={customStyles}
															value={getValue(value)}
															onChange={newValue =>
																onChange(newValue as IOptions, value)
															}
															theme={theme => ({
																...theme,
																borderRadius: 0,
																colors: {
																	...theme.colors,
																	primary25: '#bd9f5f3b',
																	primary: '#00000050'
																}
															})}
														/>
														{errors?.country && (
															<div className='text-red mt-1 mb-3 text-sm'>
																{errors.country?.message}
															</div>
														)}
													</div>
												)}
											/>

											<Field
												{...checkout('state', {
													required: 'State is required'
												})}
												className='w-full'
												placeholder='State/Province'
												error={errors.state?.message}
											/>
											<div className='flex gap-5 justify-between'>
												<Field
													{...checkout('city', {
														required: 'City is required'
													})}
													className=' w-full'
													placeholder='City *'
													error={errors.city?.message}
												/>
												<Field
													{...checkout('postCode', {
														required: 'Postcode is required'
													})}
													className=' w-full'
													placeholder='Postcode *'
													error={errors.postCode?.message}
												/>
											</div>
											<div>
												<Field
													{...checkout('street', {
														required: 'Street address is required'
													})}
													error={errors.street?.message}
													className=' w-full'
													placeholder='Street address *'
												/>
												<Field
													{...checkout('house', {
														required: 'House is required'
													})}
													error={errors.house?.message}
													className=' w-full'
													placeholder='House *'
												/>
											</div>
											<div className='flex gap-5 justify-between'>
												<Controller
													control={control}
													name='phoneCode'
													rules={{ required: 'Code number is required!' }}
													render={({
														field: { onChange, value },
														fieldState: { error }
													}) => (
														<div className='w-full'>
															<ReactSelect
																className='mb-5 w-full'
																options={phoneCodes}
																placeholder='Code *'
																styles={customStyles}
																value={getValue(value)}
																onChange={newValue =>
																	onChange(newValue as IOptions, value)
																}
																theme={theme => ({
																	...theme,
																	borderRadius: 0,
																	colors: {
																		...theme.colors,
																		primary25: '#bd9f5f3b',
																		primary: '#00000050'
																	}
																})}
																menuPlacement='top'
															/>
															{error && (
																<div className='text-red mt-1 text-sm'>
																	{error.message}
																</div>
															)}
														</div>
													)}
												/>
												<Field
													type='tel'
													{...checkout('phone', {
														required: 'Phone is required',
														pattern: {
															value: /^[+\d]?[\d- ]{4,}$/,
															message: 'Invalid phone number'
														}
													})}
													error={errors.phone?.message}
													className=' w-full'
													placeholder='Phone number'
												/>
											</div>
											<div className='flex gap-2 mt-5'>
												<input type='checkbox' name='' id='' />
												<span>Save this address for billing?</span>
											</div>
											<div className={style.formBtn}>
												<AuthButton
													// onClick={() => mutate()}
													variant='grey'
													className='block mt-5 text-center mx-auto'
												>
													next
												</AuthButton>
											</div>
										</form>
									</div>
								</div>
								<div className={style.cartInfo}>
									<div className={style.quantity}>
										<div className={style.itemQuantity}>
											{items.length} Items
										</div>
										<Link href={'/cart'}>
											<div className={style.edit}>edit</div>
										</Link>
									</div>
									<div className={style.itemsImageWrapper}>
										{items.map(item => (
											<div key={item.id} className={style.items}>
												<div className={style.itemImageWrapper}>
													<Image
														width={100}
														height={100}
														src={item.product.images[0]}
														alt={item.product.name}
														className={style.itemImage}
													/>
												</div>
												<div className={style.itemInfo}>
													<span className={style.itemName}>
														{item.product.name}
													</span>
													<span className={style.itemPrice}>
														${item.product.price}
													</span>
												</div>
											</div>
										))}
									</div>
									<div className={style.productsPrice}>
										<div>Products</div>
										<div>{convertPrice(total)}</div>
									</div>
									<div className={style.salesTax}>
										<div>Sales Tax</div>
										<div>$10.00</div>
									</div>
									<div className={style.total}>
										<div>Total (incl. sales tax)</div>
										<div className={style.totalPrice}>
											{convertPrice(total + 10)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</ParallaxLayer>
			</Parallax>
		</>
	)
}

export default Checkout
