# repleng

REPL for engineering problems

## Development Setup

<details>
<summary>Setup Instructions</summary>

```bash
npm create vite@latest # Edit package.json (type, main, etc.)
npm install --save-dev eslint@latest @eslint/js@latest
npm install --save-dev typescript-eslint@canary
npm install --save-dev @stylistic/eslint-plugin
npm install --save-dev eslint-plugin-simple-import-sort
npx tsc --init
```

</details>

## Development

```bash
npm install
npm run dev
npm run test
npm run build
```

## Syntax

```repleng
x = 1
mutate x += 1
x = [1 2; 3 4]
y = [1 2 3 4; 5 6 7 8]
z = x @ y
```

## Scratch

```typescript
// vite.config.ts from a different project
// https://github.com/qmhc/unplugin-dts
import { resolve } from "path";
import { defineConfig } from "vite";

import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "PLACEHOLDER_PACKAGE_NAME",
    },
    rollupOptions: {
      external: [],
      output: { globals: {} },
    },
  },
  plugins: [dts({rollupTypes: true})],
});
```
