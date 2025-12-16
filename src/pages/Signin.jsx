/** @format */

import { useState } from 'react';
import './Login.css';
import './Signin.css';

export function SigninPage() {
	const [showPass, setShowPass] = useState(false);
	const setPassword = () => {
		setShowPass(!showPass);
	};
	return (
		<div className='login'>
			<div className='login-img'>
				<img
					src='images\login-img.jpg'
					alt='a picture of a lady sitting,smilling and a laptop on her lap with a message app open'
				/>
			</div>
			<div className='login-info'>
				<h2>Welcome Back!</h2>
				<p style={{ marginBottom: '1rem' }}>Get sigin to your account</p>
				<p>Signin with...</p>
				<div className='google-auth-box'>
					<img src='images\google-png.png' alt='Google logo' />
					Google
				</div>
				<div className='hr'>
					<div style={{ width: '100%' }}>
						<hr />
					</div>
					<div> Or</div>
					<div style={{ width: '100%' }}>
						<hr />
					</div>
				</div>
				<div className='form'>
					<div>
						<label htmlFor='profile-img'>Upload Profile Image</label>
						<input
							type='file'
							accept='image/*'
							name='profile-img'
							id='profile-img'
						/>
					</div>
					<div>
						<label htmlFor='email'>Email</label>
						<input type='email' name='email' id='email' />
					</div>
					<div>
						<label htmlFor='password'>Password</label>
						<div className='password-div'>
							<input
								type={showPass ? 'text' : 'password'}
								name='password'
								id='password'
							/>
							<img
								src={showPass ? 'images/unlock.png' : 'images/padlock.png'}
								alt=''
								onClick={setPassword}
							/>
						</div>
					</div>
				</div>

				<div className='login-btn login-btn-sign'>Signin</div>
				<p className='login-signup'>
					<span> Have an account? </span>
					<a href='/login'>Login</a>
				</p>
			</div>
		</div>
	);
}
