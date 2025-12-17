/** @format */

import { UseAuth } from '../custom-hooks/UseAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase-config';
import { useNavigate } from 'react-router';
import './Chat.css';

export function ChatPage() {
	const navigate = useNavigate();
	const currentUser = UseAuth();
	console.log('currentUser', currentUser);

	const Logout = () => {
		try {
			signOut(auth);
			alert('logout');
		} catch (error) {
			console.log(error);
		}

		navigate('/login');
	};

	return (
		<>
			<header>
				<div>
					<img src='images/padlock.png' alt='Welcome to the chat' />
				</div>
				<div className='header-userInfo'>
					<img
						src={currentUser ? currentUser.photoURL : 'images/user.png'}
						alt=''
					/>
					<p>{currentUser ? currentUser.email : 'Person'}</p>
					<button onClick={Logout}>Logout</button>
				</div>
			</header>
			<main></main>
		</>
	);
}
