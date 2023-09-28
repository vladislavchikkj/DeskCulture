import Button from '@/ui/common/buttons/Button'
import { FC, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
import style from './products.module.scss'

export interface IProductFields {
	name: string
	slug: string
	price: number
	description: string
	image: File
	category: string
	setup: string
}

interface ProductCategory {
	label: string
	value: string
}

const productCategories: ProductCategory[] = [
	{ label: 'Desk', value: 'desk' },
	{ label: 'Mouse', value: 'mouse' },
	{ label: 'Keyboards', value: 'keyboards' }
]

interface Setup {
	label: string
	value: string
}

const productSetups: Setup[] = [
	{ label: 'White', value: 'white' },
	{ label: 'Dark', value: 'dark' },
	{ label: 'Gold', value: 'gold' }
]

const LeaveProductForm: FC = () => {
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
	} = useForm<IProductFields>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IProductFields> = (data: IProductFields) => {
		// POST запрос на сервер для создания нового продукта здесь
		console.log('Data', data)
		reset()
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={style.formName}>Leave a product</div>

				<input
					{...formRegister('name', {
						required: 'Name is required'
					})}
					placeholder='Name *'
				/>
				{errors.name && <span>{errors.name.message}</span>}

				<input
					{...formRegister('slug', {
						required: 'Slug is required'
					})}
					placeholder='Slug *'
				/>
				{errors.slug && <span>{errors.slug.message}</span>}

				<input
					{...formRegister('price', {
						required: 'Price is required',
						pattern: {
							value: /^\d+(.\d{1,2})?$/,
							message: 'Invalid price format'
						}
					})}
					placeholder='Price *'
				/>
				{errors.price && <span>{errors.price.message}</span>}

				<textarea
					{...formRegister('description', {
						required: 'Description is required'
					})}
					placeholder='Description *'
				/>
				{errors.description && <span>{errors.description.message}</span>}

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
					Upload Image
				</button>

				{previewUrl && (
					<div>
						<img src={previewUrl} alt='preview' />
						<button
							onClick={() => {
								setPreviewUrl(null)
							}}
						>
							🇽
						</button>
					</div>
				)}

				<Controller
					control={control}
					name='category'
					rules={{ required: 'Category is required!' }}
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<div className='mb-5'>
							<ReactSelect
								options={productCategories}
								placeholder='Category'
								value={productCategories.find(option => option.value === value)}
								onChange={newValue =>
									onChange((newValue as ProductCategory).value)
								}
							/>
							{errors?.category && (
								<div className='text-red mt-1 mb-3 text-sm'>
									{errors.category?.message}
								</div>
							)}
						</div>
					)}
				/>

				<Controller
					control={control}
					name='setup'
					rules={{ required: 'Setup is required!' }}
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<div>
							<ReactSelect
								options={productSetups}
								placeholder='Setup'
								value={productSetups.find(option => option.value === value)}
								onChange={newValue => onChange((newValue as Setup).value)}
							/>
							{errors?.setup && (
								<div className='text-red mt-1 mb-3 text-sm'>
									{errors.setup?.message}
								</div>
							)}
						</div>
					)}
				/>

				<div>
					<Button type='submit' variant={'black'}>
						Create
					</Button>
				</div>
			</form>
		</div>
	)
}

export default LeaveProductForm
