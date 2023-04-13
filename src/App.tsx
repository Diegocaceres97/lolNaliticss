import './App.css';
import { useEffect, useState } from 'react';

import EnemyList from './shared/components/enemyList';
import SelectChamps from './shared/components/selects/selectChamps';
import { DatosProvider } from './shared/contexts/contextChamps';
import ButtonCustom from './shared/components/buttons/button';
import { useTranslation } from 'react-i18next';

function App() {
	const [information, setMoreInformation] = useState(false);
	const [idiom, setIdiom] = useState(localStorage.getItem('lng') || 'en');
	const { t, i18n } = useTranslation();

	useEffect(() => {
		i18n.changeLanguage(idiom);
		localStorage.setItem('lng',idiom);
	},[idiom]);

	const popUp = () => {
		setMoreInformation(!information);
	};

	function changeLan() {
		if (idiom === 'en') {
			setIdiom('es');
		} else {
			setIdiom('en');
		}
	}

	return (
		<DatosProvider>
			<div className='App'>
				<button
					style={{
						position: 'absolute',
						top: '20px',
						height: '1.5rem',
						width: '2rem',
						margin: '0 auto',
						fontSize: '10px',
						padding: '1px',
						borderColor: 'var(--color-title)'
					}}
					onClick={()=> changeLan()}
				>
					{idiom === 'en' ? 'ES🇪🇸' : 'EN🇺🇸'}
				</button>

				<h1 className='colorLetter'> {t('titlePrincipal')} </h1>
				<SelectChamps isSelectionEnemy={false} />
				<h3
					className='colorLetter colorLetter--link'
					style={{ cursor: 'pointer', marginTop: '20px' }}
					onClick={popUp}
				>
					{t('moreInformation')}
				</h3>
				<small style={{ color: 'white', fontSize: '15px' }}>
					🚀 {t('parragraphIAPublicity')} 🏆
				</small>
				{information ? <EnemyList /> : <></>}
				<ButtonCustom text={t('buttonAction')} />
			</div>
		</DatosProvider>
	);
}

export default App;
