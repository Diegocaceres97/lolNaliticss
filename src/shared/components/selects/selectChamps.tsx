import { useState } from 'react';
import { BsArrowRepeat } from 'react-icons/bs';
import { fireMessage } from '../alerts/alert';
import champsLOL from '../../../models/champs.json';

const SelectChamps = ({ isSelectionEnemy }: any) => {
	const minimumChampsEnemies = 5;
	const champs = champsLOL;
	const [actualChamps, setActualChamps] = useState<string[]>([]);
	const [enemyChamps, setEnemyChamps] = useState<string[]>([]);

	function champSelect(event: any) {
		const value = event.target.value;

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

		if (isSelectionEnemy) {
			if (enemyChamps.length < minimumChampsEnemies) {
				setEnemyChamps(prevChamps => [...prevChamps, value]);
			} else {
				fireMessage({
					title: 'Error!',
					text: 'You can not choose more enemies',
					icon: 'error',
				});
				return;
			}
		} else {
			setActualChamps(prevChamps => [...prevChamps, value]);
		}
	}

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
