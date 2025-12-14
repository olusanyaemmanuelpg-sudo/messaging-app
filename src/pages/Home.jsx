/** @format */

import Lottie from 'lottie-react';
import { useState, useEffect } from 'react';
import animationData from '../assets/Maintenance web.json';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export function HomePage() {
	const [countdown, setCountdown] = useState(12);

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prevCountdown) => prevCountdown - 1);
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const navigate = useNavigate();

	setTimeout(() => {
		navigate('/login');
	}, 12000);

	return (
		<>
			<main className='home'>
				<div className='home-info'>
					<h1>WELCOME</h1>
					<h2>
						This is <span style={{ color: 'red' }}>We</span>
						<span style={{ color: 'darkOrange' }}>bD</span>
						<span style={{ color: 'green' }}>eji</span> Messaging App.
					</h2>
				</div>
				<div className='home-img'>
					<Lottie animationData={animationData} loop={true} autoPlay={true} />
				</div>
			</main>
			<p className='home-footer'>
				<em>navigating to login page...{countdown}</em>
			</p>
		</>
	);
}
