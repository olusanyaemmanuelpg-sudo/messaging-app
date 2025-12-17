/** @format */

import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { SigninPage } from './pages/Signin';
import { ChatPage } from './pages/Chat';
import './App.css';

function App() {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/signin' element={<SigninPage />} />
			<Route path='/chat' element={<ChatPage />} />
		</Routes>
	);
}

export default App;
