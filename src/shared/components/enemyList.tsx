import SelectChamps from './selects/selectChamps';

function EnemyList() {
	return (
		<div style={{ marginTop: '15px' }}>
			<label style={{ fontSize: '21.5px', color: 'var(--color-title)' }}>
				⚔️ Enemy:{' '}
			</label>
			<SelectChamps isSelectionEnemy={true} />
		</div>
	);
}

export default EnemyList;
