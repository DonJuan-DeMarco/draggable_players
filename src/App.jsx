import './App.css';
import { useState } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';

function App() {
	const [assets, setAssets] = useState([]);
	const [inputValue, setInputValue] = useState('');

	const handleAddAsset = (type, src) => {
		const newAsset = {
			id: Date.now(),
			type,
			src,
			x: 0,
			y: 0,
			width: '100%',
			height: '100%',
		};
		setAssets([...assets, newAsset]);
	};

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleLogAssets = () => {
		assets.forEach((asset) => {
			console.log(`Asset ${asset.id}:`);
			console.log(`Type: ${asset.type}`);
			console.log(`Position (x, y): (${asset.x}%, ${asset.y}%)`);
			console.log(
				`Size (width, height): (${asset.width}, ${asset.height})`
			);
		});
	};

	return (
		<div className='App'>
			<div className='controls'>
				<input
					type='text'
					placeholder='Enter image or video URL'
					value={inputValue}
					onChange={handleInputChange}
				/>
				<button
					onClick={() => {
						handleAddAsset('image', inputValue);
						setInputValue('');
					}}
				>
					Add Image
				</button>
				<button
					onClick={() => {
						handleAddAsset('video', inputValue);
						setInputValue('');
					}}
				>
					Add Video
				</button>
				<button onClick={handleLogAssets}>Log Assets</button>
			</div>
			<div className='canvas'>
				{assets.map((asset) => {
					return (
						<Draggable
							key={asset.id}
							bounds='parent'
							width='fit-content'
							style={{ width: '130%' }}
							position={{ x: asset.x, y: asset.y }}
							onStop={(e, data) => {
								const updatedAssets = assets.map((a) => {
									if (a.id === asset.id) {
										return { ...a, x: data.x, y: data.y };
									}
									return a;
								});
								setAssets(updatedAssets);
							}}
						>
							<Resizable
								width={asset.width}
								height={asset.height}
								className='ASD'
								onResizeStop={(e, direction, ref, d) => {
									const updatedAssets = assets.map((a) => {
										if (a.id === asset.id) {
											return {
												...a,
												width: ref.style.width,
												height: ref.style.height,
											};
										}
										return a;
									});
									setAssets(updatedAssets);
								}}
							>
								{asset.type === 'image' ? (
									<img
										src={asset.src}
										alt={`Asset ${asset.id}`}
									/>
								) : (
									<video
										src={asset.src}
										controls
										style={{ height: '100%' }}
									/>
								)}
							</Resizable>
						</Draggable>
					);
				})}
			</div>
		</div>
	);
}

export default App;
