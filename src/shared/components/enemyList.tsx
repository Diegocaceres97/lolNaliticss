import { useTranslation } from 'react-i18next';
import SelectChamps from './selects/selectChamps';

function EnemyList() {
	const { t } = useTranslation();
	return (
		<div style={{ marginTop: '15px' }}>
			<label style={{ fontSize: '21.5px', color: 'var(--color-title)' }}>
				⚔️ {t('enemySelection')}:{' '}
			</label>
			<SelectChamps isSelectionEnemy={true} />
		</div>
	);
}

export default EnemyList;
