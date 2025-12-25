/** @format */

import { UseAuth } from '../custom-hooks/UseAuth';
import { signOut } from 'firebase/auth';
import { auth, db } from '../Firebase/firebase-config';
import {
	doc,
	getDoc,
	collection,
	addDoc,
	serverTimestamp,
	query,
	orderBy,
	onSnapshot,
} from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import './Chat.css';

export function ChatPage() {
	const [userProfileUrl, setUserProfileUrl] = useState('');
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');

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
		fetchUser();
	}, [currentUser]);

	useEffect(() => {
		if (!currentUser) return;
		setMessages([]);

		const messageCollectionRef = collection(
			db,
			'chats',
			currentUser.uid,
			'messages',
		);
		const q = query(messageCollectionRef, orderBy('createdAt', 'asc'));

		const unsubscribeFromMessages = onSnapshot(q, (querySnapshot) => {
			const fetchedMessages = [];
			querySnapshot.forEach((doc) => {
				fetchedMessages.push({ id: doc.id, ...doc.data() });
			});
			setMessages(fetchedMessages);
		});
		return () => {
			unsubscribeFromMessages();
		};
	}, [currentUser]);

	const formatRelativeTime = (timestamp) => {
		if (!timestamp) return '';

		const date = timestamp.toDate();
		const now = new Date();
		const yesterday = new Date(now);
		yesterday.setDate(yesterday.getDate() - 1);

		// Helper to check if dates are the same day
		const isSameDay = (d1, d2) => {
			return (
				d1.getFullYear() === d2.getFullYear() &&
				d1.getMonth() === d2.getMonth() &&
				d1.getDate() === d2.getDate()
			);
		};

		if (isSameDay(date, now)) {
			// Today: Show only time (e.g., 10:30 AM)
			return date.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			});
		} else if (isSameDay(date, yesterday)) {
			// Yesterday: Show "Yesterday"
			return 'Yesterday';
		} else {
			// Older: Show the date (e.g., Dec 20, 2025)
			return date.toLocaleDateString([], {
				month: 'short',
				day: 'numeric',
				year: 'numeric',
			});
		}
	};

	const sendMessage = async () => {
		if (!newMessage) return;
		try {
			const messagesCollectionRef = collection(
				db,
				'chats',
				currentUser.uid,
				'messages',
			);
			await addDoc(messagesCollectionRef, {
				text: newMessage,
				createdAt: serverTimestamp(),
				adminMessage: false,
				adminProfile: userProfileUrl,
			});

			console.log('Message sent successfully!');
			setNewMessage('');
		} catch (error) {
			console.error('Error sending message: ', error);
		}
	};
	const messagesEndRef = useRef(null);
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};
	useEffect(() => {
		scrollToBottom();
	}, [messages]);

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
			<main className='user-chats'>
				<section className='about-admin'></section>
				<section className='user-chat'>
					<div className='chat-messages'>
						{messages ?
							messages.map((msg) => (
								<div
									key={msg.id}
									className={`message user-message ${msg.adminMessage ? 'admin' : 'user'}`}>
									<p>{msg.text}</p>
									<span className='timestamp'>
										{formatRelativeTime(msg.createdAt)}
									</span>
								</div>
							))
						:	<p className='select-conversation'>Select a conversation</p>}
						<div ref={messagesEndRef} />
					</div>
					<div className='input-div'>
						<input
							type='text'
							placeholder='Type your message'
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
						/>
						<div className='img' onClick={sendMessage}>
							<img src='images/send.png' alt='send' />
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
