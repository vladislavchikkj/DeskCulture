export function emitCustomEvent(eventName: string, payload?: any): void {
	const customEvent = new CustomEvent(eventName, {
		detail: payload,
		bubbles: true
	})

	document.body.dispatchEvent(customEvent)
}
