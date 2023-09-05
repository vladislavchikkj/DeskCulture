import Catalog from '@/ui/catalog/Catalog'

export default function CatalogLayout({
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
