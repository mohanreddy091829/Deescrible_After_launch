// Tailwind CSS 4 runs through PostCSS, which works with both the webpack build (used for deployment) and Turbopack (dev).
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;
