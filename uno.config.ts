import presetRemToPx from '@unocss/preset-rem-to-px'
import type { Preset } from 'unocss'
import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      'brand': 'var(--c-brand)',
      'brand-light': 'var(--c-brand-light)',
      'brand-lighter': 'var(--c-brand-lighter)',
      'origin': 'var(--c-origin)',
      'king': 'var(--c-king)',
      'origin-light': 'var(--c-origin-light)',
      'text': 'var(--c-text)',
      'text-light': 'var(--c-text-light)',
      'text-light-dark': 'var(--c-text-light-dark)',
      'text-lighter': 'var(--c-text-lighter)',
      'text-dark': 'var(--c-text-dark)',
      'text-darker': 'var(--c-text-darker)',
      'navbar': 'var(--c-bg-navbar)',
      'sidebar': 'var(--c-bg-sidebar)',
      'border': 'var(--c-border)',
    },
    height: {
      navbar: 'var(--navbar-height)',
      audio: 'var(--audio-height)',
    },
    width: {
      sidebar: 'var(--sidebar-width)',
    },
  },
  rules: [
    ['pt-navbar', { 'padding-top': 'var(--navbar-height)' }],
    ['pb-audio', { 'padding-bottom': 'var(--audio-height)' }],
    ['bg-search', { 'background-color': 'var(--c-bg-search)' }],
    ['bg-search-hover', { 'background-color': 'var(--c-bg-search-hover)' }],
    ['bg-sidebar', { 'background-color': 'var(--c-bg-sidebar)' }],
    ['bg-brand-gradient', { background: 'var(--gradient)' }],
    ['bg-sidebar-active', { 'background-color': 'var(--c-bg-sidebar-active)' }],
    ['shadow-box', { 'box-shadow': 'var(--shadow)' }],
    ['top-navbar', { top: 'var(--navbar-height)' }],
    ['bottom-footer', { bottom: 'var(--audio-height)' }],
  ],
  shortcuts: {
    'border': 'b b-solid b-border',
    'border-t': 'b-t b-t-solid b-border',
    'border-r': 'b-r b-r-solid b-border',
    'border-b': 'b-b b-b-solid b-border',
    'border-l': 'b-l b-l-solid b-border',
    'flex-center': 'flex justify-center items-center',
    'fixed-0': 'fixed top-0 left-0',
    'icon': 'inline-block w-1em h-1em text-1em vertical-middle leading-1em',
    'scroll-container':
      'h-full w-full transform-gpu overflow-y-auto scroll-smooth will-change-scroll',
  },
  presets: [presetRemToPx({ baseFontSize: 14 }) as Preset<any>, presetUno()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
