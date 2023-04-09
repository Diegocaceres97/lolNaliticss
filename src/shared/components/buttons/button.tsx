import React, { useContext } from 'react'
import { Contexto } from '../../contexts/contextChamps';
import { apiProof } from '../../../models/openAI/chatGPT';

function ButtonCustom() {

    const { data } = useContext(Contexto);

	const openAI = async () => {
		console.log(((await apiProof(data)).data?.choices[0]?.text));
	}

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
  )
}

export default ButtonCustom