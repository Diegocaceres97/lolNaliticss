import React, { useContext } from 'react';
import { Contexto } from '../../contexts/contextChamps';
import { apiProof } from '../../../models/openAI/chatGPT';
import { fireMessage, fireSpinner } from '../alerts/alert';

function ButtonCustom({text}:any) {
	const { data } = useContext(Contexto);
	let answers = '';
	const openAI = async () => {
		fireSpinner(true);
		try {
			answers = await apiProof(data);
		} catch (error) {
			console.error(error);
			fireMessage({
				text: "something is wrong, but it's not your fault, sorry!!",
				title: 'Error!🫤',
				confirmButtonText: 'Okay',
			});
		} finally {
			fireSpinner(false);

			if (answers) {
				fireMessage({
					html: answers,
					title: 'Good luck!🍀',
					confirmButtonText: 'Ready! 🤘🏻',
				});
			}
		}
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
			disabled={
				data.champPrincipal.length < 1 || 
				data.champPrincipal[data.champPrincipal.length - 1] === '0'
			}
			onClick={openAI}
		>
			{text}
			
		</button>
	);
}

export default ButtonCustom;
