import Footer from '@/ui/layout/footer/Footer'

export default function AccountLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div>
			{children}
			<Footer />
		</div>
	)
}
