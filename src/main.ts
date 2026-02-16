import './style.css';

import { Lexer } from '../lib/lexer';
import { debounce } from '../lib/utilities';
import { editor } from './editor';

function editorUpdate( code: string ) {

	const lexer = new Lexer( code );
	const tokens = lexer.tokenize();
	console.log( tokens );

}

editor.options.onUpdate = debounce( editorUpdate, 1000 );
