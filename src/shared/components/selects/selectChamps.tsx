import { useContext, useEffect, useState } from 'react';
import { BsArrowRepeat } from 'react-icons/bs';
import { fireMessage } from '../alerts/alert';
import { apiProof } from '../../../models/openAI/chatGPT';
import champsLOL from '../../../models/champs.json';
import { ChampsLOL } from '../../../models/interfaces/champs.interface';
import { Contexto } from '../../contexts/contextChamps';

const SelectChamps = ({ isSelectionEnemy }: any) => {
	const minimumChampsEnemies = 5;
	const { data, setData } = useContext(Contexto);

	const champs = champsLOL;
	const [actualChamps, setActualChamps] = useState<string[]>([]);
	const [enemyChamps, setEnemyChamps] = useState<string[]>([]);

	async function champSelect(event: any) {
		const value = event.target.value;
		//console.warn((await apiProof()).data?.choices[0]?.text)

		if (value === champs[0].name) {
			fireMessage({
				title: 'Error!',
				text: 'Please, choose another option',
				icon: 'error',
			});
			return;
		}

		if (enemyChamps.length > 0 && enemyChamps.includes(value)) {
			fireMessage({
				title: 'Error!',
				text: 'Same champion? 🤨',
				icon: 'error',
			});
			return;
		}
		console.warn('enemy is ', isSelectionEnemy);
		if (isSelectionEnemy) {
			if (enemyChamps && enemyChamps.length < minimumChampsEnemies) {
				setEnemyChamps(prevChamp => [...prevChamp, value]);
			} else {
				fireMessage({
					title: 'Error!',
					text: 'You can not choose more enemies',
					icon: 'error',
				});
				return;
			}
		} else {
			setActualChamps(prevChamp => [...prevChamp, value]);
		}

		/* Data para enviar por el context */
		/* champsLOlFull = {
			champPrincipal:actualChamps,
			champEnemies: enemyChamps ?? []
		} */
	}

	useEffect(() => {
		setData({
			champPrincipal: actualChamps,
			champEnemies: enemyChamps,
		});
	}, [actualChamps, enemyChamps]);

	const handelResetEnemiesChamps = () => {
		setEnemyChamps([]);
	};

	return (
		<>
			<select
				style={{
					width: '39.5%',
					height: '5vh',
					fontSize: '20px',
					cursor: 'pointer',
				}}
				onChange={champSelect}
			>
				{champs.map(champ => (
					<option key={champ.id} value={champ.name}>
						{champ.name}
					</option>
				))}
			</select>
			{isSelectionEnemy && (
				<button
					style={{ marginLeft: 7, height: 36, lineHeight: '0px' }}
					onClick={handelResetEnemiesChamps}
				>
					<BsArrowRepeat /> Reset
				</button>
			)}
			<div>
				{isSelectionEnemy ? (
					<p style={{ color: 'white' }}>
						Enemys selected:{' '}
						{enemyChamps.length > 0 ? (
							enemyChamps.map((name, index) => <b key={index}>{name}, </b>)
						) : (
							<span> 0? 🧐 </span>
						)}
					</p>
				) : null}
			</div>
		</>
	);
};

export default SelectChamps;
