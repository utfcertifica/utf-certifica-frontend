import { messages as englishMessages } from './en';
import { messages as spanishMessages } from './es';
import { messages as portugueseMessages } from './pt';

const messages = {
	...portugueseMessages,
	...englishMessages,
	...spanishMessages,
};

export { messages };
