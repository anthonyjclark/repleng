export type TokenTag
	= 'indent'
	| 'dedent'
	| 'newline'
	| 'number'
	| 'identifier'
	| 'operator';

export interface Token {
	start: number;
	end: number;
	tag: TokenTag;
}

export class Lexer {

	private input: string;
	private position: number;
	private tokens: Token[];
	private indentStack: number[];
	private atLineStart: boolean;

	constructor( input: string ) {

		this.input = input;
		this.position = 0;
		this.tokens = [] as Token[];
		this.indentStack = [ 0 ];
		this.atLineStart = true;

	}

	public tokenize(): Token[] {

		while ( this.position < this.input.length ) {

			this.scanToken();

		}

		// Emit remaining dedents at end of file
		while ( this.indentStack.length > 1 ) {

			this.indentStack.pop();
			this.addToken( this.position, this.position, 'dedent' );

		}

		return this.tokens;

	}

	private scanToken(): void {

		const start = this.position;
		const char = this.peek();

		if ( ! char ) {

			return;

		}

		// Handle indentation at line start
		if ( this.atLineStart ) {

			this.handleIndentation();
			this.atLineStart = false;
			return;

		}

		// Newline
		if ( char === '\n' ) {

			this.advance();
			this.addToken( start, this.position, 'newline' );
			this.atLineStart = true;
			return;

		}

		// Other whitespace (ignore)
		if ( /\s/.test( char ) ) {

			this.advance();
			return;

		}

		// Numbers
		if ( /\d/.test( char ) ) {

			this.scanNumber( start );
			return;

		}

		// Identifiers (letters, underscores)
		if ( /[a-zA-Z_]/.test( char ) ) {

			this.scanIdentifier( start );
			return;

		}

		// Operators and punctuation
		this.scanOperator( start );

	}

	private handleIndentation(): void {

		const start = this.position;

		// Count tabs
		let tabCount = 0;

		while ( this.peek() === '\t' ) {

			tabCount ++;
			this.advance();

		}

		// Check if this is a blank line (only whitespace until newline or EOF)
		const isBlankLine = this.peek() === '\n' || this.peek() === '';

		if ( isBlankLine ) {

			// Ignore blank lines for indentation purposes
			return;

		}

		const currentIndent = this.indentStack[this.indentStack.length - 1] ?? 0;

		if ( tabCount > currentIndent ) {

			// Indent
			this.indentStack.push( tabCount );
			this.addToken( start, this.position, 'indent' );

		} else if ( tabCount < currentIndent ) {

			// Dedent (possibly multiple levels)
			while ( this.indentStack.length > 1 && ( this.indentStack[this.indentStack.length - 1] ?? 0 ) > tabCount ) {

				this.indentStack.pop();
				this.addToken( start, start, 'dedent' );

			}

		}

	}

	private scanNumber( start: number ): void {

		while ( this.position < this.input.length && /\d/.test( this.peek() ) ) {

			this.advance();

		}

		// Handle decimal points
		if ( this.peek() === '.' && /\d/.test( this.peekNext() ) ) {

			this.advance(); // consume '.'

			while ( this.position < this.input.length && /\d/.test( this.peek() ) ) {

				this.advance();

			}

		}

		this.addToken( start, this.position, 'number' );

	}

	private scanIdentifier( start: number ): void {

		while ( this.position < this.input.length && /[a-zA-Z0-9_]/.test( this.peek() ) ) {

			this.advance();

		}

		this.addToken( start, this.position, 'identifier' );

	}

	private scanOperator( start: number ): void {

		this.advance();
		this.addToken( start, this.position, 'operator' );

	}

	private peek(): string {

		return this.input[this.position] ?? '';

	}

	private peekNext(): string {

		return this.input[this.position + 1] ?? '';

	}

	private advance(): void {

		this.position ++;

	}

	private addToken( start: number, end: number, tag: TokenTag ): void {

		this.tokens.push( { start, end, tag } );

	}

}
