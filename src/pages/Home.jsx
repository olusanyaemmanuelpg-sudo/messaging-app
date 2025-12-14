/** @format */

import Lottie from 'lottie-react';
import animationData from '../assets/Maintenance web.json';
import './Home.css';

export function HomePage() {
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
				<em>navigating to login page...</em>
			</p>
		</>
	);
}
