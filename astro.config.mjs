// @ts-check
import { defineConfig } from 'astro/config'
import path from 'path'
import icon from 'astro-icon'
import mdx from '@astrojs/mdx'
import { unified } from '@astrojs/markdown-remark'
import json5Plugin from "vite-plugin-json5"

import { autoNoteLayout } from './src/remark-plugins/auto-doc-layout.mjs'

// https://astro.build/config
export default defineConfig({
    integrations: [icon({
        include: {
            materialSymbols: [
                'arrow-back',
                'square-outline',
                'circle-outline',
            ]
        }
    }), mdx()],
    markdown: {
        syntaxHighlight: false,
        processor: unified({ remarkPlugins: [autoNoteLayout] }),
    },
    // Cause tsconfig is not fucking enough???
    vite: {
        plugins: [json5Plugin()],
        resolve: {
            alias: {
                '@styles': path.resolve('./src/styles'),
            },
        },
    },
});