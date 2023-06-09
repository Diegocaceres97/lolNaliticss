import { Configuration, OpenAIApi } from 'openai';
import { ChampsLOL } from '../interfaces/champs.interface';
import { searchItem } from '../api_Lol/searchItems';

const configuration = new Configuration({
	apiKey: import.meta.env.VITE_REACT_API_URL,
});
const openai = new OpenAIApi(configuration);

export async function apiProof({ champPrincipal, champEnemies }: ChampsLOL) {
	const prompt = promptEngine(champPrincipal, champEnemies);

	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt,
		temperature: 0.6,
		max_tokens: 100,
		top_p: 1,
		frequency_penalty: 0.0,
		presence_penalty: 0.0,
		stop: ['\n'],
	});

	return await formatResponse(response);
}

function promptEngine(champPrincipal: string[], champEnemies?: string[]) {
	const lastPrincipal = champPrincipal.length - 1;

	const principal: string = champPrincipal[lastPrincipal];
	const enemies: string = champEnemies?.join(', ');
	let response = '';

	if (champEnemies && champEnemies.length > 0) {
		response = `Hi, you are an expert in league of legends and you picked ${principal} as your champion, your opponents are: ${enemies}. Please provide your answers in a single string and indicate each answer with Runes (for the first answer) and Elements (for the second answer), split each one inside the answer with | ,
		example of string format for answer: runes:, rune1, rune2... | elements:, element1, element2 Attention: I need runes and elements without exception.
		\n\nQ: (I pick Amumu as the champ and my enemies are: Aatrox, Anivia, Blitzcrank, Elise, Hecarim)first question: What runes (secondary and principal runes completely) do you recommend for this game?, second question:What items do you recommend?\nA: Runes:, Domination: Electrocute, Taste of Blood | Elements:, Sunfire Cape, Liandry's Torment, Mercury's Treads, Abyssal Mask, Guardian Angel
		\n\nQ: first question: What runes (secondary and principal runes completely) do you recommend for this game?, second question:What items do you recommend?\nA:`;
	} else {
		response = `Hi, you are an expert in league of legends and you picked ${principal} as your champion. Please provide your answers in a single string and indicate each answer with Runes (for the first answer) and Elements (for the second answer), split each one inside the answer with | ,  
		example of string format for answer: runes:, rune1, rune2... | elements:, element1, element2 Attention: I need runes and elements without exception.
		\n\nQ: (I pick Amumu as the champ)first question: What runes (secondary and principal runes completely) do you recommend for this game?, second question:What items do you recommend?\nA: Runes:, Domination: Electrocute, Taste of Blood | Elements:, Sunfire Cape, Liandry's Torment, Mercury's Treads, Abyssal Mask, Guardian Angel
		\n\nQ: first question: What runes (secondary and principal runes completely) do you recommend for this game?, second question:What items do you recommend?\nA:`;
	}
	return response;
}

async function formatResponse(response) {
	let answers = '';
	let answerSeparately = [];

	while (answerSeparately.length < 2) {
		answers = response?.data?.choices[0]?.text;
		answerSeparately = answers.split('|');
	}

	const items = answerSeparately[1].split(',');
	const itemsLol = await searchItem(items);


	return `
	<h3>⚡️ ${answerSeparately[0]}</h3>
	<h3>💥 Items: </h3>
	<ul>
	<li>
	<img src="http://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${itemsLol[0]}" alt=${items[1]} />
	<p>${items[1]}</p>
	</li>
	<li>
	<img src="http://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${itemsLol[1]}" alt=${items[2]} />
	<p>${items[2]}</p>
	</li>
	<li>
	<img src="http://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${itemsLol[2]}" alt=${items[3]} />
	<p>${items[3]}</p>
	</li>
	<li>
	<img src="http://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${itemsLol[3]}" alt=${items[4]}/>
	<p>${items[4]}</p>
	</li>
	<li>
	<img src="http://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${itemsLol[4]}" alt=${items[5]}/>
	<p>${items[5]}</p>
	</li>
	</ul>
	`;
}
