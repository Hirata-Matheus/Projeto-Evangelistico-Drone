import ceu from './tailwind.preset.js'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [ceu],
  content: ['./app/**/*.{vue,js,ts,html}'],
  // hover: só em aparelhos com mouse (no celular o toque não deixa o botão "preso" no estado de hover).
  future: { hoverOnlyWhenSupported: true }
}
