import { IProduct } from './product.interface'

export interface ISetups {
	id: number | number
	name: string
	description: string
	image: string
	products?: IProduct[]
}
