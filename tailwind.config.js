module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: 'var(--theme-bg)',
        'theme-text': 'var(--theme-text)',
      },
    },
  },
  plugins: [],
};
