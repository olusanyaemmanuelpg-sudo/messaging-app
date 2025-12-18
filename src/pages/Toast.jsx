/** @format */

import './Toast.css';

export function Toast() {
	return (
		<div className='toast'>
			<img src='images\checked.png' alt='A ticked logo' />
			<div>
				<p>Email sent successfully</p>
				<br />
				<ul>
					<li>Check your email for a reset link</li>
					<li>If not seen, check your email spam folder</li>
				</ul>
			</div>
		</div>
	);
}
