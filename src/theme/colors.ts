export type ColorType = {
	[K in keyof typeof colors]: true;
};

export const colors = {
	'black-50': '#262a41',
	'black-100': '#1D1E24',
	'black-300': 'rgba(10, 10, 10, 0.5)',
	'black-500': '#101010',

	'gray-100': '#f5f5fa',
	'gray-200': '#F0F0F0',
	'gray-300': '#EBEBF0',
	'gray-700': '#888888',
	'gray-900': 'rgba(29, 30, 36, 0.5)',

	'purple-50': '#4339f2',
};
