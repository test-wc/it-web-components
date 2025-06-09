export default {
  'packages/**/*.{js,ts,json,css,scss}': (files) => ['pnpm lint'],
  '**/package.json': (files) => ['pnpm install --frozen-lockfile'],
  'pnpm-lock.yaml': (files) => ['pnpm install --frozen-lockfile'],
};
