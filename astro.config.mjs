// @ts-check
import { defineConfig, fontProviders } from 'astro/config'
import path from 'path'
import icon from 'astro-icon'
import mdx from '@astrojs/mdx'

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
        remarkPlugins: [autoNoteLayout],
    },
    fonts: [
        {
            provider: fontProviders.google(),
            name: 'Inter',
            weights: [500, 700],
            styles: ['normal', 'italic'],
            display: block
        },
        {
            provider: fontProviders.google(),
            name: 'PT Serif',
            weights: [500, 700],
            styles: ['normal', 'italic'],
            display: 'block'
        },
        {
            provider: fontProviders.local(),
            name: 'Pixeloid',
            options: {
                variants: [{
                    src: ['@fonts/PixeloidSans.woff2'],
                    weight: 'normal',
                    style: 'normal',
                    display: 'block',
                },
                {
                    src: ['@fonts/PixeloidSans-Bold.woff2'],
                    weight: 'bold',
                    style: 'normal',
                    display: 'block',
                }]
            },
    ],
    // Cause tsconfig is not fucking enough???
    vite: {
        resolve: {
            alias: {
                '@styles': path.resolve('./src/styles'),
            },
        },
    },
});