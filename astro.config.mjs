// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';

import icon from 'astro-icon';

import mdx from '@astrojs/mdx';

import { autoDocLayout } from './src/remark-plugins/auto-doc-layout.mjs';

// https://astro.build/config
export default defineConfig({
    integrations: [icon(), mdx()],
    markdown: {
        syntaxHighlight: false,
        remarkPlugins: [autoDocLayout],
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