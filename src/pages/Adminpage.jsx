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
	addDoc,
	serverTimestamp,
	setDoc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import './AdminPage.css';

export function AdminPage() {
	const [chats, setChats] = useState([]);
	const [userProfileUrl, setUserProfileUrl] = useState('');
	const [selectedChat, setSelectedChat] = useState(null);
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

		const unsubscribeFromChats = onSnapshot(q, async (snapshot) => {
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
		});

		return () => {
			unsubscribeFromChats();
		};
	}, []);

	useEffect(() => {
		if (!selectedChat) return;
		setMessages([]);

		const messageCollectionRef = collection(
			db,
			'chats',
			selectedChat.id,
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
	}, [selectedChat]);

	const sendMessage = async () => {
		if (!newMessage) return;
		try {
			const messagesCollectionRef = collection(
				db,
				'chats',
				selectedChat.id,
				'messages',
			);
			await addDoc(messagesCollectionRef, {
				text: newMessage,
				createdAt: serverTimestamp(),
				adminMessage: true,
			});

			const chatDocRef = doc(db, 'chats', selectedChat.id);
			await setDoc(
				chatDocRef,
				{
					lastMessage: newMessage,
					lastTimestamp: serverTimestamp(),
					lastSenderId: 'admin',
				},
				{ merge: true },
			);

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

	// Function to format timestamp like WhatsApp
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
							<div
								className='admin-chat-info-user'
								key={chat.id}
								onClick={() => setSelectedChat(chat)}
								style={{
									border:
										selectedChat?.id === chat.id ? '1px solid #333' : 'none',
								}}>
								<div className='admin-chat-info-user-info'>
									<img
										src={chat ? chat.profileUrl : 'images/robot.png'}
										alt='User'
										className='user-img'
									/>
									<div className='admin-chat-info-user-div'>
										<p className='truncate-text'>{chat.name}</p>
										<p
											className='truncate-text'
											style={{
												color:
													chat.lastSenderId !== 'admin' ? '#00bfa5' : '#666',
												fontWeight:
													chat.lastSenderId !== 'admin' ? 'italic' : 'normal',
											}}>
											{chat.lastSenderId !== 'admin' ?
												`User: ${chat.lastMessage}`
											:	`You: ${chat.lastMessage}`}
										</p>
									</div>
								</div>
								<div>
									<p className='chat-time'>
										{formatRelativeTime(chat.lastTimestamp)}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>
				<section className='admin-chat-input'>
					<div className='chat-messages'>
						{selectedChat ?
							messages.map((msg) => (
								<div
									key={msg.id}
									className={`message ${msg.adminMessage ? 'admin' : 'user'}`}>
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
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									sendMessage();
								}
							}}
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
