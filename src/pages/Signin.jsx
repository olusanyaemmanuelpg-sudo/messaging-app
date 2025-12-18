/** @format */

import { useState } from 'react';
import './Login.css';
import './Signin.css';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, Provider } from '../Firebase/firebase-config.js';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ProfileUpload } from './components/ProfileUpload.jsx';

export function SigninPage() {
	const navigate = useNavigate();

	const [emailSignin, SetEmailSignin] = useState('');
	const [passwordSignin, setPasswordSignin] = useState('');

	const siginWithGoogle = async () => {
		try {
			const userCredential = await signInWithPopup(auth, Provider);
			const user = userCredential.user;
			const name = user.displayName;
			const email = user.email;
			// const profilePic = user.photoURL;

			console.log('User', user);

			const usersCollectionRef = doc(db, 'users', user.uid);
			setDoc(usersCollectionRef, {
				name,
				email,
				uid: user.uid,
			});

			navigate('/chat');
		} catch (error) {
			console.log(error);
		}
	};

	const Signin = async () => {
		try {
			const email = emailSignin;
			const password = passwordSignin;

			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const user = userCredential.user;

			const usersCollectionRef = doc(db, 'users', user.uid);
			setDoc(usersCollectionRef, {
				email,
				uid: user.uid,
			});
			setPasswordSignin('');
			SetEmailSignin('');
			console.log('User', user);
			navigate('/chat');
		} catch (error) {
			console.log(error);
		}
	};

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
					<ProfileUpload />
					<div>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							id='email'
							value={emailSignin}
							onChange={(e) => SetEmailSignin(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='password'>Password</label>
						<div className='password-div'>
							<input
								type={showPass ? 'text' : 'password'}
								name='password'
								id='password'
								value={passwordSignin}
								onChange={(e) => setPasswordSignin(e.target.value)}
							/>
							<img
								src={showPass ? 'images/unlock.png' : 'images/padlock.png'}
								alt=''
								onClick={setPassword}
							/>
						</div>
					</div>
				</div>

				<div className='login-btn login-btn-sign' onClick={Signin}>
					Signin
				</div>
				<p className='login-signup'>
					<span> Have an account? </span>
					<a href='/login'>Login</a>
				</p>
			</div>
		</div>
	);
}
