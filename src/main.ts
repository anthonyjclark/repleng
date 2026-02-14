// Importing Prism grammars
import 'prism-code-editor/prism/languages/markup';

import { basicEditor } from 'prism-code-editor/setups';

const editor = basicEditor(
	'#editor',
	{
		language: 'html',
		theme: 'github-dark',
	},
	() => {

		console.log( 'mounted' );

	},
);

// import './style.css'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
