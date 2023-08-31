'use client'

import { OrderService } from '@/services/order.service'
import { useQuery } from '@tanstack/react-query'

interface IMyOrders {}

export default function myOrders({}: IMyOrders) {
	const { data: orders } = useQuery(
		['my orders'],
		() => OrderService.getAll(),
		{ select: ({ data }) => data }
	)
	return <div>MyOrders</div>
}
