// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';

import icon from 'astro-icon';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
    integrations: [icon(), mdx()],
    markdown: {
        syntaxHighlight: false,
    },
    // Cause tsconfig is not fucking enough???
    vite: {
        resolve: {
            alias: {
                '@styles': path.resolve('./src/styles'),
            },
        },
    },
});