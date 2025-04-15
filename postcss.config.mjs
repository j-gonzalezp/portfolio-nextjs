// postcss.config.js
import discardComments from 'postcss-discard-comments';

export default {
  plugins: {
    '@tailwindcss/postcss': {},
    'autoprefixer': {},
    'postcss-discard-comments': { removeAll: true }, 
  },
};
