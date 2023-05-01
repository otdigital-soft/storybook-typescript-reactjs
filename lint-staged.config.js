module.exports = {
  'src/**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
  'src/**/*.{ts,tsx}': ['prettier --write', 'eslint --fix --max-warnings=0'],
};