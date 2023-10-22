import Catalog from '@/ui/catalog/Catalog'

export default function ContentLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Catalog title='Catalog'>{children}</Catalog>
		</>
	)
}
