import { IOptions } from '@/types/checkout.interface'
// @ts-ignore
import { PhoneNumberUtil } from 'google-libphonenumber'
import { getNames, registerLocale } from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'
import { StylesConfig } from 'react-select'

export const options: IOptions[] = [
	{
		value: 'united states',
		label: 'United States'
	},
	{
		value: 'usa',
		label: 'USA'
	},
	{
		value: 'canada',
		label: 'Canada'
	},
	{
		value: 'australia',
		label: 'Australia'
	}
]
export const customStyles: StylesConfig<IOptions | string, false> = {
	control: (provided, state) => ({
		...provided,
		width: '100%',
		border: state.isFocused
			? '1px solid #00000050'
			: '1px solid rgba(0, 0, 0, 0.2)',
		outline: 'none',
		paddingBottom: '0.3vh',
		paddingTop: '0.3vh'
	}),
	placeholder: provided => ({
		...provided,
		display: 'flex',
		color: 'rgba(0, 0, 0, 0.5)',
		fontSize: '10px',
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '800',
		letterSpacing: '1.32px',
		textTransform: 'uppercase'
	})
}

registerLocale(enLocale)

const phoneNumberUtil = PhoneNumberUtil.getInstance()
const getMappedCountryPhoneCodes = () => {
	const regions = phoneNumberUtil.getSupportedRegions()
	const countryNames = getNames('en')
	const codes = regions.map((regionCode: any) => {
		const countryCode = phoneNumberUtil.getCountryCodeForRegion(regionCode)
		const alpha2Code = regionCode

		let countryName = countryNames[alpha2Code] || regionCode

		return {
			value: `+${countryCode}`,
			label: `+${countryCode} ${countryName}`
		}
	})

	return codes
}

export const phoneCodes = getMappedCountryPhoneCodes()
