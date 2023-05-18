import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	ButtonCustom,
	EnemyList,
	Footer,
	SelectChamps,
} from '../shared/components';
import { Contexto } from '../shared/contexts/contextChamps';

function Index() {
	const [information, setMoreInformation] = useState(false);
	const [idiom, setIdiom] = useState(localStorage.getItem('lng') || 'en');
	const { t, i18n } = useTranslation();
	const { data } = useContext(Contexto);

	const { champPrincipal } = data;
	const lastChampPrincipal = champPrincipal?.length-1;

	useEffect(() => {
		console.warn(champPrincipal[lastChampPrincipal])
		i18n.changeLanguage(idiom);
		localStorage.setItem('lng', idiom);
	}, [idiom]);

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
		<div>
			<div className='App'>
				<button
					style={{
						position: 'absolute',
						top: '20px',
						left: '0',
						right: '0',
						height: '1.5rem',
						width: '2rem',
						margin: 'auto',
						fontSize: '10px',
						padding: '1px',
						borderColor: 'var(--color-title)',
					}}
					onClick={() => changeLan()}
				>
					{idiom === 'en' ? 'ES🇪🇸' : 'EN🇺🇸'}
				</button>

				<h1 className='colorLetter'> {t('titlePrincipal')} </h1>
				{
                    champPrincipal.length>0  && champPrincipal[lastChampPrincipal] != 0? 
                    <img
					src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champPrincipal[lastChampPrincipal]}_0.jpg`}
					style={{
                        display: 'block',
                        margin: '20px auto',
                        borderRadius: '50%'
                    }}
                    width='100px'
                    height='100px'
					alt='champion'
				/> :  <img
				src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Annie_0.jpg`}
				style={{
					display: 'block',
					margin: '20px auto',
					borderRadius: '50%'
				}}
				width='100px'
				height='100px'
				alt='champion'
			/>
                }
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
			<Footer />
		</div>
	);
}

export default Index;
