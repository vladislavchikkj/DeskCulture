import { CategoryService } from '@/services/category.service'
import { ICategory } from '@/types/category.interface'
import { IOptions } from '@/types/checkout.interface'
import Button from '@/ui/common/buttons/Button'
import Field from '@/ui/common/input/Field'
import { FC, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { StylesConfig } from 'react-select'
import UploadSVG from './icon/upload.svg'
import style from './updateCategoriesForm.module.scss'

export interface ICategoryFields {
	name: string
	slug: string
	description: string
	image: File
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
	category: ICategory | null
	updateCategories: () => void
}

const UpdateCategoriesForm: FC<Props> = ({
	categories,
	category,
	updateCategories
}) => {
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [selectedFile, setSelectedFile] = useState<File[] | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string[] | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

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
	} = useForm<ICategoryFields>({
		mode: 'onChange'
	})
	if (!category) {
		throw new Error('Product is undefined') // или обработать эту ситуацию любым другим способом
	}
	const onSubmit: SubmitHandler<ICategoryFields> = async (
		data: ICategoryFields
	) => {
		console.log(data)
		try {
			let updatedCategory: any // Here we will store the updated product
			if (selectedFile) {
				if (category) {
					// Если product существует, значит мы обновляем продукт
					updatedCategory = await CategoryService.update(
						category.id,
						data,
						selectedFile
					)
				} else {
					// Если product не существует, значит мы создаем новый продукт
					updatedCategory = await CategoryService.create(data, selectedFile)
				}
				setIsSubmitted(true) // обновляем состояние после успешной отправки формы
				reset()

				// Тут вызывайте функцию обновления
				updateCategories()
			} else {
				console.log('No file selected')
			}
		} catch (err: any) {
			console.log(err.message) // Обработка ошибок
		}
	}
	if (isSubmitted) return <div>Category successfully update!</div>
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={style.formName}>Create a category</div>

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

				<input
					type='file'
					accept='image/*'
					style={{ display: 'none' }}
					ref={fileInputRef}
					onChange={handleFileInputChange}
					multiple
				/>

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

export default UpdateCategoriesForm
