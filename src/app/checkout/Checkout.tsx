'use client'
import { FC, useEffect, useState } from 'react'
import 'react-html5video/dist/styles.css'

import { baseAnimation } from '@/components/animations/baseAnimation'
import { motion } from 'framer-motion'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import {
	customStyles,
	options,
	phoneCodes
} from '@/constants/checkout.constants'
import { useCart } from '@/hooks/useCart'
import { useProfile } from '@/hooks/useProfile'
import { OrderService, PlaceOrderData } from '@/services/order.service'
import { IOptions, IShippingField } from '@/types/checkout.interface'
import Field from '@/ui/common/input/Field'
import { convertPrice } from '@/utils/convertPrice'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import ReactSelect from 'react-select'
import AuthButton from '../auth/authButton/authButton'
import style from './checkout.module.scss'
interface OrderResponse {
	url: string
}
const Checkout: FC = () => {
	const profile = useProfile()
	const { items, total } = useCart()
	const [responseData, setResponseData] = useState<OrderResponse | null>(null)
	const [noProductsWarning, setNoProductsWarning] = useState(false)

	const mutation = useMutation(OrderService.place, {
		onSuccess: data => {
			setResponseData({ url: data?.data?.orderResponse?.url || '' })
		}
	})
	useEffect(() => {
		if (responseData && responseData.url) {
			if (responseData.url) {
				window.location.href = responseData.url
			} else {
				console.error('Received responseData.url is undefined or empty')
			}
		}
	}, [responseData])

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
		if (items.length === 0) {
			setNoProductsWarning(true)
			return
		}
		try {
			const postData: PlaceOrderData = {
				items: items.map(item => ({
					price: item.price,
					quantity: item.quantity,
					productId: item.product.id
				})),
				firstName: data.firstName,
				lastName: data.lastName,
				country: data.country.value,
				state: data.state,
				city: data.city,
				postCode: data.postCode,
				street: data.street,
				house: data.house,
				phoneCode: data.phoneCode.value,
				phone: data.phone,
				email: data.email,
				userId: profile?.profile?.id
			}
			mutation.mutate(postData)
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
															value={getValue(value?.value)}
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
											<Field
												{...checkout('email', {
													required: 'Email is required',
													pattern: {
														value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
														message: 'invalid email address'
													}
												})}
												className='w-full'
												placeholder='Email *'
												error={errors.email?.message}
											/>
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
																value={getValue(value?.value)}
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
												{noProductsWarning && (
													<div className='text-red mt-1 mb-3 text-sm'>
														No products in the cart. Please add products to the
														cart.
													</div>
												)}
												<AuthButton
													variant='grey'
													className='block mt-5 text-center mx-auto'
													type='submit'
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
