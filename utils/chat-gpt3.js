import { OPENAI_API_KEY } from '@env';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY
});

export const openai = new OpenAIApi(configuration);