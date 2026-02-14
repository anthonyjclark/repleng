export function debounce( f: ( code: string ) => void, delay: number ): ( code: string ) => void {

	let timer: ReturnType<typeof setTimeout> | undefined;

	return ( code: string ) => {

		if ( timer !== undefined ) {

			clearTimeout( timer );

		}

		timer = setTimeout( () => {

			f( code );

		}, delay );

	};

}

// export function debounce<Args extends unknown[]>(
//   callback: (...args: Args) => void,
//   delay: number
// ): (...args: Args) => void {
//   let timer: ReturnType<typeof setTimeout> | undefined;

//   return function(this: unknown, ...args: Args) {
//     if (timer !== undefined) {
//       clearTimeout(timer);
//     }

//     timer = setTimeout(() => {
//       callback.apply(this, args);
//     }, delay);
//   };
// }

// export function debounce<T extends ( ...args: unknown[] ) => void>( callback: T, delay: number ): ( ...args: Parameters<T> ) => void {

// 	let timer: ReturnType<typeof setTimeout> | undefined;

// 	return function ( this: ThisParameterType<T>, ...args: Parameters<T> ): void {

// 		if ( timer !== undefined ) {

// 			clearTimeout( timer );

// 		}

// 		timer = setTimeout( () => {

// 			callback.apply( this, args );

// 		}, delay );

// 	};

// }
