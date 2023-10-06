import { ProductService } from '@/services/product/product.service'
import { ICategory } from '@/types/category.interface'
import { IOptions } from '@/types/checkout.interface'
import { IProduct } from '@/types/product.interface'
import { ISetups } from '@/types/setups.interface'
import Button from '@/ui/common/buttons/Button'
import Field from '@/ui/common/input/Field'
import { FC, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ReactSelect, { StylesConfig } from 'react-select'
import UploadSVG from './icon/upload.svg'
import style from './leaveProductForm.module.scss'

export interface IProductFields {
	name: string
	slug: string
	price: number
	description: string
	info: string
	remains: number
	image: File
	categoryId: string
	setupsId: string
}

interface ProductCategory {
	label: string
	value: string
}

interface Setup {
	label: string
	value: string
}

export const customStyles: StylesConfig<IOptions | string, false> = {
	control: (provided, state) => ({
		...provided,
		width: '100%',
		border: state.isFocused
			? '1px solid #00000050'
			: '1px solid rgba(0, 0, 0, 0.2)',
		outline: 'none',
		paddingBottom: '0.3vh',
		paddingTop: '0.3vh'
	}),
	placeholder: provided => ({
		...provided,
		display: 'flex',
		color: 'rgba(0, 0, 0, 0.5)',
		fontSize: '10px',
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '800',
		letterSpacing: '1.32px',
		textTransform: 'uppercase'
	})
}

type Props = {
	categories: ICategory[]
	setups: ISetups[]
	products: IProduct[]
	updateProducts: () => Promise<void>
}

const LeaveProductForm: FC<Props> = ({
	categories,
	setups,
	products,
	updateProducts
}) => {
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [selectedFile, setSelectedFile] = useState<File[] | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string[] | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const productCategories: ProductCategory[] = categories.map(category => ({
		label: category.name,
		value: category.id.toString()
	}))

	const productSetups: Setup[] = setups.map(setup => ({
		label: setup.name,
		value: setup.id.toString()
	}))

	const handleFileInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files
		if (!files) return

		const fileArray = Array.from(files)
		setSelectedFile(prevFiles =>
			prevFiles ? [...prevFiles, ...fileArray] : fileArray
		) // добавляем новые файлы к существующим

		const fileUrlArray = fileArray.map(file => URL.createObjectURL(file))
		setPreviewUrl(prevUrls =>
			prevUrls ? [...prevUrls, ...fileUrlArray] : fileUrlArray
		) // добавляем новые URL к существующим
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

	const onSubmit: SubmitHandler<IProductFields> = async (
		data: IProductFields
	) => {
		console.log(data)
		// POST запрос на сервер для создания нового продукта здесь
		try {
			if (selectedFile) {
				await ProductService.create(data, selectedFile)
				setIsSubmitted(true) // обновляем состояние после успешной отправки формы
				updateProducts() // вызываем функцию обратного вызова
				reset()
			} else {
				console.log('No file selected')
			}
		} catch (err: any) {
			console.log(err.message) // Обработка ошибок
		}
	}
	if (isSubmitted) return <div>Product successfully create!</div>
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={style.formName}>Create a product</div>

				<Field
					{...formRegister('name', {
						required: 'Name is required'
					})}
					placeholder='Name *'
					error={errors.name && errors.name.message}
				/>

				<Field
					{...formRegister('slug', {
						required: 'Slug is required'
					})}
					placeholder='Slug *'
					error={errors.slug && errors.slug.message}
				/>

				<Field
					{...formRegister('price', {
						required: 'Price is required',
						pattern: {
							value: /^\d+(.\d{1,2})?$/,
							message: 'Invalid price format'
						}
					})}
					placeholder='Price *'
					error={errors.price && errors.price.message}
				/>

				<div>
					<textarea
						className={style.textArea}
						{...formRegister('info', {
							required: 'Info is required'
						})}
						placeholder='Info *'
					/>
					{errors.info && <span>{errors.info.message}</span>}
				</div>
				<div>
					<textarea
						className={style.textArea}
						{...formRegister('description', {
							required: 'Description is required'
						})}
						placeholder='Description *'
					/>
					{errors.description && <span>{errors.description.message}</span>}
				</div>
				<Field
					{...formRegister('remains', {
						required: 'Remains is required'
					})}
					type='number'
					placeholder='Remains *'
					error={errors.name && errors.name.message}
				/>

				<input
					type='file'
					accept='image/*'
					style={{ display: 'none' }}
					ref={fileInputRef}
					onChange={handleFileInputChange}
					multiple
				/>

				<div className={style.controllers}>
					<Controller
						control={control}
						name='categoryId'
						rules={{ required: 'Category is required!' }}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<div className={style.controller}>
								<ReactSelect
									options={productCategories}
									placeholder='Category'
									value={productCategories.find(
										option => option.value === value
									)}
									onChange={newValue =>
										onChange((newValue as ProductCategory).value)
									}
									styles={customStyles}
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
								{errors?.categoryId && (
									<div className='text-red mt-1 mb-3 text-sm'>
										{errors.categoryId?.message}
									</div>
								)}
							</div>
						)}
					/>

					<Controller
						control={control}
						name='setupsId'
						rules={{ required: 'Setup is required!' }}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<div className={style.controller}>
								<ReactSelect
									options={productSetups}
									placeholder='Setup'
									value={productSetups.find(option => option.value === value)}
									onChange={newValue => onChange((newValue as Setup).value)}
									styles={customStyles}
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
								{errors?.setupsId && (
									<div className='text-red mt-1 mb-3 text-sm'>
										{errors.setupsId?.message}
									</div>
								)}
							</div>
						)}
					/>
				</div>
				<button
					type='button'
					onClick={onFileInputClick}
					className={style.upload}
				>
					<div className={style.uploadBtn}>
						<div>upload image</div>
						<UploadSVG />
					</div>
				</button>
				<div className={style.previewImg}>
					{previewUrl &&
						previewUrl.map((url, index) => (
							<div className={style.uploadImg} key={index}>
								<img src={url} alt='preview' />
								<button
									onClick={() => {
										setPreviewUrl(
											prevUrls =>
												prevUrls?.filter((_, i) => i !== index) ?? null
										)
									}}
								>
									<div className={style.closeImg}>✕</div>
								</button>
							</div>
						))}
				</div>
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
