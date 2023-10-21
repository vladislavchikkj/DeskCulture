import { ICategory } from './category.interface'
import { IProductType } from './productType.interface'
import { IReview } from './review.interface'
import { ISetups } from './setups.interface'

export interface IProduct {
	id: number
	name: string
	slug: string
	description: string
	info: string
	remains: number
	price: number
	reviews: IReview[]
	images: string[]
	createdAt: string
	category: ICategory
	setups?: ISetups
	productType: IProductType[]
}

export interface IProductDetails {
	product: IProduct
}

export type TypeProducts = {
	products: IProduct[]
}

export type TypePaginationProducts = {
	[x: string]: any
	length?: number
	products: IProduct[]
}

export type TypePaginationCategories = {
	categoriesLength?: number
	categories: ICategory[]
}
export type TypePaginationSetup = {
	setupsLength?: number
	setups: ISetups[]
}

export type TypeCombinedPagination = {
	product?: IProduct
} & TypePaginationCategories &
	TypePaginationSetup &
	TypePaginationProducts

export type TypePaginationСatalog = {
	products: IProduct[]
	categories: ICategory[]
	setups: ISetups[]
}
