import { IProduct, TypePaginationProducts } from '@/types/product.interface'

import { axiosClassic, instance } from '@/api/api.interceptor'

import { PRODUCTS, TypeProductDataFilters } from './product.types'

export const ProductService = {
	async getAll(queryData = {} as TypeProductDataFilters) {
		const { data } = await axiosClassic<TypePaginationProducts>({
			url: PRODUCTS,
			method: 'GET',
			params: queryData
		})
		return data
	},
	async getSimilar(id: string | number) {
		return axiosClassic<IProduct[]>({
			url: `${PRODUCTS}/similar/${id}`,
			method: 'GET'
		})
	},
	async getBySlug(slug: string) {
		return axiosClassic<IProduct[]>({
			url: `${PRODUCTS}/by-slug/${slug}`,
			method: 'GET'
		})
	},
	async getByCategory(categorySlug: string) {
		return axiosClassic<IProduct[]>({
			url: `${PRODUCTS}/by-category/${categorySlug}`,
			method: 'GET'
		})
	},
	async getById(id: string | number) {
		return instance<IProduct>({
			url: `${PRODUCTS}/${id}`,
			method: 'GET'
		})
	},
	async getBySetupsId(id: string | number) {
		return instance<IProduct>({
			url: `${PRODUCTS}/by-setups/${id}`,
			method: 'GET'
		})
	},
	async create(productData: any, images: File[], imagesInfo: File[]) {
		const formData = new FormData()
		Object.keys(productData).forEach(key => {
			formData.append(key, productData[key])
		})
		images.forEach(image => {
			formData.append('images', image)
		})
		imagesInfo.forEach(image => {
			formData.append('imagesInfo', image)
		})
		return await instance({
			url: PRODUCTS,
			method: 'POST',
			data: formData
		})
	},
	async update(
		id: number,
		productData: any,
		images: File[],
		imagesInfo: File[]
	) {
		const formData = new FormData()
		Object.keys(productData).forEach(key => {
			formData.append(key, productData[key])
		})
		images.forEach(image => {
			formData.append('images', image)
		})
		imagesInfo.forEach(image => {
			formData.append('imagesInfo', image)
		})
		return await instance({
			url: `${PRODUCTS}/${id}`,
			method: 'PUT',
			data: formData
		})
	},
	async delete(id: string | number) {
		return instance<IProduct>({
			url: `${PRODUCTS}/${id}`,
			method: 'DELETE'
		})
	}
}
