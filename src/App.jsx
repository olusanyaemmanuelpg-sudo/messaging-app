/** @format */

import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { SigninPage } from './pages/Signin';
import { ChatPage } from './pages/Chat';
import { ResetPage } from './pages/Reset';
import { AdminPage } from './pages/Adminpage';

import './App.css';
import { useState } from 'react';

function App() {
	const [userProfileUrl, setUserProfileUrl] = useState('');
	const [loading, setLoading] = useState(false);

	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route
				path='/signin'
				element={
					<SigninPage
						userProfileUrl={userProfileUrl}
						setUserProfileUrl={setUserProfileUrl}
						loading={loading}
						setLoading={setLoading}
					/>
				}
			/>
			<Route path='/admin-page' element={<AdminPage />} />
			<Route path='/chat' element={<ChatPage />} />
			<Route path='/reset' element={<ResetPage />} />
		</Routes>
	);
}

export default App;
