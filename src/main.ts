import 'prism-code-editor/copy-button.css';
import 'prism-code-editor/guides.css';
import 'prism-code-editor/languages/clike';
import 'prism-code-editor/languages/css';
import 'prism-code-editor/languages/html';
import 'prism-code-editor/layout.css';
import 'prism-code-editor/prism/languages/clike';
import 'prism-code-editor/search.css';
import 'prism-code-editor/themes/github-dark.css';
import './style.css';

import { createEditor } from 'prism-code-editor';
import { defaultCommands, editHistory } from 'prism-code-editor/commands';
import { copyButton } from 'prism-code-editor/copy-button';
import { cursorPosition } from 'prism-code-editor/cursor';
import { indentGuides } from 'prism-code-editor/guides';
import { highlightBracketPairs } from 'prism-code-editor/highlight-brackets';
import { matchBrackets } from 'prism-code-editor/match-brackets';
import { matchTags } from 'prism-code-editor/match-tags';
import { highlightSelectionMatches, searchWidget, showInvisibles } from 'prism-code-editor/search';

import { Lexer } from '../lib/lexer';
import { debounce } from '../lib/utilities';

function editorUpdate( code: string ) {

	const lexer = new Lexer( code );
	const tokens = lexer.tokenize();
	console.log( tokens );

}

const editorConfig = {
	// https://github.com/jonpyt/prism-code-editor/blob/main/package/src/themes/index.ts
	theme: 'prism',
	language: 'clike',
	tabSize: 2,
	insertSpaces: false,
	lineNumbers: true,
	readOnly: false,
	wordWrap: false,
	value: 'x = 1',
	onUpdate: debounce( editorUpdate, 1000 ),
	// onSelectionChange: Function called when the editor’s selection changes.
	// onTokenize: Function called before the tokens are stringified to HTML.
};

export const editor = createEditor( '#editor', editorConfig );

editor.addExtensions(
	copyButton(),
	cursorPosition(),
	defaultCommands(),
	editHistory(),
	highlightBracketPairs(),
	highlightSelectionMatches(),
	indentGuides(),
	matchBrackets(),
	matchTags(),
	searchWidget(),
	showInvisibles(),
);

// Handle Shift+Enter without removing the default enter functionality
const defaultEnterHandler = editor.keyCommandMap['Enter'];
console.log( defaultEnterHandler );

editor.keyCommandMap['Enter'] = ( e, selection, value ) => {

	if ( e.shiftKey ) {

		console.log( 'Shift+Enter pressed' );
		return true;

	}

	return defaultEnterHandler?.( e, selection, value );

};
