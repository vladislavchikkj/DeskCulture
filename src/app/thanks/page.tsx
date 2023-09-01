'use client'
import { useLayout } from '@/components/context/LayoutContext'
import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { Metadata } from 'next'
import { useEffect } from 'react'

export const metadata: Metadata = {
	title: 'Thanks',
	...NO_INDEX_PAGE
}

export default function ThanksPage() {
	//решить проблему с дублирование
	const { updateLayout } = useLayout()
	useEffect(() => {
		updateLayout(false)
	}, [])
	return <div>Thanks</div>
}
