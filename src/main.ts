import './style.css';
import 'prism-code-editor/prism/languages/clike';

import { basicEditor } from 'prism-code-editor/setups';

import { debounce } from '../lib/utilities';

function editorUpdate( code: string ) {

	console.log( 'Editor updated:', code );

}

function editorLoaded() {

	console.log( 'Editor loaded' );

}

const editorConfig = {
	theme: 'github-dark',
	language: 'clike',
	tabSize: 2,
	insertSpaces: false,
	lineNumbers: true,
	readOnly: false,
	wordWrap: false,
	value: 'x = 1',
	onUpdate: debounce( editorUpdate, 300 ),
	// onSelectionChange: Function called when the editor’s selection changes.
	// onTokenize: Function called before the tokens are stringified to HTML.
};

// const editor =
basicEditor( '#editor', editorConfig, editorLoaded );
