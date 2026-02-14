import { describe, expect, it } from 'vitest';

import { Lexer, type Token } from './lexer';

describe( 'Lexer', () => {

	describe( 'Basic tokens', () => {

		it( 'should tokenize a single identifier', () => {

			const lexer = new Lexer( 'hello' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 5, tag: 'identifier' },
			] );

		} );

		it( 'should tokenize a single number', () => {

			const lexer = new Lexer( '42' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 2, tag: 'number' },
			] );

		} );

		it( 'should tokenize a decimal number', () => {

			const lexer = new Lexer( '3.14' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 4, tag: 'number' },
			] );

		} );

		it( 'should tokenize operators', () => {

			const lexer = new Lexer( '+-*/=' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 1, tag: 'operator' },
				{ start: 1, end: 2, tag: 'operator' },
				{ start: 2, end: 3, tag: 'operator' },
				{ start: 3, end: 4, tag: 'operator' },
				{ start: 4, end: 5, tag: 'operator' },
			] );

		} );

		it( 'should tokenize mixed identifiers, numbers, and operators', () => {

			const lexer = new Lexer( 'x=42' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 1, tag: 'identifier' },
				{ start: 1, end: 2, tag: 'operator' },
				{ start: 2, end: 4, tag: 'number' },
			] );

		} );

	} );

	describe( 'Whitespace handling', () => {

		it( 'should ignore spaces between tokens', () => {

			const lexer = new Lexer( 'x = 42' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 1, tag: 'identifier' },
				{ start: 2, end: 3, tag: 'operator' },
				{ start: 4, end: 6, tag: 'number' },
			] );

		} );

		it( 'should tokenize newlines', () => {

			const lexer = new Lexer( 'x\ny' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 1, tag: 'identifier' },
				{ start: 1, end: 2, tag: 'newline' },
				{ start: 2, end: 3, tag: 'identifier' },
			] );

		} );

		it( 'should ignore blank lines', () => {

			const lexer = new Lexer( 'x\n\n\ny' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 1, tag: 'identifier' },
				{ start: 1, end: 2, tag: 'newline' },
				{ start: 2, end: 3, tag: 'newline' },
				{ start: 3, end: 4, tag: 'newline' },
				{ start: 4, end: 5, tag: 'identifier' },
			] );

		} );

	} );

	describe( 'Indentation', () => {

		it( 'should tokenize single indent', () => {

			const lexer = new Lexer( 'x\n\ty' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 1, tag: 'identifier' },
				{ start: 1, end: 2, tag: 'newline' },
				{ start: 2, end: 3, tag: 'indent' },
				{ start: 3, end: 4, tag: 'identifier' },
				{ start: 4, end: 4, tag: 'dedent' },
			] );

		} );

		it( 'should tokenize multiple indents', () => {

			const lexer = new Lexer( 'x\n\ty\n\t\tz' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 1, tag: 'identifier' },
				{ start: 1, end: 2, tag: 'newline' },
				{ start: 2, end: 3, tag: 'indent' },
				{ start: 3, end: 4, tag: 'identifier' },
				{ start: 4, end: 5, tag: 'newline' },
				{ start: 5, end: 7, tag: 'indent' },
				{ start: 7, end: 8, tag: 'identifier' },
				{ start: 8, end: 8, tag: 'dedent' },
				{ start: 8, end: 8, tag: 'dedent' },
			] );

		} );

		it( 'should tokenize single dedent', () => {

			const lexer = new Lexer( 'x\n\ty\nz' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 1, tag: 'identifier' },
				{ start: 1, end: 2, tag: 'newline' },
				{ start: 2, end: 3, tag: 'indent' },
				{ start: 3, end: 4, tag: 'identifier' },
				{ start: 4, end: 5, tag: 'newline' },
				{ start: 5, end: 5, tag: 'dedent' },
				{ start: 5, end: 6, tag: 'identifier' },
			] );

		} );

		it( 'should tokenize multiple dedents', () => {

			const lexer = new Lexer( 'x\n\ty\n\t\tz\na' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 1, tag: 'identifier' },
				{ start: 1, end: 2, tag: 'newline' },
				{ start: 2, end: 3, tag: 'indent' },
				{ start: 3, end: 4, tag: 'identifier' },
				{ start: 4, end: 5, tag: 'newline' },
				{ start: 5, end: 7, tag: 'indent' },
				{ start: 7, end: 8, tag: 'identifier' },
				{ start: 8, end: 9, tag: 'newline' },
				{ start: 9, end: 9, tag: 'dedent' },
				{ start: 9, end: 9, tag: 'dedent' },
				{ start: 9, end: 10, tag: 'identifier' },
			] );

		} );

		it( 'should ignore tabs on blank lines', () => {

			const lexer = new Lexer( 'x\n\t\ny' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 1, tag: 'identifier' },
				{ start: 1, end: 2, tag: 'newline' },
				{ start: 3, end: 4, tag: 'newline' },
				{ start: 4, end: 5, tag: 'identifier' },
			] );

		} );

		it( 'should emit dedents at end of file', () => {

			const lexer = new Lexer( 'x\n\ty\n\t\tz' );
			const tokens = lexer.tokenize();

			const dedentCount = tokens.filter( ( t: Token ) => t.tag === 'dedent' ).length;
			expect( dedentCount ).toBe( 2 );

		} );

	} );

	describe( 'Complex expressions', () => {

		it( 'should tokenize a simple assignment', () => {

			const lexer = new Lexer( 'let x = 42' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 3, tag: 'identifier' },
				{ start: 4, end: 5, tag: 'identifier' },
				{ start: 6, end: 7, tag: 'operator' },
				{ start: 8, end: 10, tag: 'number' },
			] );

		} );

		it( 'should tokenize arithmetic expression', () => {

			const lexer = new Lexer( 'result = 10 + 20 * 3.5' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 6, tag: 'identifier' },
				{ start: 7, end: 8, tag: 'operator' },
				{ start: 9, end: 11, tag: 'number' },
				{ start: 12, end: 13, tag: 'operator' },
				{ start: 14, end: 16, tag: 'number' },
				{ start: 17, end: 18, tag: 'operator' },
				{ start: 19, end: 22, tag: 'number' },
			] );

		} );

		it( 'should tokenize indented block', () => {

			const lexer = new Lexer( 'if x\n\ty = 1\n\tz = 2\nend' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 2, tag: 'identifier' },
				{ start: 3, end: 4, tag: 'identifier' },
				{ start: 4, end: 5, tag: 'newline' },
				{ start: 5, end: 6, tag: 'indent' },
				{ start: 6, end: 7, tag: 'identifier' },
				{ start: 8, end: 9, tag: 'operator' },
				{ start: 10, end: 11, tag: 'number' },
				{ start: 11, end: 12, tag: 'newline' },
				{ start: 13, end: 14, tag: 'identifier' },
				{ start: 15, end: 16, tag: 'operator' },
				{ start: 17, end: 18, tag: 'number' },
				{ start: 18, end: 19, tag: 'newline' },
				{ start: 19, end: 19, tag: 'dedent' },
				{ start: 19, end: 22, tag: 'identifier' },
			] );

		} );

	} );

	describe( 'Edge cases', () => {

		it( 'should handle empty string', () => {

			const lexer = new Lexer( '' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [] );

		} );

		it( 'should handle only whitespace', () => {

			const lexer = new Lexer( '   ' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [] );

		} );

		it( 'should handle only newlines', () => {

			const lexer = new Lexer( '\n\n\n' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 1, tag: 'newline' },
				{ start: 1, end: 2, tag: 'newline' },
				{ start: 2, end: 3, tag: 'newline' },
			] );

		} );

		it( 'should handle identifier with underscores', () => {

			const lexer = new Lexer( '_var_name_123' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 13, tag: 'identifier' },
			] );

		} );

		it( 'should not treat dot as decimal without following digit', () => {

			const lexer = new Lexer( '42.' );
			const tokens = lexer.tokenize();

			expect( tokens ).toEqual( [
				{ start: 0, end: 2, tag: 'number' },
				{ start: 2, end: 3, tag: 'operator' },
			] );

		} );

	} );

} );
