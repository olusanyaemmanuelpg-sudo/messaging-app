/** @format */

import { useState } from 'react';
// import { auth, db } from '../../Firebase/firebase-config';

export function ProfileUpload() {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState('');

	const [image, setImage] = useState(null);

	// !! REPLACE THESE WITH YOUR OWN DETAILS !!
	const CLOUD_NAME = '';
	const UPLOAD_PRESET = '';

	const uploadImage = async () => {
		if (!image) return;

		setLoading(true);
		const formData = new FormData();
		formData.append('file', image);
		formData.append('upload_preset', UPLOAD_PRESET);

		try {
			const response = await fetch(
				`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
				{
					method: 'POST',
					body: formData,
				},
			);

			const data = await response.json();
			if (data.secure_url) {
				setImageUrl(data.secure_url);
				console.log('Image uploaded URL:', data.secure_url);
				// CALL A FUNCTION HERE TO SAVE data.secure_url TO FIREBASE FIRESTORE
			} else {
				console.error('Upload failed', data);
			}
		} catch (error) {
			console.error('Error during upload:', error);
		} finally {
			setLoading(false);
		}
	};
	console.log(imageUrl);

	const handleFileChange = (event) => {
		setImage(event.target.files[0]);
	};
	return (
		<div>
			<label htmlFor='profile'>Upload Profile </label>
			<input
				type='file'
				name='profileUrl'
				id='profileUrl'
				onChange={handleFileChange}
			/>
			<button onClick={uploadImage}>
				{loading ? 'Uploading...' : 'Upload'}
			</button>
		</div>
	);
}
