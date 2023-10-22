'use client'
import { useLayout } from '@/components/context/LayoutContext'
import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { Metadata } from 'next'
import { useEffect } from 'react'
import style from './policy.module.scss'

export const metadata: Metadata = {
	title: 'Policy',
	...NO_INDEX_PAGE
}

export default function ThanksPage() {
	//решить проблему с дублирование
	const { updateLayout } = useLayout()
	useEffect(() => {
		updateLayout(false)
	}, [])
	return (
		<div className='container-f'>
			<div className={style.title}>Private policy</div>
			<div className={style.text}>
				<br />
				<div className={style.data}>
					<p>Effective date: [11.05.2018]</p>
				</div>
				<br />
				<p>
					At DeskCulture, we value the privacy of our users and are committed to
					protecting it. This Privacy Policy outlines the types of personal
					information we collect when you use our website, how we use and
					safeguard that information, and the choices you have regarding your
					personal information.
				</p>
				<br />
				<p>
					By using the DeskCulture website, you consent to the data practices
					described in this Privacy Policy. If you have any questions or
					concerns about our Privacy Policy, please contact us at
					desk.culture.official@gmail.com.
				</p>
				<br />
				<strong>
					<h2>Information We Collect</h2>
				</strong>
				<br />
				<strong>
					<h3>1.1 Personal Information</h3>
				</strong>
				<br />
				<p>
					When you make a purchase or register an account on our website, we may
					collect certain personally identifiable information, including but not
					limited to your name, email address, shipping address, and payment
					details. We ensure that any personal information collected is used
					only for the purposes for which it was provided.
				</p>
				<br />
				<strong>
					<h3>1.2 Cookies and Usage Data</h3>
				</strong>
				<br />
				<p>
					We may use cookies and similar technologies to collect usage data and
					enhance your experience on our website. This information may include
					your browser type, operating system, IP address, and browsing
					behavior. Cookies are small text files that are stored on your device
					and help us improve our services.
				</p>
				<br />
				<strong>
					<h2>Use of Information</h2>
				</strong>
				<br />
				<strong>
					<h3>2.1 Personalization and Communication</h3>
				</strong>
				<br />
				<p>
					We may use the information we collect to personalize your shopping
					experience, communicate with you about your orders, provide customer
					support, and inform you about our products, promotions, and updates.
					We may also use your information to improve our website, prevent
					fraudulent activities, and analyze trends and customer preferences.
				</p>
				<br />
				<strong>
					<h3>2.2 Third-Party Service Providers</h3>
				</strong>
				<br />
				<p>
					We may engage third-party companies and individuals to perform certain
					services on our behalf, such as payment processing, shipping, or data
					analysis. These third-party service providers have access to your
					personal information only to perform these tasks and are obligated to
					maintain its confidentiality.
				</p>
				<br />
				<strong>
					<h3>2.3 Legal Compliance</h3>
				</strong>
				<br />
				<p>
					We may disclose your personal information if required to do so by law
					or in response to valid requests by public authorities.
				</p>
				<br />
				<strong>
					<h2>3. Data Security</h2>
				</strong>
				<br />
				<p>
					We take reasonable measures to safeguard your personal information
					from unauthorized access, use, or disclosure. However, no method of
					transmission over the internet or electronic storage is 100% secure.
					Therefore, while we strive to protect your personal information, we
					cannot guarantee its absolute security.
				</p>
				<br />
				<strong>
					<h2>Your Rights and Choices</h2>
				</strong>
				<br />
				<strong>
					<h3>4.1 Access and Modification</h3>
				</strong>
				<br />
				<p>
					You have the right to access, correct, or update your personal
					information at any time. You can do this by logging into your account
					or contacting us directly.
				</p>
				<br />
				<strong>
					<h3>4.2 Opt-Out</h3>
				</strong>
				<br />
				<p>
					If you no longer wish to receive promotional emails or newsletters
					from us, you can opt out by following the instructions provided in the
					communication or by contacting us.
				</p>
				<br />
				<strong>
					<h3>4.3 Do Not Track Signals</h3>
				</strong>
				<br />
				<p>
					We do not respond to "Do Not Track" signals or similar mechanisms that
					provide users with the ability to exercise choice regarding the
					collection of their personal information.
				</p>
				<br />
				<strong>
					<h2>Children's Privacy</h2>
				</strong>
				<br />
				<p>
					Our website is not intended for individuals under the age of 18. We do
					not knowingly collect personal information from children. If you are a
					parent or guardian and believe that your child has provided us with
					personal information, please contact us, and we will delete such
					information from our records.
				</p>
				<br />
				<strong>
					<h2>Changes to this Privacy Policy</h2>
				</strong>
				<br />
				<p>
					We may update this Privacy Policy from time to time to reflect changes
					in our practices or legal obligations. We encourage you to review this
					page periodically for any updates. Your continued use of our website
					after any changes to this Privacy Policy will signify your acceptance
					of those changes.
				</p>
				<br />
				<strong>
					<h2>Contact Us</h2>
				</strong>
				<br />
				<p>
					If you have any questions or concerns about our Privacy Policy or your
					personal information, please contact us at
					desk.culture.official@gmail.com. We will do our best to address any
					concerns and resolve any issues you may have.
				</p>
				<br />
				<p>
					Please note that this Privacy Policy applies only to the DeskCulture
					website and not to any third-party websites that may be linked to from
					our website.
				</p>
				<br />
				<div className={style.data}>
					<p>Last Updated: [10.23.23]</p>
				</div>
			</div>
		</div>
	)
}
