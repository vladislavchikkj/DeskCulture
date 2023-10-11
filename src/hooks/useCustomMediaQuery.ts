import { useEffect, useState } from 'react'

const useCustomMediaQuery = () => {
	const [device, setDevice] = useState('desktop')

	useEffect(() => {
		const checkDevice = () => {
			if (window.matchMedia('(max-width: 320px)').matches) {
				setDevice('mobile_s')
			} else if (window.matchMedia('(max-width: 567px)').matches) {
				setDevice('mobile_m')
			} else if (window.matchMedia('(max-width: 768px)').matches) {
				setDevice('tablet')
			} else if (window.matchMedia('(max-width: 1200px)').matches) {
				setDevice('laptop')
			} else {
				setDevice('desktop')
			}
		}
		// Check on mount (optional).
		checkDevice()

		// Attach the listeners to each of the media queries
		const listeners = [
			window.matchMedia('(max-width: 320px)'),
			window.matchMedia('(max-width: 567px)'),
			window.matchMedia('(max-width: 768px)'),
			window.matchMedia('(max-width: 1200px)')
		]

		listeners.forEach(listener => {
			listener.addListener(checkDevice) // Adding the listener
		})

		// Will be triggered once, on unmount
		return () => {
			listeners.forEach(listener => {
				listener.removeListener(checkDevice) // Removing the listener
			})
		}
	}, [])

	return device
}

export default useCustomMediaQuery
