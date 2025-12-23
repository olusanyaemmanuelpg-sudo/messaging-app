/** @format */
import { UseAuth } from '../custom-hooks/UseAuth';
import { signOut } from 'firebase/auth';
import { auth, db } from '../Firebase/firebase-config';
import {
	doc,
	getDoc,
	collection,
	query,
	orderBy,
	onSnapshot,
} from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import './AdminPage.css';

export function AdminPage() {
	const [chats, setChats] = useState([]);
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

	useEffect(() => {
		const fetchAdminProfile = async () => {
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
		fetchAdminProfile();
	}, [currentUser]);

	useEffect(() => {
		const chatCollectionRef = collection(db, 'chats');
		const q = query(chatCollectionRef, orderBy('lastTimestamp', 'desc'));

		const unsubscribeFromChats = onSnapshot(
			q,
			async (snapshot) => {
				const chatsList = snapshot.docs.map((document) => ({
					id: document.id, // The ID here is the User's UID
					...document.data(),
				}));

				const chatWithUserDetails = await Promise.all(
					chatsList.map(async (chat) => {
						const userDoc = await doc(db, 'users', chat.id);
						const userSnapshot = await getDoc(userDoc);
						if (userSnapshot.exists()) {
							return {
								...chat,
								user: userSnapshot.data(),
								profileUrl: userSnapshot.data().profileUrl,
								name: userSnapshot.data().name || userSnapshot.data().email,
							};
						}
						return chat;
					}),
				);
				setChats(chatWithUserDetails);
				return () => {
					unsubscribeFromChats();
				};
			},
			[],
		);
	});

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
			<main>
				<section className='admin-chat-info'>
					<input type='text' placeholder='Search for users' />
					<div className='admin-chat-info-users-list'>
						{chats.map((chat) => (
							<div className='admin-chat-info-user' key={chat.id}>
								<div className='admin-chat-info-user-info'>
									<img
										src={chat ? chat.profileUrl : 'images/robot.png'}
										alt='User'
										className='user-img'
									/>
									<div className='admin-chat-info-user-div'>
										<p className='truncate-text'>{chat.name}</p>
										<p className='truncate-text'>{chat.lastMessage}</p>
									</div>
								</div>
								<div>
									<p>{chat.lastTimestamp.toDate().toLocaleString()}</p>
								</div>
							</div>
						))}
					</div>
				</section>
				<section className='admin-chat-input'>
					<div className='chat-messages'>
						<p className='select-conversation'>Select a conversation</p>
					</div>
					<div className='input-div'>
						<input type='text' placeholder='Type your message' />
						<div className='img'>
							<img src='images/send.png' alt='send' />
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
