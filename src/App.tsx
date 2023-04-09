import './App.css';
import { useContext, useState } from 'react';

import EnemyList from './shared/components/enemyList';
import SelectChamps from './shared/components/selects/selectChamps';
import { Contexto, DatosProvider } from './shared/contexts/contextChamps';
//import { proof } from './models/openAI/chatGPT';
/// <reference path="../vite-env.d.ts" />

function App() {
	const [information, setMoreInformation] = useState(false);
	const {data, setData} = useContext(Contexto);

	const popUp = () => {
		setMoreInformation(!information);
		//console.log(import.meta.env.PRUEBA);
	};

	const openAI = () => {
		if (data) {
			console.log(data);
		  }
	}

	return (
		<DatosProvider>
		<div className='App'>
			<h1 className='colorLetter'>Please select you champ: </h1>
			<SelectChamps isSelectionEnemy={false} />
			<h3
				className='colorLetter colorLetter--link'
				style={{ cursor: 'pointer', marginTop: '20px' }}
				onClick={popUp}
			>
				Do you want to give more information?
			</h3>
			<small style={{ color: 'white', fontSize: '15px' }}>
				🚀 This is the first page with AI than will to improve your skills in
				LOL🏆
			</small>
			{information ? <EnemyList /> : <></>}
			<button
				style={{
					display: 'block',
					borderColor: 'white',
					marginRight: 'auto',
					marginLeft: 'auto',
					marginTop: '15px',
				}}
				onClick={openAI}
			>
				{' '}
				🔮 AI show me the way!
			</button>
		</div>
		</DatosProvider>
	);
}

export default App;
