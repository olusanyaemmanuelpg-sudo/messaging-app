/** @format */

import './Login.css';

export function LoginPage() {
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
				<p>Login with...</p>
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
					{/* <div>
						<label htmlFor='profile-img'>Upload Profile Image</label>
						<input
							type='file'
							accept='image/*'
							name='profile-img'
							id='profile-img'
						/>
					</div> */}
					<div>
						<label htmlFor='email'>Email</label>
						<input type='email' name='email' id='email' />
					</div>
					<div>
						<label htmlFor='password'>Password</label>
						<input type='password' name='password' id='password' />
					</div>
				</div>
				<p className='forgot-password'>
					<a href=''>Forgot Password?</a>
				</p>
				<div className='login-btn'>Login</div>
				<p className='login-signup'>
					<span> Don't have an account? </span>
					<a href=''>Sign Up</a>
				</p>
			</div>
		</div>
	);
}
