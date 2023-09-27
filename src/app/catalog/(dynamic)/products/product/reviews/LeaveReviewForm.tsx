import { ReviewService } from '@/services/review.service'
import { IReview } from '@/types/review.interface'
import Button from '@/ui/common/buttons/Button'
import Loader from '@/ui/common/loader/Loader'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Rating } from 'react-simple-star-rating'
import UploadSVG from './img/upload.svg'
import { IReviewFields } from './review-fields.interface'
import style from './reviews.module.scss'

type props = {
	productId: number
	onSuccess?: (review: IReview) => void
}
export interface IReviewFormData extends IReviewFields {
	image: File
}

const LeaveReviewForm: FC<props> = ({ productId, onSuccess }) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleFileInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0] ?? null
		if (file) {
			const reader = new FileReader()
			setSelectedFile(file)

			reader.onloadend = () => {
				setPreviewUrl(reader.result?.toString() ?? null)
			}

			reader.readAsDataURL(file)
		}
	}

	const onFileInputClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}
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
		(data: FormData) => ReviewService.leave(productId, data),
		{
			onSuccess(data) {
				queryClient.refetchQueries(['get product', productId])
				if (onSuccess) {
					const reviewWithUser = { ...data.data }
					onSuccess(reviewWithUser)
					console.log(data)
				}
			},
			onError(error: any): void {
				console.error('Error while submitting review:', error.response?.data)
			}
		}
	)
	const onSubmit: SubmitHandler<IReviewFields> = (data: IReviewFields) => {
		const formData = new FormData()

		formData.append('rating', data.rating.toString())
		formData.append('text', data.text)

		if (selectedFile) {
			formData.append('image', selectedFile)
		}

		formData.forEach((value, key) => {
			console.log(`${key}: ${value}`)
		})

		mutate(formData)
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
									fillColor={'black'}
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
								{Object.entries(errors).map(([_, error], index) => (
									<li key={index}>{error?.message}</li>
								))}
							</ul>
						)}
						<div className={style.leaveModalBtn}>
							<Button data-hover='Send' type='submit' variant={'black'}>
								Send
							</Button>
							<input
								type='file'
								accept='image/*'
								style={{ display: 'none' }}
								ref={fileInputRef}
								onChange={handleFileInputChange}
							/>
							<button
								type='button'
								onClick={onFileInputClick}
								className={style.upload}
							>
								<div className={style.uploadText}>upload image</div>
								<div>
									<UploadSVG />
								</div>
							</button>
						</div>
						{previewUrl ? (
							<div className={style.uploadImg}>
								<img className='pt-3' src={previewUrl} alt='preview' />
								<button
									onClick={() => {
										setPreviewUrl(null)
									}}
								>
									🇽
								</button>
							</div>
						) : null}
					</div>
				)}
			</form>
		</div>
	)
}

export default LeaveReviewForm
