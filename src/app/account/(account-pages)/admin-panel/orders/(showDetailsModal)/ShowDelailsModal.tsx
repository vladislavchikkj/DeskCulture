import { IOrderWithPerson } from '@/services/order.interface'
import { FC, useEffect, useState } from 'react'
import style from './showDetailsModal.module.scss'

type Props = {
	order: IOrderWithPerson | null
}

const ShowDelailsModal: FC<Props> = ({ order }) => {
	const [copySuccess, setCopySuccess] = useState<string | null>(null)
	const [copiedId, setCopiedId] = useState<string | null>(null)

	useEffect(() => {
		if (copySuccess) {
			const timerId = setTimeout(() => {
				setCopySuccess(null)
			}, 2000)

			return () => {
				clearTimeout(timerId) // Очищаем таймер перед размонтированием компонента
			}
		}
	}, [copySuccess])

	const copyToClipboard = async (text: string, id: string) => {
		try {
			await navigator.clipboard.writeText(text)
			setCopySuccess('copied!')
			setCopiedId(id)
		} catch (err) {
			setCopySuccess('failed to copy')
		}
	}

	const InfoValue = (props: { data: any; label: string; id: string }) => {
		const { data, label, id } = props

		return (
			<div className={style.info}>
				<span className={style.infoName}>{label}: </span>
				<span
					className={style.infoValue}
					onClick={() => copyToClipboard(data, id)}
				>
					{copySuccess && copiedId === id ? (
						<div className={style.copyMessage}>{copySuccess}</div>
					) : null}
					{data}
				</span>
			</div>
		)
	}

	return (
		<div>
			<span className={style.modalName}>Order #{order?.id}</span>
			<div className={style.wrapper}>
				<div className={style.personalInfo}>
					<div className={style.subName}>Personal info</div>

					<InfoValue
						data={order?.firstName}
						label='First name'
						id='first-name'
					/>
					<InfoValue data={order?.lastName} label='Last name' id='last-name' />
					<InfoValue data={order?.country} label='Country' id='country' />
					<InfoValue data={order?.state} label='State' id='state' />
					<InfoValue data={order?.city} label='City' id='city' />
					<InfoValue data={order?.postCode} label='Post code' id='post-code' />
					<InfoValue data={order?.street} label='Street' id='street' />
					<InfoValue data={order?.house} label='House' id='house' />
					<InfoValue
						data={`(${order?.phoneCode}) ${order?.phone}`}
						label='Phone'
						id='phone'
					/>
					<InfoValue data={order?.email} label='E-mail' id='email' />
				</div>

				<div className={style.orderInfo}>
					<div className={style.subName}>Order info</div>

					<InfoValue data={order?.id} label='ID' id='id' />
					<InfoValue data={order?.createdAt} label='DATE' id='date' />
					<InfoValue data={order?.status} label='STATUS' id='status' />
					<InfoValue data={order?.total} label='TOTAL' id='total' />
					<InfoValue data={order?.userId} label='User ID' id='user-id' />
					<InfoValue
						data={order?.paymentIntentId}
						label='PaymentIntentId'
						id='payment-id'
					/>
				</div>

				<div className={style.logo}>
					<span className='l-logo'>DeskCulture®</span>
				</div>
			</div>
		</div>
	)
}

export default ShowDelailsModal
