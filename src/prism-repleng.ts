import { languageMap } from 'prism-code-editor';
import { languages } from 'prism-code-editor/prism';

languages['repleng'] = {
	'comment': /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/g,
};

languageMap['repleng'] = {
	comments: {
		line: '//',
		block: [ '/*', '*/' ],
	},
	autoIndent: [
		// TODO: Whether to indent
		( [ start ], value ) => /[([{][^\n)\]}]*$/.test( value.slice( 0, start ) ),
		// TODO: Whether to add an extra line
		( [ start, end ], value ) => /\[]|\(\)|{}/.test( ( value[start - 1] ?? '' ) + ( value[end] ?? '' ) ),
	],
};
