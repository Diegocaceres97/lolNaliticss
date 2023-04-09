import { Configuration, OpenAIApi } from 'openai';
import { ChampsLOL } from '../interfaces/champs.interface';

const configuration = new Configuration({
	apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export async function apiProof({ champPrincipal, champEnemies }: ChampsLOL) {
	const prompt = promptEngine(champPrincipal, champEnemies);

	//  console.log(import.meta.env.BASE_URL)
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

	return formatResponse(response);;
}

function promptEngine(champPrincipal: string[], champEnemies?: string[]) {
	const lastPrincipal = champPrincipal.length - 1;

	const principal: string = champPrincipal[lastPrincipal];
	const enemies: string = champEnemies?.join(', ');

	if (champEnemies && champEnemies.length > 0) {
		return `Hi, you are an expert in league of legends and you picked ${principal} as your champion, your opponents are: ${enemies}. Please provide your answers in a single string and indicate each answer with runes (for the first answer) and elements (for the second answer), split each one inside the answer with | ,
		example of string format for answer: runes: rune1, rune2... | elements: element1, element2... I need runes and elements without exception.\n\nQ: What runes (secondary and principal runes completely) do you recommend for this game? .\n\nQ:What items do you recommend I buy to face these champions?\nA:`;
	} else {
		return `Hi, you are an expert in league of legends and you picked ${principal} as your champion. Please provide your answers in a single string and indicate each answer with runes (for the first answer) and elements (for the second answer), split each one inside the answer with | ,  
		example of string format for answer: runes: rune1, rune2... | elements: element1, element2..., I need runes and elements without exception .\n\nQ: What runes (secondary and principal runes completely) do you recommend for this game? .\n\nQ:What items do you recommend?\nA:`;
	}
}

function formatResponse(response) {
	let answers = '';
	let answerSeparately = [];

	while (answerSeparately.length < 2) {
		answers = response?.data?.choices[0]?.text;
		answerSeparately = answers.split('|');
	}

	return `
	<h3>⚡️ ${answerSeparately[0]}</h3>
	<h3>🏪 ${answerSeparately[1]}</h3>
	`
}
