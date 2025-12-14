/** @format */

import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import './App.css';

function App() {
	return (
		<Routes>
			<Route path='/' element={<h1>Home</h1>} />
			<Route path='/login' element={<LoginPage />} />
		</Routes>
	);
}

export default App;
