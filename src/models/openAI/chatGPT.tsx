import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: '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',
  });
  const openai = new OpenAIApi(configuration);
 

  export async function apiProof(champPrincipal: string, champEnemies?: string) {

    const prompt = promptEngine(champPrincipal, champEnemies);

  //  console.log(import.meta.env.BASE_URL)
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.6,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["\n"],
  });

  return response;
  }

  function promptEngine(champPrincipal: string, champEnemies?: string) {
    if(champEnemies && champEnemies.length > 0){
      return `Hi, you are an expert in league of legends and you picked ${champPrincipal} as your champion, your opponents are: ${champEnemies}. Please provide your answers in a single array and indicate each answer with runes (for the first answer) and elements (for the second answer).\n\nQ: What runes (secondary and principal runes completely) do you recommend for this game? .\n\nQ:What items do you recommend I buy to face these champions?\nA:`;
    } else {
      return `Hi, you are an expert in league of legends and you picked ${champPrincipal} as your champion. Please provide your answers in a single array and indicate each answer with runes (for the first answer) and elements (for the second answer).\n\nQ: What runes (secondary and principal runes completely) do you recommend for this game? .\n\nQ:What items do you recommend?\nA:`;
    }
  }