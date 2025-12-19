/** @format */

import { UseAuth } from '../custom-hooks/UseAuth';
import { signOut } from 'firebase/auth';
import { auth, db } from '../Firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import './Chat.css';

export function ChatPage() {
	const [userProfileUrl, setUserProfileUrl] = useState('');

	const navigate = useNavigate();
	const currentUser = UseAuth();

	const Logout = () => {
		try {
			signOut(auth);
			alert('logout');
		} catch (error) {
			console.log(error);
		}

		navigate('/login');
	};

	const fetchUser = async () => {
		try {
			const userDoc = await doc(db, 'users', currentUser.uid);
			const userSnapshot = await getDoc(userDoc);
			if (userSnapshot.exists()) {
				setUserProfileUrl(userSnapshot.data().profileUrl);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUser();
	}, [currentUser]);

	return (
		<>
			<header>
				<div className='header-logo'>
					<h2>Web Deji</h2>
					<img src='images/chat.png' alt='Welcome to the chat' />
				</div>
				<div className='header-userInfo'>
					<img
						src={userProfileUrl ? userProfileUrl : 'images/user.png'}
						alt=''
					/>
					<p>{currentUser ? currentUser.email : 'Person'}</p>
					<button onClick={Logout}>Logout</button>
				</div>
			</header>
		</>
	);
}
