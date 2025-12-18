/** @format */

import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, Provider } from '../Firebase/firebase-config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export function LoginPage() {
	const [emailLogin, setEmailLogin] = useState('');
	const [passwordLogin, setPasswordLogin] = useState('');

	const [error, setError] = useState('');

	const navigate = useNavigate();

	const [showPass, setShowPass] = useState(false);
	const setPassword = () => {
		setShowPass(!showPass);
	};

	const Login = async () => {
		try {
			const email = emailLogin;
			const password = passwordLogin;

			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const user = userCredential.user;
			console.log('User', user);

			setEmailLogin('');
			setPasswordLogin('');
			setError('');

			navigate('/chat');
		} catch (error) {
			console.log(error);
			setError(error.message);
		}
	};
	const siginWithGoogle = async () => {
		try {
			const userCredential = await signInWithPopup(auth, Provider);
			const user = userCredential.user;
			const name = user.displayName;
			const email = user.email;

			console.log('User Name', name);
			console.log('User Email', email);
			console.log('User', user);

			setError('');
			navigate('/chat');
		} catch (error) {
			console.log(error);
		}
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
			<div className='login-info'>
				<h2>Welcome Back!</h2>
				<p style={{ marginBottom: '1rem' }}>Get sigin to your account</p>
				<p>Login with...</p>
				<div className='google-auth-box' onClick={siginWithGoogle}>
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
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							id='email'
							value={emailLogin}
							onChange={(e) => setEmailLogin(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='password'>Password</label>
						<div className='password-div'>
							<input
								type={showPass ? 'text' : 'password'}
								name='password'
								id='password'
								value={passwordLogin}
								onChange={(e) => setPasswordLogin(e.target.value)}
							/>
							<img
								src={showPass ? 'images/unlock.png' : 'images/padlock.png'}
								alt=''
								onClick={setPassword}
							/>
						</div>
						{error && <p className='error'>Invalid email or password</p>}
					</div>
				</div>
				<p className='forgot-password'>
					<a href='/reset'>Forgot Password?</a>
				</p>
				<div className='login-btn' onClick={Login}>
					Login
				</div>
				<p className='login-signup'>
					<span> Don't have an account? </span>
					<a href='/signin'>Sign Up</a>
				</p>
			</div>
		</div>
	);
}
