// Tailwind 4 runs as a PostCSS plugin under Next.js. There is still no
// tailwind.config.js: the whole theme lives in the @theme block of src/index.css.
export default {
    plugins: {
        '@tailwindcss/postcss': {},
    },
};
