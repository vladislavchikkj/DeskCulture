import { ReviewService } from '@/services/review.service'
import Button from '@/ui/common/buttons/Button'
import Loader from '@/ui/common/loader/Loader'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Rating } from 'react-simple-star-rating'
import { IReviewFields } from './review-fields.interface'
import style from './reviews.module.scss'

type props = {
	productId: number
}

const LeaveReviewForm: FC<props> = ({ productId }) => {
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset,
		control
	} = useForm<IReviewFields>({
		mode: 'onChange'
	})

	const queryClient = useQueryClient()
	const { mutate, isSuccess, isLoading } = useMutation(
		['leave review'],
		(data: IReviewFields) => ReviewService.leave(productId, data),
		{
			onSuccess() {
				queryClient.refetchQueries(['get product', productId])
			}
		}
	)
	const onSubmit: SubmitHandler<IReviewFields> = data => {
		mutate(data)
		reset()
	}

	if (isSuccess) return <div>Review successfully published!</div>

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={style.modalName}>Leave a review</div>

				{isLoading ? (
					<Loader />
				) : (
					<div>
						<Controller
							control={control}
							name='rating'
							render={({ field: { onChange, value } }) => (
								<Rating
									onClick={onChange}
									initialValue={value}
									SVGstyle={{
										display: 'inline-block'
									}}
									size={20}
									transition
								/>
							)}
							rules={{
								required: 'Rating is required'
							}}
						></Controller>
						<textarea
							{...formRegister('text', {
								required: 'Text is required'
							})}
							placeholder='Your text here...'
							className={style.modalTextArea}
						/>

						{Object.entries(errors) && (
							<ul className=''>
								{Object.entries(errors).map(([_, error]) => (
									<li>{error?.message}</li>
								))}
							</ul>
						)}
						<div className={style.leaveModalBtn}>
							<Button data-hover='Send' type='submit' variant={'black'}>
								Send
							</Button>
						</div>
					</div>
				)}
			</form>
		</div>
	)
}

export default LeaveReviewForm