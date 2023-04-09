import React, { useContext } from 'react';
import { Contexto } from '../../contexts/contextChamps';
import { apiProof } from '../../../models/openAI/chatGPT';
import { fireMessage } from '../alerts/alert';

function ButtonCustom() {
	const { data } = useContext(Contexto);

	const openAI = async () => {
		let answers = (await apiProof(data));

		fireMessage({ html:answers , title: 'Good luck!🍀', confirmButtonText: 'Ready! 🤘🏻' });
	};

	return (
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
	);
}

export default ButtonCustom;
