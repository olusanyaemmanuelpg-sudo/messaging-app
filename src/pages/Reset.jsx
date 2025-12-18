/** @format */

import { useState } from 'react';
import './Login.css';
import './Signin.css';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import { Toast } from './Toast';

export function ResetPage() {
	const [showToast, setShowToast] = useState(false);
	const [emailSignin, SetEmailSignin] = useState('');
	const [error, setError] = useState('');

	const auth = getAuth();

	const Reset = async (e) => {
		e.preventDefault();
		if (!emailSignin) {
			setError('Please enter your email address');
			return;
		}
		try {
			const email = emailSignin;
			await sendPasswordResetEmail(auth, email);
			setShowToast(true);
			setError('');
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			setError(`Error sending reset email: ${errorCode} - ${errorMessage}`);
		}

		setTimeout(() => setShowToast(false), 5000);
	};
	return (
		<div className='login'>
			<div className='login-img'>
				<img
					src='images\login-img.jpg'
					loading='lazy'
					alt='a picture of a lady sitting,smilling and a laptop on her lap with a message app open'
				/>
			</div>
			{showToast && <Toast />}
			<div className='login-info'>
				<h2>Reset Password</h2>
				<p style={{ marginBottom: '1rem' }}>
					Enter your email address and we will send you a password reset link.
				</p>

				<div className='form'>
					<div>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							id='email'
							value={emailSignin}
							onChange={(e) => SetEmailSignin(e.target.value)}
						/>
						{error && <p className='error'>{error}</p>}
					</div>
				</div>

				<div className='login-btn login-btn-sign' onClick={Reset}>
					Reset
				</div>
			</div>
		</div>
	);
}
