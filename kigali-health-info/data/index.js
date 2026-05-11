// grab every file that ends in .json"
const ctx = require.context('./', false, /\.json$/);

// maps through all the files it found and exports them as single array
export const guidelinesList = ctx.keys().map((key) => {
  return ctx(key);
});